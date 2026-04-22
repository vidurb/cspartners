import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schemaTypes';

export default defineConfig({
	name: 'default',
	title: 'C&S Partners',
	projectId: 'u1i19rrb',
	dataset: 'production',
	plugins: [structureTool()],
	schema: {
		types: schemaTypes,
	},
});
