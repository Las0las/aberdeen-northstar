#!/usr/bin/env node
// AI Tools Generator - Derives tools from OpenAPI spec
const fs = require('fs');
const path = require('path');

const OPENAPI_PATH = path.join(__dirname, '../src/openapi/spec.json');
const OUTPUT_DIR = path.join(__dirname, '../src/ai/tools/generated');

function generateTools(spec) {
  const tools = [];
  const tags = new Set();

  for (const [pathKey, methods] of Object.entries(spec.paths)) {
    for (const [method, op] of Object.entries(methods)) {
      if (!op.operationId) continue;
      
      const tag = op.tags?.[0] || 'General';
      tags.add(tag);

      const params = {};
      const required = [];

      // Path parameters
      if (op.parameters) {
        for (const p of op.parameters) {
          if (p.in === 'path') {
            params[p.name] = {
              type: p.schema?.type || 'string',
              description: `${p.name} parameter`,
            };
            if (p.required) required.push(p.name);
          } else if (p.in === 'query') {
            params[p.name] = {
              type: p.schema?.type || 'string',
              description: `${p.name} query parameter`,
            };
          }
        }
      }

      // Request body
      if (op.requestBody?.content?.['application/json']?.schema) {
        const schemaRef = op.requestBody.content['application/json'].schema.$ref;
        if (schemaRef) {
          const schemaName = schemaRef.split('/').pop();
          const schema = spec.components.schemas[schemaName];
          if (schema?.properties) {
            for (const [propName, propDef] of Object.entries(schema.properties)) {
              params[propName] = {
                type: propDef.type || 'string',
                description: propDef.description || `${propName} field`,
              };
              if (!propDef.nullable && schema.required?.includes(propName)) {
                required.push(propName);
              }
            }
          }
        }
      }

      const tool = {
        name: op.operationId,
        description: op.summary || op.operationId,
        parameters: {
          type: 'object',
          properties: params,
          required: required.length > 0 ? required : undefined,
        },
        metadata: {
          method: method.toUpperCase(),
          path: pathKey,
          tag,
          requiresAuth: true,
          mutates: ['post', 'patch', 'put', 'delete'].includes(method),
          confidenceThreshold: ['post', 'patch', 'put', 'delete'].includes(method) ? 0.9 : 0.7,
        },
      };

      tools.push(tool);
    }
  }

  return { tools, tags: Array.from(tags) };
}

function generateToolsIndex(tools, tags) {
  let output = `// AUTO-GENERATED - AI Tools from OpenAPI
// DO NOT EDIT - Regenerate with: node scripts/generate-ai-tools.js

import type { Database } from '@/types/database.types';

export interface AIToolParameter {
  type: string;
  description: string;
  enum?: string[];
}

export interface AIToolMetadata {
  method: string;
  path: string;
  tag: string;
  requiresAuth: boolean;
  mutates: boolean;
  confidenceThreshold: number;
}

export interface AITool {
  name: string;
  description: string;
  parameters: {
    type: 'object';
    properties: Record<string, AIToolParameter>;
    required?: string[];
  };
  metadata: AIToolMetadata;
}

export const aiTools: AITool[] = ${JSON.stringify(tools, null, 2)};

export const toolsByTag: Record<string, AITool[]> = {
${tags.map(tag => `  '${tag}': aiTools.filter(t => t.metadata.tag === '${tag}'),`).join('\n')}
};

export const mutatingTools = aiTools.filter(t => t.metadata.mutates);
export const queryTools = aiTools.filter(t => !t.metadata.mutates);

export function getToolByName(name: string): AITool | undefined {
  return aiTools.find(t => t.name === name);
}

export function validateToolConfidence(tool: AITool, confidence: number): boolean {
  return confidence >= tool.metadata.confidenceThreshold;
}

export function getToolsForEntity(entity: string): AITool[] {
  return aiTools.filter(t => t.metadata.tag.toLowerCase() === entity.toLowerCase());
}
`;

  return output;
}

// Main
const spec = JSON.parse(fs.readFileSync(OPENAPI_PATH, 'utf8'));
const { tools, tags } = generateTools(spec);

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// Write tools index
const indexContent = generateToolsIndex(tools, tags);
fs.writeFileSync(path.join(OUTPUT_DIR, 'index.ts'), indexContent);

// Write raw tools JSON
fs.writeFileSync(path.join(OUTPUT_DIR, 'tools.json'), JSON.stringify(tools, null, 2));

console.log(`Generated: ${OUTPUT_DIR}/index.ts`);
console.log(`Generated: ${OUTPUT_DIR}/tools.json`);
console.log(`Tools: ${tools.length}`);
console.log(`Tags: ${tags.length}`);
