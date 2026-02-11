# GitHub Repository Name & Description

## Repository Name Options

### Option 1: Clear & Professional ⭐⭐⭐⭐⭐
**`adobe-docubot`**
- Clean, simple
- Matches project name
- Easy to remember

### Option 2: Descriptive
**`app-builder-ai-assistant`**
- SEO-friendly
- Clear what it does
- Emphasizes AI

### Option 3: Generic (Reusable)
**`ai-docs-assistant`**
- Works for any docs
- Not Adobe-specific
- Flexible branding

### Option 4: Comprehensive
**`app-builder-slack-ai-bot`**
- Very descriptive
- Shows all components
- Good for search

---

## Recommended Repository Name

**`adobe-docubot`**

---

## Repository Description

### Short Description (GitHub one-liner)
**"AI-powered Slack bot that answers documentation questions. Built on Adobe App Builder with configurable doc sources. Demo for Adobe Summit 2026."**

### Full Description (README format)

```markdown
# Adobe DocuBot 🤖

AI-powered Slack assistant that answers questions about any public documentation using AI and web scraping. Built on Adobe App Builder to demonstrate secure, scalable, rapid application development.

**Demo**: Adobe Summit 2026 - "Zero to Production: Building AI Assistants with Adobe App Builder"

## Features

- 🤖 Ask questions in Slack using `/ab <question>`
- 📚 Scrapes and understands any public documentation
- 🔄 Reconfigurable - point at different docs without code changes
- 🔒 Secure execution on Adobe I/O Runtime
- ⚡ Auto-scales automatically
- 🚀 Deploy with one command

## Quick Start

```bash
# Clone and install
git clone https://github.com/[username]/adobe-docubot
cd adobe-docubot
npm install

# Configure
cp .env.example .env
# Add your Slack and AI API credentials

# Deploy
aio app deploy
```

## Built With

- Adobe App Builder
- Adobe I/O Runtime
- Claude AI / OpenAI
- Slack API
- Cheerio (web scraping)

## Use Cases

- App Builder documentation assistant (default)
- Adobe Analytics, AEM, or any Adobe product docs
- Internal company documentation
- API documentation
- Any public documentation site

## Learn More

- [Demo Script](DEMO_SCRIPT.md)
- [Requirements](REQUIREMENTS.md)
- [Presentation Materials](SUMMIT_SUBMISSION.md)
- [App Builder Docs](https://developer.adobe.com/app-builder/docs/)

## License

MIT License - See LICENSE file
```

---

## Repository Topics/Tags

Add these to your GitHub repo for discoverability:

```
adobe
app-builder
slack-bot
ai-assistant
documentation
adobe-io-runtime
serverless
ai
chatbot
slack
claude
openai
adobe-commerce
adobe-summit
demo
```

---

## Social Preview Text

**GitHub Social Card Text**:
"AI-powered Slack bot for documentation Q&A. Built on Adobe App Builder. Summit 2026 demo."

---

## Repository URL

**Recommended**: `github.com/[your-username]/adobe-docubot`

**Example org**: `github.com/adobe/adobe-docubot` (if official)

---

## README Badges (Optional)

```markdown
![Adobe App Builder](https://img.shields.io/badge/Adobe-App%20Builder-red)
![AI Powered](https://img.shields.io/badge/AI-Powered-blue)
![Slack](https://img.shields.io/badge/Slack-Bot-purple)
![Summit 2026](https://img.shields.io/badge/Summit-2026-orange)
```

---

## Quick Create Commands

```bash
# Create GitHub repo (requires gh CLI)
gh repo create adobe-docubot \
  --public \
  --description "AI-powered Slack bot for documentation questions. Built on Adobe App Builder. Summit 2026 demo." \
  --homepage "https://developer.adobe.com/app-builder/"

# Initialize git if not already
cd /Users/rokapoor/Documents/appbuilder/demos
git init
git add .
git commit -m "Initial commit: Adobe DocuBot demo materials"
git branch -M main
git remote add origin https://github.com/[username]/adobe-docubot.git
git push -u origin main
```

---

## .gitignore Additions

Make sure your `.gitignore` includes:

```
# Environment variables (credentials)
.env
.env.local

# Adobe I/O
.aio
console.json

# Node modules
node_modules/

# Build outputs
dist/
web-src-prod/

# OS files
.DS_Store
```

---

## Repository Structure

```
adobe-docubot/
├── README.md                          # Main project readme
├── LICENSE                            # MIT or Apache 2.0
├── .gitignore                         # Ignore credentials
├── package.json                       # Dependencies
├── app.config.yaml                    # App Builder config
├── .env.example                       # Template for env vars
├── actions/                           # App Builder actions
│   └── ask/
│       └── index.js                   # Main bot logic
├── utils/                             # Shared utilities
│   ├── docScraper.js
│   ├── aiClient.js
│   └── slackFormatter.js
├── demo/                              # Demo materials
│   ├── DEMO_SCRIPT.md
│   ├── QUICK_REFERENCE.md
│   ├── SLIDE_1_CONTENT.md
│   └── SUMMIT_SUBMISSION.md
└── docs/                              # Additional documentation
    ├── REQUIREMENTS.md
    ├── AGENTS.md
    └── PRE_RECORDING_CHECKLIST.md
```
