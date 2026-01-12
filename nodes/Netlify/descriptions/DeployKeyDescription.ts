/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const deployKeyOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['deployKey'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a deploy key',
				action: 'Create a deploy key',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a deploy key',
				action: 'Delete a deploy key',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get deploy key details',
				action: 'Get a deploy key',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many deploy keys',
				action: 'Get many deploy keys',
			},
		],
		default: 'get',
	},
];

export const deployKeyFields: INodeProperties[] = [
	// ----------------------------------
	//         deployKey: get, delete
	// ----------------------------------
	{
		displayName: 'Key ID',
		name: 'keyId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['deployKey'],
				operation: ['get', 'delete'],
			},
		},
		description: 'The ID of the deploy key',
	},

	// ----------------------------------
	//         deployKey: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['deployKey'],
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
				resource: ['deployKey'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},
];
