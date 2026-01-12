/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const buildOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['build'],
			},
		},
		options: [
			{
				name: 'Cancel',
				value: 'cancel',
				description: 'Cancel a running build',
				action: 'Cancel a build',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get build details',
				action: 'Get a build',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many builds for a site',
				action: 'Get many builds',
			},
			{
				name: 'Retry',
				value: 'retry',
				description: 'Retry a failed build',
				action: 'Retry a build',
			},
			{
				name: 'Trigger',
				value: 'trigger',
				description: 'Trigger a new build',
				action: 'Trigger a build',
			},
		],
		default: 'get',
	},
];

export const buildFields: INodeProperties[] = [
	// ----------------------------------
	//         build: trigger, getAll
	// ----------------------------------
	{
		displayName: 'Site ID',
		name: 'siteId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['build'],
				operation: ['trigger', 'getAll'],
			},
		},
		description: 'The ID of the site',
	},

	// ----------------------------------
	//         build: get, cancel, retry
	// ----------------------------------
	{
		displayName: 'Build ID',
		name: 'buildId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['build'],
				operation: ['get', 'cancel', 'retry'],
			},
		},
		description: 'The ID of the build',
	},

	// ----------------------------------
	//         build: trigger
	// ----------------------------------
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['build'],
				operation: ['trigger'],
			},
		},
		options: [
			{
				displayName: 'Branch',
				name: 'branch',
				type: 'string',
				default: '',
				description: 'Branch to build',
			},
			{
				displayName: 'Clear Cache',
				name: 'clear_cache',
				type: 'boolean',
				default: false,
				description: 'Whether to clear build cache before building',
			},
		],
	},

	// ----------------------------------
	//         build: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['build'],
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
				resource: ['build'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},
];
