# Adobe DocuBot 🤖

> AI-powered documentation assistant for any public docs

An AI-powered Slack assistant that answers questions by intelligently scraping ANY public documentation and using AI to provide helpful, contextual answers with code examples and source links.

**Built with**: Adobe App Builder + Groq AI + Slack  
**Key Feature**: Configure it to work with ANY documentation site  
**Pricing**: Available at developer.adobe.com/app-builder/docs/overview/

---

## What It Does

Type `/ab <your question>` in Slack and get instant, intelligent answers from any documentation you configure:

### Default: App Builder Docs
```
You: /ab How do I deploy my app?

DocuBot: 🤖 To deploy your app, use:
       
       aio app deploy
       
       This will build your actions and deploy to Adobe I/O Runtime
       
       💡 Pro tip: Use --no-build if you've already built locally
       📖 Learn more: developer.adobe.com/app-builder/docs/...
```

### Reconfigure for AEM (or ANY docs)
```bash
# Change environment variables:
DOCS_BASE_URL=https://experienceleague.adobe.com/en/docs/experience-manager/
DOCS_NAME=Adobe Experience Manager

# Redeploy (30 seconds):
aio app deploy

# Now ask AEM questions:
You: /ab How do I create content fragments?
DocuBot: [Returns AEM-specific answer with code examples]
```

### Works With ANY Documentation

**Adobe Products:**
- ✅ App Builder (developer.adobe.com/app-builder/docs/)
- ✅ Adobe Experience Manager (experienceleague.adobe.com/en/docs/experience-manager/)
- ✅ Adobe Experience Platform (experienceleague.adobe.com/en/docs/experience-platform/)

**Public Documentation:**
- ✅ Kubernetes (kubernetes.io/docs/)
- ✅ React (react.dev/)
- ✅ Docker (docs.docker.com/)
- ✅ Angular, Vue, Next.js, and more

**Other Sources:**
- ✅ Internal company documentation
- ✅ API documentation (Stripe, Twilio, AWS)
- ✅ ANY publicly accessible docs

---

## Quick Start

### Prerequisites
1. Adobe Developer Account with App Builder access
2. Slack workspace with admin access
3. Groq API key (free tier available at console.groq.com)

### Setup Steps

1. **Install Adobe I/O CLI**
   ```bash
   npm install -g @adobe/aio-cli
   ```

2. **Initialize Project**
   ```bash
   aio app init adobe-docubot --standalone-app
   ```

3. **Configure Environment Variables**
   Create `.env` file with required credentials (see Environment Variables section below)

4. **Install Dependencies**
   ```bash
   npm install
   ```

5. **Deploy**
   ```bash
   aio app deploy
   ```

---

## Architecture

```
User types in Slack: /ab How do I deploy?
         ↓
Slack → Adobe I/O Runtime Action
         ↓
Action:
  1. Reads DOCS_BASE_URL from environment
  2. Scrapes that documentation site
  3. Extracts relevant documentation
  4. Sends to Claude AI with question
  5. AI generates helpful answer
  6. Formats for Slack Block Kit
         ↓
User sees formatted answer in Slack

Change DOCS_BASE_URL → Same bot, different expertise!
```

**Tech Stack:**
- Runtime: Adobe I/O Runtime (Node.js 18)
- AI: Groq (Llama 3.3 70B)
- Scraping: Cheerio (HTML parsing)
- Slack: Block Kit for rich formatting
- Memory: 512MB
- Timeout: 30 seconds
- **Configuration**: Environment variables (no code changes!)
- **Security**: Rate limiting, input validation, API key masking

---

## Technical Specifications

### Runtime (App Builder)
- Memory: 512 MB per action
- Duration: ~5 seconds per question
- Runtime: Adobe I/O Runtime (Node.js 20)
- Deployment: One command (`aio app deploy`)
- **Security**: Isolated container execution
- **Scalability**: Auto-scales with demand
- **Authentication**: Built-in credential management

