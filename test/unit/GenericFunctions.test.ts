/**
 * Unit tests for Netlify GenericFunctions
 */

import {
	buildQueryString,
} from '../../nodes/Netlify/GenericFunctions';

describe('GenericFunctions', () => {
	describe('buildQueryString', () => {
		it('should return empty object for empty input', () => {
			const result = buildQueryString({});
			expect(result).toEqual({});
		});

		it('should filter out undefined values', () => {
			const result = buildQueryString({
				page: 1,
				perPage: undefined,
				state: 'active',
			});
			expect(result).toEqual({
				page: 1,
				state: 'active',
			});
		});

		it('should filter out empty strings', () => {
			const result = buildQueryString({
				name: 'test',
				filter: '',
				state: 'active',
			});
			expect(result).toEqual({
				name: 'test',
				state: 'active',
			});
		});

		it('should keep boolean false values', () => {
			const result = buildQueryString({
				draft: false,
				async: true,
			});
			expect(result).toEqual({
				draft: false,
				async: true,
			});
		});

		it('should keep zero values', () => {
			const result = buildQueryString({
				page: 0,
				limit: 100,
			});
			expect(result).toEqual({
				page: 0,
				limit: 100,
			});
		});
	});
});

describe('Netlify API Types', () => {
	it('should have valid resource types', () => {
		const resources = [
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
		expect(resources).toHaveLength(12);
	});
});
