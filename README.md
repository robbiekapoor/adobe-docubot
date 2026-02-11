# Adobe DocuBot 🤖

> AI-powered documentation assistant for any public docs

An AI-powered Slack assistant that answers questions by intelligently scraping ANY public documentation and using AI to provide helpful, contextual answers with code examples and source links.

**Built with**: Adobe App Builder + Claude AI + Slack  
**Demo time**: 10 minutes  
**Purpose**: Summit 2026 demo showcasing AI-assisted development  
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

### Reconfigure for Analytics (or ANY docs)
```bash
# Change environment variables:
DOCS_BASE_URL=https://experienceleague.adobe.com/docs/analytics/
DOCS_NAME=Adobe Analytics

# Redeploy (30 seconds):
aio app deploy

# Now ask Analytics questions:
You: /ab How do I query data from Adobe Analytics?
DocuBot: [Returns Analytics-specific answer with code examples]
```

### Works With ANY Documentation
- ✅ Adobe products (App Builder, Analytics, AEM, Target, Campaign)
- ✅ Internal company docs
- ✅ Framework docs (React, Vue, Angular, Next.js)
- ✅ API documentation (Stripe, Twilio, AWS)
- ✅ Platform docs (Kubernetes, Docker, Terraform)
- ✅ ANY public documentation site

---

## Demo Files

### 📋 Core Documentation
- **`REQUIREMENTS.md`** - Full technical requirements and specifications
- **`AGENTS.md`** - Context for AI coding agents (Cursor, Claude Code, etc.)
- **`DEMO_SCRIPT.md`** - Complete 10-minute demo script with timing
- **`SLIDE_1_CONTENT.md`** - PowerPoint content for opening App Builder intro
- **`QUICK_REFERENCE.md`** - One-page cheat sheet for recording
- **`PRE_RECORDING_CHECKLIST.md`** - Step-by-step preparation guide

### 🎯 Quick Start

**For the demo:**
1. Create PowerPoint with Slide 1 (use `SLIDE_1_CONTENT.md`)
2. Read `QUICK_REFERENCE.md` (print or keep on second monitor)
3. Follow `PRE_RECORDING_CHECKLIST.md` the day before
4. Execute `DEMO_SCRIPT.md` during recording

**For development:**
1. Give `REQUIREMENTS.md` to your AI agent
2. Use `AGENTS.md` for context
3. Start building!

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
- Runtime: Adobe I/O Runtime (Node.js 20)
- AI: Claude Haiku or GPT-3.5 Turbo
- Scraping: Cheerio (HTML parsing)
- Slack: Block Kit for rich formatting
- Memory: 512MB
- Timeout: 30 seconds
- **Configuration**: Environment variables (no code changes!)

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
- 🌐 **Extend Adobe Commerce**: Native functionality extensions without core customization
- 🔌 **Third-party integration**: Connect to any external service or API
- 📦 **Managed platform**: Adobe handles compute, storage, and CDN provisioning
- 🔄 **Simplified upgrades**: No core product changes, lower cost of ownership

### AI Integration
- Claude Haiku or GPT-3.5 Turbo
- ~5 second response time (includes scraping + AI)
- Handles concurrent requests