### Why App Builder?
App Builder provides enterprise-grade benefits:
- 🔒 **Secure by default**: Isolated execution, encrypted credentials
- ⚡ **Auto-scaling compute**: Handles 1 or 10,000 requests seamlessly
- 🛡️ **Built-in authentication**: Adobe IMS integration for enterprise identity
- 🌐 **Extend Adobe Products**: Native functionality extensions without core customization
- 🔌 **Third-party integration**: Connect to any external service or API
- 📦 **Managed platform**: Adobe handles compute, storage, and CDN provisioning
- 🔄 **Simplified upgrades**: No core product changes, lower cost of ownership

### AI Integration
- Groq API with Llama 3.3 70B model
- ~3-5 second response time (includes scraping + AI)
- Handles concurrent requests
- Free tier: 14,400 requests/day

### Pricing Information
For App Builder pricing and feature details, visit:
- [App Builder Overview](https://developer.adobe.com/app-builder/docs/overview/)
- [Security & Compliance](https://developer.adobe.com/app-builder/docs/guides/security/)
- [Runtime Documentation](https://developer.adobe.com/runtime/docs/)

For Groq API:
- [Groq Console](https://console.groq.com/) - Free tier available

---

## Environment Variables

```bash
# Slack
SLACK_BOT_TOKEN=xoxb-...
SLACK_SIGNING_SECRET=...

# AI
GROQ_API_KEY=gsk-...

# Documentation Configuration (THIS IS THE MAGIC!)
DOCS_BASE_URL=https://developer.adobe.com/app-builder/docs/
DOCS_NAME=App Builder

# Examples of other docs you can point to:

# Adobe Experience Manager:
# DOCS_BASE_URL=https://experienceleague.adobe.com/en/docs/experience-manager/
# DOCS_NAME=Adobe Experience Manager

# Adobe Experience Platform:
# DOCS_BASE_URL=https://experienceleague.adobe.com/en/docs/experience-platform/
# DOCS_NAME=Adobe Experience Platform

# Public Documentation:
# DOCS_BASE_URL=https://kubernetes.io/docs/
# DOCS_NAME=Kubernetes

# DOCS_BASE_URL=https://react.dev/
# DOCS_NAME=React

# DOCS_BASE_URL=https://docs.docker.com/
# DOCS_NAME=Docker

# Internal company docs:
# DOCS_BASE_URL=https://docs.yourcompany.com/platform/
# DOCS_NAME=Internal Platform

# Adobe (auto-populated by aio CLI)
AIO_runtime_auth=...
AIO_runtime_namespace=...
```

### Reconfigure for Different Docs

**No code changes needed!** Just update environment variables:

```bash
# 1. Edit .env file
# Switch to Experience Platform:
DOCS_BASE_URL=https://experienceleague.adobe.com/en/docs/experience-platform/
DOCS_NAME=Adobe Experience Platform

# Or switch to Kubernetes:
DOCS_BASE_URL=https://kubernetes.io/docs/
DOCS_NAME=Kubernetes

# 2. Redeploy (30 seconds)
aio app deploy

# 3. Done! DocuBot now answers questions from new docs
```

---

## Development Commands

```bash
# Initialize project
aio app init adobe-docubot --standalone-app

# Run locally (hot reload)
aio app dev

# Deploy to production
aio app deploy

# View logs
aio app logs

# Test action directly
curl -X POST https://your-namespace.adobeioruntime.net/.../ask \
  -H "Content-Type: application/json" \
  -d '{"text": "How do I deploy?"}'
```

---

## File Structure

```
adobe-docubot/
├── actions/
│   └── ask/
│       └── index.js          # Main AI handler
├── utils/
│   ├── docScraper.js         # Scrapes documentation
│   ├── aiClient.js           # Groq AI API wrapper
│   ├── costCalculator.js     # Cost calculation logic
│   └── security.js           # Rate limiting, input validation
├── app.config.yaml           # Action configuration
├── package.json              # Dependencies
├── .env                      # Environment variables (not committed)
├── .env.example              # Environment variables template
├── SECURITY.md               # Security features documentation
└── README.md                 # This file
```

---

## Dependencies

```json
{
  "dependencies": {
    "@adobe/aio-sdk": "^6.0.0",
    "axios": "^1.6.0",
    "cheerio": "^1.0.0-rc.12"
  }
}
```

**Note**: Groq API is accessed via REST API (no SDK dependency needed)

---

## Security Features

DocuBot includes built-in security:
- ✅ **Rate Limiting**: 10 requests per user per minute
- ✅ **Input Validation**: Max 500 characters, sanitized input
- ✅ **API Key Masking**: Keys never appear in logs
- ✅ **User-Friendly Errors**: No system details exposed

See `SECURITY.md` for detailed documentation.

---

## Extension Ideas (Post-Demo)

Once deployed, you could extend DocuBot with:

### Multi-Documentation Support

**Currently:** DocuBot searches ONE documentation source at a time (configured via `DOCS_BASE_URL`).

**Enhancement:** Query multiple documentation sources with a single command!

#### Option 1: Prefix Commands (Recommended - Easy to Implement)

Allow users to specify which docs to search:

```bash
# Adobe Products
/ab How do I deploy?                    # Uses default (App Builder)
/ab aem How do I create content fragments?  # Searches AEM docs
/ab aep How do I ingest data?           # Searches Experience Platform docs

# Public Documentation
/ab k8s How do I create a pod?          # Searches Kubernetes docs
/ab react How do I use hooks?           # Searches React docs
/ab docker How do I create a container? # Searches Docker docs
```

**Implementation:** Modify `actions/ask/index.js`:

```javascript
// Add after line that extracts question
let docsUrl = process.env.DOCS_BASE_URL;
let docsName = process.env.DOCS_NAME;

// Detect source prefix - Adobe Products
if (question.startsWith('aem ')) {
  docsUrl = 'https://experienceleague.adobe.com/en/docs/experience-manager/';
  docsName = 'Adobe Experience Manager';
  question = question.replace('aem ', '');
} else if (question.startsWith('aep ')) {
  docsUrl = 'https://experienceleague.adobe.com/en/docs/experience-platform/';
  docsName = 'Adobe Experience Platform';
  question = question.replace('aep ', '');
}
// Detect source prefix - Public Docs
else if (question.startsWith('k8s ') || question.startsWith('kubernetes ')) {
  docsUrl = 'https://kubernetes.io/docs/';
  docsName = 'Kubernetes';
  question = question.replace(/^(k8s|kubernetes) /, '');
} else if (question.startsWith('react ')) {
  docsUrl = 'https://react.dev/';
  docsName = 'React';
  question = question.replace('react ', '');
} else if (question.startsWith('docker ')) {
  docsUrl = 'https://docs.docker.com/';
  docsName = 'Docker';
  question = question.replace('docker ', '');
}

// Pass docsUrl and docsName to docScraper instead of reading from env
```

Then update `utils/docScraper.js` to accept these as parameters:

```javascript
async function scrapeDocs(question, docsUrl, docsName) {
  // Use passed parameters instead of process.env
  const baseUrl = docsUrl || process.env.DOCS_BASE_URL;
  // ... rest of scraping logic
}
```

#### Option 2: Smart Detection (AI-Based)

Let AI figure out which docs based on keywords:

```javascript
function detectDocSource(question) {
  const lowerQ = question.toLowerCase();
  
  // Adobe Products
  if (lowerQ.includes('aem') || lowerQ.includes('experience manager') || lowerQ.includes('content fragment')) {
    return {
      url: 'https://experienceleague.adobe.com/en/docs/experience-manager/',
      name: 'Adobe Experience Manager'
    };
  }
  
  if (lowerQ.includes('experience platform') || lowerQ.includes('aep') || lowerQ.includes('data lake') || lowerQ.includes('schema')) {
    return {
      url: 'https://experienceleague.adobe.com/en/docs/experience-platform/',
      name: 'Adobe Experience Platform'
    };
  }
  
  // Public Documentation
  if (lowerQ.includes('kubernetes') || lowerQ.includes('k8s') || lowerQ.includes('pod') || lowerQ.includes('deployment')) {
    return {
      url: 'https://kubernetes.io/docs/',
      name: 'Kubernetes'
    };
  }
  
  if (lowerQ.includes('react') || lowerQ.includes('hook') || lowerQ.includes('jsx') || lowerQ.includes('component')) {
    return {
      url: 'https://react.dev/',
      name: 'React'
    };
  }
  
  if (lowerQ.includes('docker') || lowerQ.includes('container') || lowerQ.includes('dockerfile') || lowerQ.includes('image')) {
    return {
      url: 'https://docs.docker.com/',
      name: 'Docker'
    };
  }
  
  // Add more as needed...
  // Angular: https://angular.dev/
  // Vue: https://vuejs.org/guide/
  // Next.js: https://nextjs.org/docs
  
  // Default to App Builder
  return {
    url: process.env.DOCS_BASE_URL,
    name: process.env.DOCS_NAME
  };
}
```

#### Option 3: Multi-Source Search (Most Powerful)

Search ALL configured sources and let AI pick the best answer:

```javascript
const DOC_SOURCES = [
  // Adobe Products
  { url: 'https://developer.adobe.com/app-builder/docs/', name: 'App Builder' },
  { url: 'https://experienceleague.adobe.com/en/docs/experience-manager/', name: 'Adobe Experience Manager' },
  { url: 'https://experienceleague.adobe.com/en/docs/experience-platform/', name: 'Adobe Experience Platform' },
  
  // Open Source / Public Docs
  { url: 'https://kubernetes.io/docs/', name: 'Kubernetes' },
  { url: 'https://react.dev/', name: 'React' },
  { url: 'https://docs.docker.com/', name: 'Docker' }
];

async function searchAllSources(question) {
  const results = await Promise.all(
    DOC_SOURCES.map(source => scrapeDocs(question, source.url, source.name))
  );
  
  // Combine all results and let AI pick most relevant
  const combinedContext = results
    .filter(r => r.content)
    .map(r => `From ${r.name}:\n${r.content}`)
    .join('\n\n');
  
  return combinedContext;
}
```

**Supported Documentation Sources:**
All three options support Adobe products (AEM, Experience Platform) AND public docs (Kubernetes, React, Docker, and more). Add any documentation source by following the patterns above.

**Trade-offs:**
- **Option 1**: Fastest, most control, users know exactly what they're searching (best for many sources)
- **Option 2**: More user-friendly, but might guess wrong (best for 3-5 common sources)
- **Option 3**: Most comprehensive, searches everything, but slower and uses more AI tokens (best for broad questions)

### Intelligence Features
6. **Conversational Memory**: Remember previous questions in thread
7. **Code Generation**: "Generate an action that calls Adobe Analytics"
8. **Troubleshooting**: Analyze error logs and suggest fixes
9. **CLI Integration**: Execute `aio` commands directly from Slack

### Team Features
10. **Proactive Tips**: Post daily tips from configured docs to channel
11. **Team Learning**: Track common questions, identify doc gaps
12. **Custom Docs**: Point at company's internal documentation
13. **Multi-source**: Search GitHub issues, Stack Overflow
14. **Interactive Tutorials**: Step-by-step guides with checkpoints

---

## Success Metrics

After deploying, track:
- 📊 Questions asked per day
- ⏱️ Average response time
- 👍 Answer quality (thumbs up/down)
- 💰 Actual costs vs. estimates
- 📈 Team productivity gains
- 🎯 Most common questions (identify doc gaps)

---

## Resources

- [App Builder Documentation](https://developer.adobe.com/app-builder/docs/)
- [Groq Console](https://console.groq.com/)
- [Slack Block Kit Builder](https://app.slack.com/block-kit-builder/)
- [Cheerio Documentation](https://cheerio.js.org/)

---

## License

MIT License - Feel free to use, modify, and deploy for your own needs.

---

## Support

For issues or questions:
1. Check `SECURITY.md` for security-related questions
2. Review App Builder documentation for platform questions
3. Open an issue in this repository

---

**Ready to build DocuBot? Let's go! 🚀**
