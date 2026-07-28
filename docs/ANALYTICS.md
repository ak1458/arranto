# Arranto — Analytics & Google Cloud Setup Guide

> **Last Updated**: 2026-07-27

---

## 1. Google Cloud Project Setup

### Step 1: Create Project
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Click **New Project**
3. Name: `arranto-analytics`
4. Click **Create**

> **Official Docs**: [Creating a Project](https://cloud.google.com/resource-manager/docs/creating-managing-projects)

### Step 2: Enable Required APIs
Navigate to **APIs & Services → Library** and enable:

| API | Search Term | Purpose |
|-----|------------|---------|
| Google Analytics Data API | `analyticsdata` | Server-side GA4 queries |
| Google Search Console API | `searchconsole` | Programmatic search data |

> **Official Docs**: [Enabling APIs](https://cloud.google.com/apis/docs/getting-started#enabling_apis)

### Step 3: Create Service Account
1. Go to **IAM & Admin → Service Accounts**
2. Click **Create Service Account**
3. Name: `arranto-analytics-sa`
4. Description: "Read-only access to GA4 and Search Console"
5. Click **Create and Continue**
6. Add roles:
   - `Analytics Data Viewer` (for GA4 Data API)
7. Click **Done**
8. Click the new SA → **Keys** tab → **Add Key** → **Create new key** → **JSON**
9. Save the downloaded file as `credentials/service-account.json`

> **Official Docs**: [Creating Service Accounts](https://cloud.google.com/iam/docs/service-accounts-create)

### Step 4: Grant GA4 Access
1. Go to [analytics.google.com](https://analytics.google.com)
2. Admin → Property Access Management
3. Click **+** → Add users
4. Enter the service account email (format: `arranto-analytics-sa@arranto-analytics.iam.gserviceaccount.com`)
5. Role: **Viewer**

> **Official Docs**: [GA4 Data API Auth](https://developers.google.com/analytics/devguides/reporting/data/v1/quickstart-client-libraries)

### Step 5: Grant Search Console Access
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Settings → Users and permissions
3. Add user → Enter SA email
4. Permission: **Full** (needed for sitemap submission)

> **Official Docs**: [Search Console API Auth](https://developers.google.com/webmaster-tools/v1/how-tos/authorizing)

---

## 2. Google Analytics 4 Setup

### Create Property
1. Go to [analytics.google.com](https://analytics.google.com)
2. Admin → **Create Property**
3. Name: `Arranto Production`
4. Time zone: Your primary market time zone
5. Currency: USD

### Create Data Stream
1. In the property, go to **Data Streams**
2. Click **Web**
3. URL: `https://arranto.com`
4. Stream name: `Arranto Website`
5. Enable all **Enhanced Measurement** toggles

### Record IDs
- **Measurement ID** → `NEXT_PUBLIC_GA_MEASUREMENT_ID` (format: `G-XXXXXXXXXX`)
- **Property ID** → `GA4_PROPERTY_ID` (numeric, found in Admin → Property Settings)

---

## 3. Google Tag Manager Setup

### Create Container
1. Go to [tagmanager.google.com](https://tagmanager.google.com)
2. Create Account → Name: `Arranto`
3. Create Container → Name: `arranto.com` → Type: **Web**
4. Record Container ID → `NEXT_PUBLIC_GTM_ID` (format: `GTM-XXXXXXX`)

### Configure Tags
Create these tags in GTM:

| Tag Name | Type | Trigger |
|----------|------|---------|
| GA4 Configuration | Google Analytics: GA4 Configuration | All Pages |
| CTA Click | Custom Event | Click on elements matching `.cta-click` |
| Form Submit | Custom Event | Form Submission |
| Scroll Depth | Custom Event | Scroll Depth (25%, 50%, 75%, 100%) |
| Outbound Link | Custom Event | Click URL contains external domain |

---

## 4. Google Search Console Setup

### Verify Property
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add Property → **URL prefix** → `https://arranto.com`
3. Verification methods (choose one):
   - **DNS TXT record** (recommended): Add to your domain registrar
   - **HTML meta tag**: Set `NEXT_PUBLIC_GSC_VERIFICATION` env var
4. Click **Verify**

### Submit Sitemap
1. In GSC → **Sitemaps**
2. Enter: `sitemap.xml`
3. Click **Submit**

### Request Indexing
1. URL Inspection → Enter `https://arranto.com/en`
2. Click **Request Indexing**
3. Repeat for top 10 priority URLs

---

## 5. Environment Variables Checklist

Copy to `.env.local` and fill in actual values:

```bash
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
GA4_PROPERTY_ID=123456789

# Google Tag Manager
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Google Search Console
SEARCH_CONSOLE_SITE_URL=https://arranto.com
NEXT_PUBLIC_GSC_VERIFICATION=your-verification-code

# Google Cloud Service Account (paste full JSON as single line)
GOOGLE_APPLICATION_CREDENTIALS_JSON={"type":"service_account",...}

# Security
CRON_SECRET=generate-a-random-32-character-string
```

Then add the same variables to **Vercel Dashboard → Settings → Environment Variables** for production.

---

## 6. Event Tracking Implementation

### Events to Implement

| Event | Trigger | GA4 Parameters |
|-------|---------|---------------|
| `cta_click` | Any CTA button | `cta_text`, `cta_location`, `page_path` |
| `contact_form_submit` | Contact form success | `service_interest`, `locale` |
| `whatsapp_click` | WhatsApp link | `page_path` |
| `email_click` | Email link | `page_path` |
| `tool_usage` | Free tool interaction | `tool_name`, `action` |
| `chat_started` | Chat opened | `page_path` |
| `outbound_link` | External link | `link_url`, `link_text` |

### Implementation Pattern

```typescript
// In client components, push to GTM dataLayer:
window.dataLayer?.push({
  event: 'cta_click',
  cta_text: 'Start your project',
  cta_location: 'hero_section',
  page_path: window.location.pathname,
});
```

---

## References

- [GA4 Data API](https://developers.google.com/analytics/devguides/reporting/data/v1)
- [Search Console API](https://developers.google.com/webmaster-tools/v1/how-tos/search_analytics)
- [Google Tag Manager](https://developers.google.com/tag-platform/tag-manager)
- [Google Cloud IAM](https://cloud.google.com/iam/docs/overview)
- [Service Accounts Best Practices](https://cloud.google.com/iam/docs/best-practices-for-managing-service-account-keys)