### Pricing Information
For App Builder pricing and feature details, visit:
- [App Builder Overview](https://developer.adobe.com/app-builder/docs/overview/)
- [Security & Compliance](https://developer.adobe.com/app-builder/docs/guides/security/)
- [Runtime Documentation](https://developer.adobe.com/runtime/docs/)

For AI API pricing:
- [Anthropic Pricing](https://www.anthropic.com/pricing)
- [OpenAI Pricing](https://openai.com/pricing)

---


## Test Questions for Demo

### Easy (Show It Works)
```
/ab How do I deploy my app?
```
Expected: Returns `aio app deploy` command with explanation

### Technical (Show Intelligence)
```
/ab What are the memory limits for actions?
```
Expected: Returns 256MB-2048MB with details

### Advanced (Show Understanding)
```
/ab What's the difference between aio app run and aio app dev?
```
Expected: Returns clear explanation of the two commands with practical tips

### Error Handling (Optional)
```
/ab Tell me about React hooks
```
Expected: Politely says not in App Builder docs, stays helpful

---

## Environment Variables Needed

```bash
# Slack
SLACK_BOT_TOKEN=xoxb-...
SLACK_SIGNING_SECRET=...

# AI (choose one)
ANTHROPIC_API_KEY=sk-ant-...
# OR
OPENAI_API_KEY=sk-...

# Documentation Configuration (THIS IS THE MAGIC!)
DOCS_BASE_URL=https://developer.adobe.com/app-builder/docs/
DOCS_NAME=App Builder

# Examples of other docs you can point to:
# DOCS_BASE_URL=https://experienceleague.adobe.com/docs/analytics/
# DOCS_NAME=Adobe Analytics

# DOCS_BASE_URL=https://experienceleague.adobe.com/docs/experience-manager/
# DOCS_NAME=Adobe Experience Manager

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
DOCS_BASE_URL=https://new-docs-url.com/
DOCS_NAME=New Product Name

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
│   ├── docScraper.js         # Scrapes App Builder docs
│   ├── aiClient.js           # AI API wrapper
│   └── costCalculator.js     # Cost calculation logic
├── app.config.yaml           # Action configuration
├── package.json              # Dependencies
├── .env                      # Environment variables (not committed)
├── REQUIREMENTS.md           # Full specifications
├── AGENTS.md                 # AI agent context
├── DEMO_SCRIPT.md            # Demo script
├── QUICK_REFERENCE.md        # Cheat sheet
└── PRE_RECORDING_CHECKLIST.md # Setup guide
```

---

## Dependencies

```json
{
  "dependencies": {
    "@anthropic-ai/sdk": "^0.20.0",
    "axios": "^1.6.0",
    "cheerio": "^1.0.0",
    "@slack/web-api": "^6.11.0",
    "@adobe/aio-sdk": "^5.0.0"
  }
}
```

---

## Buddy's Personality

**Tone**: Helpful coworker, not a robot or formal documentation

**Do's:**
- ✅ Be concise (2-4 paragraphs)
- ✅ Include code examples
- ✅ Add practical tips
- ✅ Use 🤖 for branding
- ✅ End with 📖 source link

**Don'ts:**
- ❌ Be overly formal ("The deployment procedure necessitates...")
- ❌ Be too casual ("Just type aio app deploy lol 🎉🚀💯")
- ❌ Over-apologize ("I'm just an AI...")
- ❌ Give up easily (try to be helpful)

---

## Extension Ideas (Post-Demo)

Once deployed, you could extend DocuBot with:

### Multi-Documentation Support
1. **Multiple Sources**: `/ab [source] question` to query specific docs
2. **Auto-Detection**: AI figures out which doc source based on question
3. **Cross-Reference**: "This is explained in both App Builder and AEM docs..."
4. **Admin Commands**: `/ab config add analytics https://...` to add new sources
5. **Source Switching**: `/ab use analytics` to change default

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
- [Slack Block Kit Builder](https://app.slack.com/block-kit-builder/)
- [Claude API Documentation](https://docs.anthropic.com/claude/reference/)
- [OpenAI API Documentation](https://platform.openai.com/docs/)
- [Cheerio Documentation](https://cheerio.js.org/)

---

## Credits

**Created for**: Adobe Summit 2026  
**Demo Purpose**: Showcase AI-assisted App Builder development  
**Theme**: Understanding App Builder costs + AI capabilities  
**Target Audience**: Developers, technical architects, product managers  
**Presentation Length**: 15-20 minutes (8-9 slides)

---

## License

This is a demo project. Feel free to use, modify, and deploy for your own needs.

---

## Next Steps

1. ✅ Read through `PRE_RECORDING_CHECKLIST.md`
2. ✅ Set up Slack workspace and bot
3. ✅ Get AI API key (Claude or OpenAI)
4. ✅ Practice demo once (don't record)
5. ✅ Record demo following `DEMO_SCRIPT.md`
6. ✅ Deploy for real use by your team!

---

**Ready to build DocuBot? Let's go! 🚀**

Questions? Check the detailed documentation in each file, or just ask DocuBot once it's deployed! 🤖
