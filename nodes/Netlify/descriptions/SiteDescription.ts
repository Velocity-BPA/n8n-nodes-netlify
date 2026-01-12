/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const siteOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['site'],
			},
		},
		options: [
			{
				name: 'Configure',
				value: 'configure',
				description: 'Configure site build settings',
				action: 'Configure site build settings',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new site',
				action: 'Create a site',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a site',
				action: 'Delete a site',
			},
			{
				name: 'Enable SSL',
				value: 'enableSsl',
				description: 'Enable SSL/HTTPS for site',
				action: 'Enable SSL for a site',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get site details',
				action: 'Get a site',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many sites',
				action: 'Get many sites',
			},
			{
				name: 'Provision SSL',
				value: 'provisionSsl',
				description: "Provision Let's Encrypt certificate",
				action: 'Provision SSL certificate for a site',
			},
			{
				name: 'Restore',
				value: 'restore',
				description: 'Restore a deleted site',
				action: 'Restore a site',
			},
			{
				name: 'Unlink Repository',
				value: 'unlink',
				description: 'Unlink site from Git repository',
				action: 'Unlink repository from a site',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update site settings',
				action: 'Update a site',
			},
		],
		default: 'get',
	},
];

export const siteFields: INodeProperties[] = [
	// ----------------------------------
	//         site: create
	// ----------------------------------
	{
		displayName: 'Site Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['site'],
				operation: ['create'],
			},
		},
		description: 'Name of the site (will be used as subdomain: name.netlify.app)',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['site'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Account Slug',
				name: 'account_slug',
				type: 'string',
				default: '',
				description: 'Account/team slug to create the site under',
			},
			{
				displayName: 'Custom Domain',
				name: 'custom_domain',
				type: 'string',
				default: '',
				description: 'Custom domain name for the site',
			},
			{
				displayName: 'Force SSL',
				name: 'force_ssl',
				type: 'boolean',
				default: false,
				description: 'Whether to force HTTPS redirects',
			},
			{
				displayName: 'Password',
				name: 'password',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				description: 'Password protection for the site',
			},
			{
				displayName: 'Repository Branch',
				name: 'repoBranch',
				type: 'string',
				default: 'main',
				description: 'Git branch to deploy',
			},
			{
				displayName: 'Repository Path',
				name: 'repoPath',
				type: 'string',
				default: '',
				description: 'Repository path (e.g., username/repo)',
			},
			{
				displayName: 'Repository Provider',
				name: 'repoProvider',
				type: 'options',
				options: [
					{ name: 'GitHub', value: 'github' },
					{ name: 'GitLab', value: 'gitlab' },
					{ name: 'Bitbucket', value: 'bitbucket' },
				],
				default: 'github',
				description: 'Git repository provider',
			},
		],
	},

	// ----------------------------------
	//         site: get, delete, restore, enableSsl, provisionSsl, unlink
	// ----------------------------------
	{
		displayName: 'Site ID',
		name: 'siteId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['site'],
				operation: ['get', 'delete', 'restore', 'enableSsl', 'provisionSsl', 'unlink'],
			},
		},
		description: 'The ID of the site',
	},

	// ----------------------------------
	//         site: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['site'],
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
				resource: ['site'],
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
				resource: ['site'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Filter',
				name: 'filter',
				type: 'options',
				options: [
					{ name: 'All', value: 'all' },
					{ name: 'Owner', value: 'owner' },
					{ name: 'Guest', value: 'guest' },
				],
				default: 'all',
				description: 'Filter sites by ownership',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Filter by site name',
			},
		],
	},

	// ----------------------------------
	//         site: update
	// ----------------------------------
	{
		displayName: 'Site ID',
		name: 'siteId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['site'],
				operation: ['update'],
			},
		},
		description: 'The ID of the site to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['site'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Custom Domain',
				name: 'custom_domain',
				type: 'string',
				default: '',
				description: 'Custom domain name for the site',
			},
			{
				displayName: 'Force SSL',
				name: 'force_ssl',
				type: 'boolean',
				default: false,
				description: 'Whether to force HTTPS redirects',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'New name for the site',
			},
			{
				displayName: 'Password',
				name: 'password',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				description: 'Password protection for the site',
			},
		],
	},

	// ----------------------------------
	//         site: configure
	// ----------------------------------
	{
		displayName: 'Site ID',
		name: 'siteId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['site'],
				operation: ['configure'],
			},
		},
		description: 'The ID of the site to configure',
	},
	{
		displayName: 'Build Settings',
		name: 'buildSettings',
		type: 'collection',
		placeholder: 'Add Setting',
		default: {},
		displayOptions: {
			show: {
				resource: ['site'],
				operation: ['configure'],
			},
		},
		options: [
			{
				displayName: 'Base Directory',
				name: 'base',
				type: 'string',
				default: '',
				description: 'Base directory for the build',
			},
			{
				displayName: 'Build Command',
				name: 'cmd',
				type: 'string',
				default: '',
				description: 'Build command to run',
			},
			{
				displayName: 'Functions Directory',
				name: 'functions_dir',
				type: 'string',
				default: '',
				description: 'Directory containing serverless functions',
			},
			{
				displayName: 'Publish Directory',
				name: 'dir',
				type: 'string',
				default: '',
				description: 'Directory to publish (relative to base)',
			},
		],
	},
	{
		displayName: 'Processing Settings',
		name: 'processingSettings',
		type: 'collection',
		placeholder: 'Add Setting',
		default: {},
		displayOptions: {
			show: {
				resource: ['site'],
				operation: ['configure'],
			},
		},
		options: [
			{
				displayName: 'Form Detection',
				name: 'form_detection',
				type: 'boolean',
				default: true,
				description: 'Whether to automatically detect and process forms',
			},
			{
				displayName: 'Image Optimization',
				name: 'image_optimization',
				type: 'boolean',
				default: true,
				description: 'Whether to optimize images',
			},
			{
				displayName: 'Pretty URLs',
				name: 'pretty_urls',
				type: 'boolean',
				default: true,
				description: 'Whether to enable pretty URLs',
			},
		],
	},
];
