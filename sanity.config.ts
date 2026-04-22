import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schemaTypes';
import {visionTool} from '@sanity/vision';

export default defineConfig({
	name: 'default',
	title: 'C&S Partners',
	projectId: 'u1i19rrb',
	dataset: 'production',
	plugins: [structureTool(), visionTool()],
	schema: {
		types: schemaTypes,
	},
});
