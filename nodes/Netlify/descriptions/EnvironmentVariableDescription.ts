/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const environmentVariableOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['environmentVariable'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create an environment variable',
				action: 'Create an environment variable',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an environment variable',
				action: 'Delete an environment variable',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an environment variable',
				action: 'Get an environment variable',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many environment variables',
				action: 'Get many environment variables',
			},
			{
				name: 'Set Value',
				value: 'setValue',
				description: 'Set value for specific context',
				action: 'Set environment variable value',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an environment variable',
				action: 'Update an environment variable',
			},
		],
		default: 'get',
	},
];

export const environmentVariableFields: INodeProperties[] = [
	// ----------------------------------
	//         environmentVariable: common fields
	// ----------------------------------
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['environmentVariable'],
			},
		},
		description: 'The ID of the account/team',
	},
	{
		displayName: 'Site ID',
		name: 'siteId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['environmentVariable'],
			},
		},
		description: 'The ID of the site',
	},

	// ----------------------------------
	//         environmentVariable: create
	// ----------------------------------
	{
		displayName: 'Key',
		name: 'key',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['environmentVariable'],
				operation: ['create'],
			},
		},
		description: 'The environment variable key',
	},
	{
		displayName: 'Value',
		name: 'value',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['environmentVariable'],
				operation: ['create'],
			},
		},
		description: 'The environment variable value',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['environmentVariable'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Context',
				name: 'context',
				type: 'options',
				options: [
					{ name: 'All', value: 'all' },
					{ name: 'Branch Deploy', value: 'branch-deploy' },
					{ name: 'Deploy Preview', value: 'deploy-preview' },
					{ name: 'Development', value: 'dev' },
					{ name: 'Production', value: 'production' },
				],
				default: 'all',
				description: 'Deploy context for this value',
			},
			{
				displayName: 'Context Parameter',
				name: 'context_parameter',
				type: 'string',
				default: '',
				description: 'Branch name for branch context',
			},
			{
				displayName: 'Is Secret',
				name: 'is_secret',
				type: 'boolean',
				default: false,
				description: 'Whether to mark as secret (write-only)',
			},
		],
	},

	// ----------------------------------
	//         environmentVariable: get, delete
	// ----------------------------------
	{
		displayName: 'Key',
		name: 'key',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['environmentVariable'],
				operation: ['get', 'delete'],
			},
		},
		description: 'The environment variable key',
	},

	// ----------------------------------
	//         environmentVariable: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['environmentVariable'],
				operation: ['getAll'],
			},
		},
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 50,
		displayOptions: {
			show: {
				resource: ['environmentVariable'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['environmentVariable'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Context Filter',
				name: 'context_name',
				type: 'options',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Branch Deploy', value: 'branch-deploy' },
					{ name: 'Deploy Preview', value: 'deploy-preview' },
					{ name: 'Development', value: 'dev' },
					{ name: 'Production', value: 'production' },
				],
				default: '',
				description: 'Filter by deploy context',
			},
			{
				displayName: 'Scope',
				name: 'scope',
				type: 'options',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Builds', value: 'builds' },
					{ name: 'Functions', value: 'functions' },
					{ name: 'Post Processing', value: 'post_processing' },
					{ name: 'Runtime', value: 'runtime' },
				],
				default: '',
				description: 'Filter by scope',
			},
		],
	},

	// ----------------------------------
	//         environmentVariable: update
	// ----------------------------------
	{
		displayName: 'Key',
		name: 'key',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['environmentVariable'],
				operation: ['update'],
			},
		},
		description: 'The environment variable key',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['environmentVariable'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Is Secret',
				name: 'is_secret',
				type: 'boolean',
				default: false,
				description: 'Whether to mark as secret (write-only)',
			},
			{
				displayName: 'Scopes',
				name: 'scopes',
				type: 'multiOptions',
				options: [
					{ name: 'Builds', value: 'builds' },
					{ name: 'Functions', value: 'functions' },
					{ name: 'Post Processing', value: 'post_processing' },
					{ name: 'Runtime', value: 'runtime' },
				],
				default: [],
				description: 'Scopes for the variable',
			},
		],
	},

	// ----------------------------------
	//         environmentVariable: setValue
	// ----------------------------------
	{
		displayName: 'Key',
		name: 'key',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['environmentVariable'],
				operation: ['setValue'],
			},
		},
		description: 'The environment variable key',
	},
	{
		displayName: 'Value',
		name: 'value',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['environmentVariable'],
				operation: ['setValue'],
			},
		},
		description: 'The environment variable value',
	},
	{
		displayName: 'Context',
		name: 'context',
		type: 'options',
		required: true,
		options: [
			{ name: 'All', value: 'all' },
			{ name: 'Branch Deploy', value: 'branch-deploy' },
			{ name: 'Deploy Preview', value: 'deploy-preview' },
			{ name: 'Development', value: 'dev' },
			{ name: 'Production', value: 'production' },
		],
		default: 'all',
		displayOptions: {
			show: {
				resource: ['environmentVariable'],
				operation: ['setValue'],
			},
		},
		description: 'Deploy context for this value',
	},
	{
		displayName: 'Context Parameter',
		name: 'contextParameter',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['environmentVariable'],
				operation: ['setValue'],
			},
		},
		description: 'Branch name for branch context',
	},
];
