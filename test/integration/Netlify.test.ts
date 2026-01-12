/**
 * Integration tests for Netlify node
 * These tests verify the node structure and configuration
 */

import { Netlify } from '../../nodes/Netlify/Netlify.node';
import { NetlifyTrigger } from '../../nodes/Netlify/NetlifyTrigger.node';

describe('Netlify Node', () => {
	let netlifyNode: Netlify;

	beforeEach(() => {
		netlifyNode = new Netlify();
	});

	describe('Node Description', () => {
		it('should have correct display name', () => {
			expect(netlifyNode.description.displayName).toBe('Netlify');
		});

		it('should have correct node name', () => {
			expect(netlifyNode.description.name).toBe('netlify');
		});

		it('should have correct node group', () => {
			expect(netlifyNode.description.group).toContain('transform');
		});

		it('should have correct version', () => {
			expect(netlifyNode.description.version).toBe(1);
		});

		it('should require netlifyApi credentials', () => {
			const credentials = netlifyNode.description.credentials;
			expect(credentials).toBeDefined();
			expect(credentials).toContainEqual(
				expect.objectContaining({
					name: 'netlifyApi',
					required: true,
				}),
			);
		});

		it('should have 12 resources', () => {
			const resourceProperty = netlifyNode.description.properties?.find(
				(p) => p.name === 'resource',
			);
			expect(resourceProperty).toBeDefined();
			expect(resourceProperty?.options).toHaveLength(12);
		});
	});

	describe('Resources', () => {
		const expectedResources = [
			'site',
			'deploy',
			'form',
			'submission',
			'environmentVariable',
			'function',
			'build',
			'dnsZone',
			'hook',
			'deployKey',
			'member',
			'splitTest',
		];

		it('should have all expected resources', () => {
			const resourceProperty = netlifyNode.description.properties?.find(
				(p) => p.name === 'resource',
			);
			const resourceValues = (resourceProperty?.options as any[])?.map((o) => o.value);

			expectedResources.forEach((resource) => {
				expect(resourceValues).toContain(resource);
			});
		});
	});
});

describe('Netlify Trigger Node', () => {
	let triggerNode: NetlifyTrigger;

	beforeEach(() => {
		triggerNode = new NetlifyTrigger();
	});

	describe('Node Description', () => {
		it('should have correct display name', () => {
			expect(triggerNode.description.displayName).toBe('Netlify Trigger');
		});

		it('should have correct node name', () => {
			expect(triggerNode.description.name).toBe('netlifyTrigger');
		});

		it('should have correct node group', () => {
			expect(triggerNode.description.group).toContain('trigger');
		});

		it('should have webhook property', () => {
			expect(triggerNode.description.webhooks).toBeDefined();
			expect(triggerNode.description.webhooks).toHaveLength(1);
		});
	});

	describe('Events', () => {
		it('should have event options', () => {
			const eventProperty = triggerNode.description.properties?.find(
				(p) => p.name === 'event',
			);
			expect(eventProperty).toBeDefined();
			expect(eventProperty?.type).toBe('options');
		});
	});
});
