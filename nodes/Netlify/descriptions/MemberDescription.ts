/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const memberOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['member'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get team member details',
				action: 'Get a member',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many team members',
				action: 'Get many members',
			},
			{
				name: 'Invite',
				value: 'invite',
				description: 'Invite a member to team',
				action: 'Invite a member',
			},
			{
				name: 'Remove',
				value: 'remove',
				description: 'Remove member from team',
				action: 'Remove a member',
			},
			{
				name: 'Update Role',
				value: 'updateRole',
				description: 'Update member role',
				action: 'Update member role',
			},
		],
		default: 'get',
	},
];

export const memberFields: INodeProperties[] = [
	// ----------------------------------
	//         member: common account slug
	// ----------------------------------
	{
		displayName: 'Account Slug',
		name: 'accountSlug',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['member'],
			},
		},
		description: 'Account/team slug',
	},

	// ----------------------------------
	//         member: get, remove, updateRole
	// ----------------------------------
	{
		displayName: 'Member ID',
		name: 'memberId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['member'],
				operation: ['get', 'remove', 'updateRole'],
			},
		},
		description: 'The ID of the team member',
	},

	// ----------------------------------
	//         member: invite
	// ----------------------------------
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['member'],
				operation: ['invite'],
			},
		},
		description: 'Email address for the invitation',
	},
	{
		displayName: 'Role',
		name: 'role',
		type: 'options',
		required: true,
		options: [
			{ name: 'Collaborator', value: 'Collaborator' },
			{ name: 'Controller', value: 'Controller' },
			{ name: 'Owner', value: 'Owner' },
		],
		default: 'Collaborator',
		displayOptions: {
			show: {
				resource: ['member'],
				operation: ['invite'],
			},
		},
		description: 'Role for the new member',
	},

	// ----------------------------------
	//         member: updateRole
	// ----------------------------------
	{
		displayName: 'New Role',
		name: 'newRole',
		type: 'options',
		required: true,
		options: [
			{ name: 'Collaborator', value: 'Collaborator' },
			{ name: 'Controller', value: 'Controller' },
			{ name: 'Owner', value: 'Owner' },
		],
		default: 'Collaborator',
		displayOptions: {
			show: {
				resource: ['member'],
				operation: ['updateRole'],
			},
		},
		description: 'New role for the member',
	},

	// ----------------------------------
	//         member: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['member'],
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
				resource: ['member'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},
];
