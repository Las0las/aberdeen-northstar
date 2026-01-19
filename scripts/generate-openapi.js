#!/usr/bin/env node
// OpenAPI Generator - Derives spec from db_contract.json
const fs = require('fs');
const path = require('path');

const CONTRACT_PATH = path.join(__dirname, '../src/db/contract/db_contract.json');
const OUTPUT_PATH = path.join(__dirname, '../src/openapi/spec.json');

const PG_TO_OPENAPI = {
  'uuid': { type: 'string', format: 'uuid' },
  'text': { type: 'string' },
  'character varying': { type: 'string' },
  'integer': { type: 'integer' },
  'bigint': { type: 'integer', format: 'int64' },
  'smallint': { type: 'integer' },
  'numeric': { type: 'number' },
  'decimal': { type: 'number' },
  'real': { type: 'number', format: 'float' },
  'double precision': { type: 'number', format: 'double' },
  'boolean': { type: 'boolean' },
  'jsonb': { type: 'object' },
  'json': { type: 'object' },
  'timestamp with time zone': { type: 'string', format: 'date-time' },
  'timestamp without time zone': { type: 'string', format: 'date-time' },
  'date': { type: 'string', format: 'date' },
  'time with time zone': { type: 'string', format: 'time' },
  'time without time zone': { type: 'string', format: 'time' },
  'ARRAY': { type: 'array', items: { type: 'string' } },
  'USER-DEFINED': { type: 'string' },
};

function pgToOpenAPI(pgType) {
  const normalized = pgType.toLowerCase().replace(/\[\]$/, '');
  if (pgType.endsWith('[]') || pgType === 'ARRAY') {
    return { type: 'array', items: { type: 'string' } };
  }
  return PG_TO_OPENAPI[normalized] || PG_TO_OPENAPI[pgType] || { type: 'string' };
}

function toPascalCase(str) {
  return str.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
}

function generateOpenAPI(contract) {
  const spec = {
    openapi: '3.1.0',
    info: {
      title: 'Aberdeen Northstar API',
      version: '1.0.0',
      description: 'Auto-generated from db_contract.json',
    },
    servers: [{ url: '/api/v1' }],
    paths: {},
    components: {
      schemas: {},
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  };

  for (const table of contract.tables) {
    const name = table.table;
    const schemaName = toPascalCase(name);
    const properties = {};
    const required = [];

    for (const col of table.columns) {
      const prop = { ...pgToOpenAPI(col.type) };
      if (col.nullable === 'YES') {
        prop.nullable = true;
      } else {
        required.push(col.name);
      }
      if (col.default) {
        prop.default = col.default.replace(/^'([^']*)'.*$/, '$1');
      }
      properties[col.name] = prop;
    }

    // Row schema
    spec.components.schemas[schemaName] = {
      type: 'object',
      properties,
      required: required.length > 0 ? required : undefined,
    };

    // Insert schema (without id, created_at, updated_at)
    const insertProps = {};
    const insertRequired = [];
    for (const col of table.columns) {
      if (['id', 'created_at', 'updated_at'].includes(col.name)) continue;
      const prop = { ...pgToOpenAPI(col.type) };
      if (col.nullable === 'YES' || col.default) {
        prop.nullable = true;
      } else {
        insertRequired.push(col.name);
      }
      insertProps[col.name] = prop;
    }
    spec.components.schemas[`${schemaName}Insert`] = {
      type: 'object',
      properties: insertProps,
      required: insertRequired.length > 0 ? insertRequired : undefined,
    };

    // Update schema (all optional)
    const updateProps = {};
    for (const col of table.columns) {
      if (col.name === 'id') continue;
      updateProps[col.name] = { ...pgToOpenAPI(col.type), nullable: true };
    }
    spec.components.schemas[`${schemaName}Update`] = {
      type: 'object',
      properties: updateProps,
    };

    // Paths
    const basePath = `/${name}`;
    spec.paths[basePath] = {
      get: {
        operationId: `list${schemaName}`,
        summary: `List ${name}`,
        tags: [schemaName],
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'pageSize', in: 'query', schema: { type: 'integer', default: 20 } },
          { name: 'orderBy', in: 'query', schema: { type: 'string' } },
        ],
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: { type: 'array', items: { $ref: `#/components/schemas/${schemaName}` } },
                    count: { type: 'integer' },
                    page: { type: 'integer' },
                    pageSize: { type: 'integer' },
                    totalPages: { type: 'integer' },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        operationId: `create${schemaName}`,
        summary: `Create ${name}`,
        tags: [schemaName],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: `#/components/schemas/${schemaName}Insert` },
            },
          },
        },
        responses: {
          '201': {
            description: 'Created',
            content: {
              'application/json': {
                schema: { $ref: `#/components/schemas/${schemaName}` },
              },
            },
          },
        },
      },
    };

    spec.paths[`${basePath}/{id}`] = {
      get: {
        operationId: `get${schemaName}`,
        summary: `Get ${name} by ID`,
        tags: [schemaName],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: { $ref: `#/components/schemas/${schemaName}` },
              },
            },
          },
          '404': { description: 'Not found' },
        },
      },
      patch: {
        operationId: `update${schemaName}`,
        summary: `Update ${name}`,
        tags: [schemaName],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: `#/components/schemas/${schemaName}Update` },
            },
          },
        },
        responses: {
          '200': {
            description: 'Updated',
            content: {
              'application/json': {
                schema: { $ref: `#/components/schemas/${schemaName}` },
              },
            },
          },
        },
      },
      delete: {
        operationId: `delete${schemaName}`,
        summary: `Delete ${name}`,
        tags: [schemaName],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
        responses: {
          '204': { description: 'Deleted' },
        },
      },
    };
  }

  return spec;
}

// Main
const contract = JSON.parse(fs.readFileSync(CONTRACT_PATH, 'utf8'));
const spec = generateOpenAPI(contract);
fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
fs.writeFileSync(OUTPUT_PATH, JSON.stringify(spec, null, 2));
console.log(`Generated: ${OUTPUT_PATH}`);
console.log(`Tables: ${contract.tables.length}`);
console.log(`Schemas: ${Object.keys(spec.components.schemas).length}`);
console.log(`Paths: ${Object.keys(spec.paths).length}`);
