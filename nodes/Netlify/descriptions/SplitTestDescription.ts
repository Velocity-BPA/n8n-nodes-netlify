/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const splitTestOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['splitTest'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a split test',
				action: 'Create a split test',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get split test details',
				action: 'Get a split test',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many split tests',
				action: 'Get many split tests',
			},
			{
				name: 'Start',
				value: 'start',
				description: 'Start a split test',
				action: 'Start a split test',
			},
			{
				name: 'Stop',
				value: 'stop',
				description: 'Stop a split test',
				action: 'Stop a split test',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update split test',
				action: 'Update a split test',
			},
		],
		default: 'get',
	},
];

export const splitTestFields: INodeProperties[] = [
	// ----------------------------------
	//         splitTest: common site ID
	// ----------------------------------
	{
		displayName: 'Site ID',
		name: 'siteId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['splitTest'],
			},
		},
		description: 'The ID of the site',
	},

	// ----------------------------------
	//         splitTest: create
	// ----------------------------------
	{
		displayName: 'Branch Tests',
		name: 'branchTests',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		displayOptions: {
			show: {
				resource: ['splitTest'],
				operation: ['create'],
			},
		},
		options: [
			{
				name: 'branches',
				displayName: 'Branches',
				values: [
					{
						displayName: 'Branch',
						name: 'branch',
						type: 'string',
						default: '',
						description: 'Branch name',
					},
					{
						displayName: 'Percentage',
						name: 'percentage',
						type: 'number',
						typeOptions: {
							minValue: 0,
							maxValue: 100,
						},
						default: 50,
						description: 'Traffic percentage for this branch',
					},
				],
			},
		],
		description: 'Branch configuration with traffic percentages',
	},

	// ----------------------------------
	//         splitTest: get, start, stop, update
	// ----------------------------------
	{
		displayName: 'Split Test ID',
		name: 'splitTestId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['splitTest'],
				operation: ['get', 'start', 'stop', 'update'],
			},
		},
		description: 'The ID of the split test',
	},

	// ----------------------------------
	//         splitTest: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['splitTest'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Branch Tests',
				name: 'branchTests',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				options: [
					{
						name: 'branches',
						displayName: 'Branches',
						values: [
							{
								displayName: 'Branch',
								name: 'branch',
								type: 'string',
								default: '',
								description: 'Branch name',
							},
							{
								displayName: 'Percentage',
								name: 'percentage',
								type: 'number',
								typeOptions: {
									minValue: 0,
									maxValue: 100,
								},
								default: 50,
								description: 'Traffic percentage for this branch',
							},
						],
					},
				],
				description: 'Updated branch configuration',
			},
		],
	},

	// ----------------------------------
	//         splitTest: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['splitTest'],
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
				resource: ['splitTest'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},
];
