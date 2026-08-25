# Credentials Directory

This directory stores sensitive credentials that should **never** be committed to version control.

## Required Files

### `service-account.json`
Google Cloud service account key (JSON format) for server-side API access.

**How to generate:**
1. Go to [Google Cloud Console → IAM → Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts)
2. Select project: `arranto-analytics` (or create one)
3. Create service account: `arranto-analytics-sa`
4. Grant roles: `Analytics Data Viewer`, `Search Console Reader`
5. Create JSON key → Download → Save as `service-account.json` in this directory

**Then grant access:**
- In [GA4 Admin](https://analytics.google.com) → Property Access Management → Add the SA email as `Viewer`
- In [Google Search Console](https://search.google.com/search-console) → Settings → Users → Add the SA email as `Full` user

### Environment Variable
Once you have `service-account.json`, copy its **entire contents** into the `GOOGLE_APPLICATION_CREDENTIALS_JSON` environment variable in `.env.local`.

```bash
# Single-line JSON string (no newlines)
GOOGLE_APPLICATION_CREDENTIALS_JSON={"type":"service_account","project_id":"arranto-analytics",...}
```

## Security Rules
- ✅ This entire directory is in `.gitignore`
- ✅ Never commit credential files
- ✅ Use Vercel Environment Variables for production
- ✅ Rotate keys periodically
