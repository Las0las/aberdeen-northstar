#!/usr/bin/env node
/**
 * DB-FIRST CODE GENERATOR
 * Generates TypeScript types, Zod schemas, API layer, and hooks from frozen DB contract.
 * RULE: If it's not in the contract, it does not exist.
 */

const fs = require('fs');
const path = require('path');

const CONTRACT_PATH = path.join(__dirname, '../src/db/contract/db_contract.json');
const SRC_DIR = path.join(__dirname, '../src');

// Load and parse contract
const contract = JSON.parse(fs.readFileSync(CONTRACT_PATH, 'utf8'));
const tables = contract.tables;

// Type mapping from Postgres to TypeScript
const PG_TO_TS = {
  'uuid': 'string',
  'text': 'string',
  'character varying': 'string',
  'varchar': 'string',
  'integer': 'number',
  'bigint': 'number',
  'smallint': 'number',
  'numeric': 'number',
  'decimal': 'number',
  'real': 'number',
  'double precision': 'number',
  'boolean': 'boolean',
  'jsonb': 'Json',
  'json': 'Json',
  'timestamp with time zone': 'string',
  'timestamp without time zone': 'string',
  'date': 'string',
  'time with time zone': 'string',
  'time without time zone': 'string',
  'bytea': 'string',
  'ARRAY': 'unknown[]',
};

// Type mapping from Postgres to Zod
const PG_TO_ZOD = {
  'uuid': 'z.string().uuid()',
  'text': 'z.string()',
  'character varying': 'z.string()',
  'varchar': 'z.string()',
  'integer': 'z.number().int()',
  'bigint': 'z.number().int()',
  'smallint': 'z.number().int()',
  'numeric': 'z.number()',
  'decimal': 'z.number()',
  'real': 'z.number()',
  'double precision': 'z.number()',
  'boolean': 'z.boolean()',
  'jsonb': 'z.record(z.unknown())',
  'json': 'z.record(z.unknown())',
  'timestamp with time zone': 'z.string().datetime()',
  'timestamp without time zone': 'z.string().datetime()',
  'date': 'z.string()',
  'time with time zone': 'z.string()',
  'time without time zone': 'z.string()',
  'bytea': 'z.string()',
  'ARRAY': 'z.array(z.unknown())',
};

function toPascalCase(str) {
  return str.split('_').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
}

function toCamelCase(str) {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

function getTsType(pgType) {
  return PG_TO_TS[pgType] || 'unknown';
}

function getZodType(pgType) {
  return PG_TO_ZOD[pgType] || 'z.unknown()';
}

function generateDatabaseTypes() {
  let output = `// AUTO-GENERATED FROM db_contract.frozen.json - DO NOT EDIT

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
`;

  for (const table of tables) {
    const tableName = table.table;
    output += `      ${tableName}: {\n`;
    output += `        Row: {\n`;
    
    for (const col of table.columns) {
      const tsType = getTsType(col.type);
      const nullable = col.nullable === 'YES';
      output += `          ${col.name}: ${tsType}${nullable ? ' | null' : ''};\n`;
    }
    output += `        };\n`;
    
    // Insert type (optional fields with defaults)
    output += `        Insert: {\n`;
    for (const col of table.columns) {
      const tsType = getTsType(col.type);
      const hasDefault = col.default !== null;
      const nullable = col.nullable === 'YES';
      const optional = hasDefault || nullable;
      output += `          ${col.name}${optional ? '?' : ''}: ${tsType}${nullable ? ' | null' : ''};\n`;
    }
    output += `        };\n`;
    
    // Update type (all optional)
    output += `        Update: {\n`;
    for (const col of table.columns) {
      const tsType = getTsType(col.type);
      const nullable = col.nullable === 'YES';
      output += `          ${col.name}?: ${tsType}${nullable ? ' | null' : ''};\n`;
    }
    output += `        };\n`;
    output += `      };\n`;
  }

  output += `    };
    Views: Record<string, never>;
    Functions: {
      current_org: {
        Args: Record<string, never>;
        Returns: string;
      };
      is_org_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
      is_workspace_member: {
        Args: { workspace_id: string; user_id: string };
        Returns: boolean;
      };
      get_workspace_role: {
        Args: { workspace_id: string };
        Returns: string;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];
`;

  return output;
}

function generateZodSchemas() {
  let output = `// AUTO-GENERATED FROM db_contract.frozen.json - DO NOT EDIT

import { z } from 'zod';

// Base types
export const UuidSchema = z.string().uuid();
export const TimestampSchema = z.string().datetime();
export const JsonSchema = z.record(z.unknown());

`;

  for (const table of tables) {
    const pascalName = toPascalCase(table.table);
    
    // Row schema
    output += `// ${table.table}\n`;
    output += `export const ${pascalName}Schema = z.object({\n`;
    for (const col of table.columns) {
      let zodType = getZodType(col.type);
      const nullable = col.nullable === 'YES';
      if (nullable) {
        zodType += '.nullable()';
      }
      output += `  ${col.name}: ${zodType},\n`;
    }
    output += `});\n`;
    output += `export type ${pascalName} = z.infer<typeof ${pascalName}Schema>;\n\n`;
    
    // Insert schema
    output += `export const ${pascalName}InsertSchema = z.object({\n`;
    for (const col of table.columns) {
      let zodType = getZodType(col.type);
      const hasDefault = col.default !== null;
      const nullable = col.nullable === 'YES';
      if (nullable) {
        zodType += '.nullable()';
      }
      if (hasDefault || nullable) {
        zodType += '.optional()';
      }
      output += `  ${col.name}: ${zodType},\n`;
    }
    output += `});\n`;
    output += `export type ${pascalName}Insert = z.infer<typeof ${pascalName}InsertSchema>;\n\n`;
    
    // Update schema (all optional)
    output += `export const ${pascalName}UpdateSchema = z.object({\n`;
    for (const col of table.columns) {
      let zodType = getZodType(col.type);
      const nullable = col.nullable === 'YES';
      if (nullable) {
        zodType += '.nullable()';
      }
      zodType += '.optional()';
      output += `  ${col.name}: ${zodType},\n`;
    }
    output += `});\n`;
    output += `export type ${pascalName}Update = z.infer<typeof ${pascalName}UpdateSchema>;\n\n`;
  }

  return output;
}

// Write files
fs.writeFileSync(
  path.join(SRC_DIR, 'types/database.types.ts'),
  generateDatabaseTypes()
);

fs.writeFileSync(
  path.join(SRC_DIR, 'schemas/index.ts'),
  generateZodSchemas()
);

console.log('Generated:');
console.log('  - src/types/database.types.ts');
console.log('  - src/schemas/index.ts');
console.log(`Total tables: ${tables.length}`);
