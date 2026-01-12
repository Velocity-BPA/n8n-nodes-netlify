# n8n-nodes-netlify

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

A comprehensive n8n community node for Netlify's REST API that enables full programmatic management of sites, deployments, forms, functions, DNS, and identity services. This node empowers workflow automation for JAMstack deployments, form processing pipelines, and edge function orchestration.

![n8n](https://img.shields.io/badge/n8n-community--node-blue)
![Version](https://img.shields.io/badge/version-1.0.0-green)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)

## Features

- **Complete Site Management** - Create, configure, and manage Netlify sites programmatically
- **Deploy Automation** - Trigger, cancel, lock/unlock, and publish deployments
- **Form & Submission Handling** - Process form submissions with spam filtering
- **Environment Variables** - Manage context-aware environment variables
- **Serverless Functions** - Invoke and monitor Netlify Functions
- **Build Management** - Trigger, cancel, and retry builds
- **DNS Zone Management** - Full DNS record management for custom domains
- **Webhook Hooks** - Configure notification hooks for various events
- **Deploy Keys** - Manage SSH keys for private repository access
- **Team Members** - Invite and manage team member access
- **Split Testing** - Create and manage A/B tests with traffic distribution
- **Trigger Node** - Webhook-based triggers for deploy and form events

## Installation

### Community Nodes (Recommended)

1. Open your n8n instance
2. Go to **Settings** > **Community Nodes**
3. Click **Install a community node**
4. Enter `n8n-nodes-netlify`
5. Click **Install**

### Manual Installation

```bash
# Navigate to your n8n installation directory
cd ~/.n8n

# Install the package
npm install n8n-nodes-netlify

# Restart n8n
```

### Development Installation

```bash
# Clone or extract the package
cd n8n-nodes-netlify

# Install dependencies
npm install

# Build the project
npm run build

# Create symlink to n8n custom nodes
mkdir -p ~/.n8n/custom
ln -s $(pwd) ~/.n8n/custom/n8n-nodes-netlify

# Restart n8n
```

## Credentials Setup

### Netlify API Credentials

| Field | Description |
|-------|-------------|
| **Access Token** | Personal Access Token from Netlify Dashboard |

**To obtain your Access Token:**

1. Log in to [Netlify](https://app.netlify.com)
2. Go to **User Settings** > **Applications** > **Personal access tokens**
3. Click **New access token**
4. Enter a description and click **Generate token**
5. Copy the token immediately (it's only shown once)

## Resources & Operations

### Site

| Operation | Description |
|-----------|-------------|
| Create | Create a new site |
| Get | Get site details by ID |
| Get All | List all sites |
| Update | Update site settings |
| Delete | Delete a site |
| Configure | Configure site build settings |
| Restore | Restore a deleted site |
| Enable SSL | Enable SSL/HTTPS for site |
| Provision SSL | Provision Let's Encrypt certificate |
| Unlink | Unlink site from Git repository |

### Deploy

| Operation | Description |
|-----------|-------------|
| Create | Create a new deploy |
| Get | Get deploy details |
| Get All | List deploys for a site |
| Cancel | Cancel a deploy |
| Lock | Lock deploy (prevent auto-publishing) |
| Unlock | Unlock deploy |
| Publish | Publish a deploy to production |
| Restore | Restore a previous deploy |
| Get Log | Get deploy build log |

### Form

| Operation | Description |
|-----------|-------------|
| Get | Get form details |
| Get All | List all forms for site |
| Delete | Delete a form |
| Get Submissions | Get form submissions |
| Enable Spam Filter | Enable Akismet spam filtering |
| Disable Spam Filter | Disable spam filtering |

### Submission

| Operation | Description |
|-----------|-------------|
| Get | Get submission details |
| Get All | List all submissions |
| Delete | Delete a submission |
| Mark Spam | Mark submission as spam |
| Mark Ham | Mark submission as not spam |

### Environment Variable

| Operation | Description |
|-----------|-------------|
| Create | Create environment variable |
| Get | Get environment variable |
| Get All | List all environment variables |
| Update | Update environment variable |
| Delete | Delete environment variable |
| Set Value | Set value for specific context |

**Context Support:**
- `all` - All deploy contexts
- `dev` - Local development
- `branch-deploy` - Branch deploys
- `deploy-preview` - Deploy previews
- `production` - Production deploys

### Function

| Operation | Description |
|-----------|-------------|
| Get | Get function details |
| Get All | List all functions for site |
| Invoke | Invoke a function |
| Get Logs | Get function invocation logs |

### Build

| Operation | Description |
|-----------|-------------|
| Get | Get build details |
| Get All | List builds for site |
| Trigger | Trigger a new build |
| Cancel | Cancel a running build |
| Retry | Retry a failed build |

### DNS Zone

| Operation | Description |
|-----------|-------------|
| Create | Create a DNS zone |
| Get | Get DNS zone details |
| Get All | List all DNS zones |
| Delete | Delete a DNS zone |
| Get DNS Records | Get DNS records for zone |
| Create DNS Record | Create a DNS record |
| Delete DNS Record | Delete a DNS record |

**Supported Record Types:** A, AAAA, CNAME, MX, TXT, NS

### Hook

| Operation | Description |
|-----------|-------------|
| Create | Create a notification hook |
| Get | Get hook details |
| Get All | List all hooks for site |
| Update | Update hook configuration |
| Delete | Delete a hook |
| Enable | Enable a hook |
| Disable | Disable a hook |

**Hook Types:** url, email, slack

### Deploy Key

| Operation | Description |
|-----------|-------------|
| Create | Create a deploy key |
| Get | Get deploy key details |
| Get All | List all deploy keys |
| Delete | Delete a deploy key |

### Member

| Operation | Description |
|-----------|-------------|
| Get | Get team member details |
| Get All | List team members |
| Invite | Invite a member to team |
| Remove | Remove member from team |
| Update Role | Update member role |

**Roles:** Owner, Collaborator, Controller

### Split Test

| Operation | Description |
|-----------|-------------|
| Create | Create a split test |
| Get | Get split test details |
| Get All | List all split tests |
| Update | Update split test |
| Start | Start a split test |
| Stop | Stop a split test |

## Trigger Node

The Netlify Trigger node listens for webhook events from Netlify.

### Supported Events

| Event | Description |
|-------|-------------|
| deploy_building | Deploy build started |
| deploy_created | Deploy created |
| deploy_failed | Deploy failed |
| deploy_succeeded | Deploy succeeded (published) |
| deploy_locked | Deploy locked |
| deploy_unlocked | Deploy unlocked |
| submission_created | Form submission received |
| split_test_activated | A/B test started |
| split_test_deactivated | A/B test stopped |
| deploy_request_pending | Deploy request pending |
| deploy_request_accepted | Deploy request accepted |

### Webhook Payload

The trigger receives webhook data including:
- `id` - Event ID
- `site_id` - Site ID
- `build_id` - Build ID (for deploy events)
- `state` - Current state
- `branch` - Git branch
- `deploy_url` - Preview URL
- `commit_ref` - Git commit SHA
- `review_url` - Review URL (for deploy previews)

## Usage Examples

### Trigger Deploy on Git Push

```
1. Use "GitHub Trigger" to detect push events
2. Connect to "Netlify" node
3. Set Resource: Build, Operation: Trigger
4. Configure Site ID and branch
5. Workflow automatically triggers builds on push
```

### Process Form Submissions

```
1. Use "Netlify Trigger" with event: submission_created
2. Connect to processing nodes (e.g., Google Sheets, CRM)
3. Form submissions are automatically captured and processed
```

### Manage Environment Variables

```
1. Use "Netlify" node with Resource: Environment Variable
2. Set context-specific values (production, preview, dev)
3. Automate environment configuration across deployments
```

## API Rate Limits

- **General rate limit:** 500 requests per minute
- **Deploy operations:** Stricter limits apply
- The node implements automatic retry with exponential backoff on rate limit errors

## Error Handling

The node handles common API errors:

| Error Code | Description |
|------------|-------------|
| 400 | Bad request - Invalid parameters |
| 401 | Unauthorized - Invalid or missing token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not found - Resource doesn't exist |
| 409 | Conflict - Resource already exists |
| 422 | Unprocessable Entity - Validation failed |
| 429 | Too Many Requests - Rate limited |
| 500 | Internal Server Error |

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Watch mode for development
npm run dev
```

## Author

**Velocity BPA**
- Website: [velobpa.com](https://velobpa.com)
- GitHub: [Velocity-BPA](https://github.com/Velocity-BPA)

## Licensing

This n8n community node is licensed under the **Business Source License 1.1**.

### Free Use
Permitted for personal, educational, research, and internal business use.

### Commercial Use
Use of this node within any SaaS, PaaS, hosted platform, managed service, or paid automation offering requires a commercial license.

For licensing inquiries: **licensing@velobpa.com**

See [LICENSE](LICENSE), [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md), and [LICENSING_FAQ.md](LICENSING_FAQ.md) for details.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure all tests pass and linting is clean before submitting.

## Support

- **Issues:** [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-netlify/issues)
- **Documentation:** [Netlify API Docs](https://docs.netlify.com/api/get-started/)
- **Licensing:** licensing@velobpa.com

## Acknowledgments

- [Netlify](https://netlify.com) for their comprehensive API
- [n8n](https://n8n.io) for the workflow automation platform
- The n8n community for feedback and contributions
