# Adobe DocuBot - Requirements

## Overview
Adobe DocuBot is a Slack AI assistant that answers questions by scraping and understanding public documentation. Built on Adobe App Builder, it brings intelligent documentation search directly into your team's Slack workspace.

**Built on App Builder for:**
- 🔒 **Security**: Enterprise-grade secure execution environment
- ⚡ **Scalability**: Auto-scaling compute via Adobe I/O Runtime
- 🛡️ **Authentication**: Built-in identity management and token handling
- 🌐 **Integration**: Extends Adobe Commerce and connects to third-party services
- 📦 **Managed Infrastructure**: Adobe handles compute, storage, and CDN
- 🔄 **Simplified Upgrades**: No core product customization, lower cost of ownership

**Default**: App Builder documentation  
**Configurable**: Point it at ANY public documentation site  
**Tagline**: AI-powered documentation assistant for Slack

**Examples of what you can point it at:**
- Adobe App Builder (default)
- Adobe Experience Manager
- Adobe Analytics
- Your company's internal docs
- Any framework docs (React, Vue, Angular, etc.)
- Any API documentation

## Priority Commands (MVP for Demo)

### 1. `/ab <question>` - AI Documentation Assistant
**Purpose**: Answer questions using AI and real-time doc scraping

**Note**: The command stays `/ab` but the documentation source is configurable via environment variables. For the demo, we start with App Builder docs, but this can be pointed at ANY public documentation.

**Behavior**:
- Accept natural language questions about App Builder
- Scrape relevant pages from developer.adobe.com/app-builder
- Use AI (Claude/GPT) to understand and answer the question
- Return formatted response with source links
- Include code examples when relevant

**Example Questions**:
```
/ab How do I deploy my app?
/ab What are the memory limits for actions?
/ab Show me an example of creating an action
/ab What's the difference between aio app run and aio app dev?
/ab How do I calculate runtime costs?
```

**Success Response Format**:
```
🤖 Adobe DocuBot

To deploy your app, use:
```
aio app deploy
```

This will:
• Build your actions
• Deploy to Adobe I/O Runtime
• Deploy web assets to CDN
• Return production URLs

💡 Pro tip: Use `aio app deploy --no-build` if you've already built locally

📖 Learn more: developer.adobe.com/app-builder/docs/guides/deployment/
```

**Error Response Format**:
```
🤖 Adobe DocuBot

❌ Hmm, I couldn't find information about that in the App Builder docs.

💡 Try rephrasing your question, or ask about:
• Deploying apps
• Creating actions
• Working with Adobe APIs
• Runtime limits and costs

📖 Browse docs: developer.adobe.com/app-builder/docs/
```

**Edge Cases to Handle**:
- Questions not related to App Builder
- Docs scraping fails (timeout, 404)
- AI API rate limits or errors
- Very broad/vague questions
- Gibberish input

**Technical Requirements**:
- Use App Builder action pattern (CommonJS)
- Scrape developer.adobe.com/app-builder/docs
- Integrate with Claude API or OpenAI API
- Return Slack Block Kit formatted JSON
- Memory: 512MB (needs space for AI calls)
- Target execution time: <5 seconds
- **Security**: Run in isolated Adobe I/O Runtime container
- **Authentication**: Leverage built-in credential management
- Cache frequently accessed docs (optional optimization)

---

### 2. `/ab` Can Answer Technical Questions Too

**Examples**:
- `/ab What are the memory limits for actions?`
- `/ab How do I optimize my app performance?`
- `/ab Show me deployment best practices`
- `/ab What's the difference between aio app run and aio app dev?`

**Response Format**:
```
🤖 Adobe DocuBot

Adobe I/O Runtime action specifications:
• Memory: 256 MB to 2048 MB
• Timeout: 60 seconds maximum
• Payload: 1 MB (sync), 5 MB (async)

💡 Pro tip: Start with 256-512 MB and adjust based on your needs.

📖 Learn more: developer.adobe.com/runtime/docs/guides/system_settings/
```

---

## Technical Constraints

### Adobe I/O Runtime
- Use CommonJS syntax (not ES modules)
- Memory limit: 512MB per action (need space for AI)
- Timeout limit: 60 seconds max (target <5s for UX)
- Runtime: Node.js 20

### Slack Integration
- Verify Slack request signatures (use signing secret)
- Return responses within 3 seconds OR use Slack's async response
- Use Block Kit for rich formatting
- Support `response_type: in_channel` for sharing with team
- **Security**: Signature verification prevents unauthorized access

### AI Integration
- Use Claude Haiku (fast, cheap) or GPT-3.5 Turbo
- Implement proper error handling for API failures
- Rate limiting awareness
- Token optimization (don't send entire docs)

### Web Scraping
- Respect robots.txt
- Cache docs locally when possible
- Handle 404s, timeouts gracefully
- Extract text from HTML (use cheerio or similar)

### Environment Variables Required
```
SLACK_BOT_TOKEN=xoxb-...
SLACK_SIGNING_SECRET=...
ANTHROPIC_API_KEY=sk-ant-...
# OR
OPENAI_API_KEY=sk-...

# Documentation Configuration
DOCS_BASE_URL=https://developer.adobe.com/app-builder/docs/
DOCS_NAME=App Builder
DOCS_SEARCH_PATTERN=**/*.html
# Optional: Multiple docs sources (comma-separated)
# DOCS_SOURCES=appbuilder:https://developer.adobe.com/app-builder/docs/,analytics:https://developer.adobe.com/analytics-apis/docs/
```

### Dependencies Allowed
- `@anthropic-ai/sdk` or `openai` for AI
- `axios` for HTTP requests
- `cheerio` for HTML parsing
- `@slack/web-api` for Slack API
- `crypto` (built-in) for signature verification

---

## File Structure Expected

```
actions/
  ask/
    index.js          # /ab command handler (main AI logic)
  
app.config.yaml       # Action configuration

.env                  # Environment variables (not committed)

package.json          # Dependencies

utils/
  docScraper.js       # App Builder docs scraping logic
  aiClient.js         # AI API wrapper
  costCalculator.js   # Cost calculation utility
```

---

## app.config.yaml Configuration

```yaml
application:
  actions: actions
  web: web-src
  runtimeManifest:
    packages:
      adobe-docubot:
        license: Apache-2.0
        actions:
          ask:
            function: actions/ask/index.js
            web: 'yes'
            runtime: 'nodejs:20'
            limits:
              timeout: 30000
              memory: 512
            annotations:
              require-adobe-auth: false
              final: true
```

---

## Success Criteria for Demo

1. ✅ `/ab How do I deploy?` returns accurate answer with examples
2. ✅ `/ab What are memory limits?` returns correct technical details
3. ✅ `/ab calculate costs for 512MB, 5s, 100 runs/day` returns calculation
4. ✅ Response includes emoji, formatting, and source links
5. ✅ Handles non-App Builder questions gracefully
6. ✅ Response time under 5 seconds
7. ✅ Total project size < 10MB
8. ✅ Deploys successfully with `aio app deploy`

---

## Documentation Sources (Configurable)

### Default: App Builder
**Primary targets**:
- https://developer.adobe.com/app-builder/docs/overview/
- https://developer.adobe.com/app-builder/docs/getting_started/
- https://developer.adobe.com/app-builder/docs/guides/
- https://developer.adobe.com/runtime/docs/guides/

### Configuration System
DocuBot can be pointed at any documentation site via environment variables:

```bash
# Single documentation source (default for demo)
DOCS_BASE_URL=https://developer.adobe.com/app-builder/docs/
DOCS_NAME=App Builder

# Examples of other sources:
# DOCS_BASE_URL=https://experienceleague.adobe.com/docs/analytics/
# DOCS_NAME=Adobe Analytics

# DOCS_BASE_URL=https://experienceleague.adobe.com/docs/experience-manager/
# DOCS_NAME=Adobe Experience Manager

# DOCS_BASE_URL=https://docs.company.com/internal/
# DOCS_NAME=Internal Platform Docs
```

### Multi-Source Support (Future Enhancement)
```bash
# Support multiple doc sources at once
DOCS_SOURCES=appbuilder:https://developer.adobe.com/app-builder/docs/,analytics:https://developer.adobe.com/analytics-apis/docs/

# User can specify which to search:
# /ab [appbuilder] How do I deploy?
# /ab [analytics] How do I query data?
```

**Search strategy**:
1. Read DOCS_BASE_URL from environment
2. Start with table of contents pages
3. Search for keywords from user question
4. Scrape relevant article
5. Extract clean text (remove nav, footer, etc.)
6. Send to AI with user question
7. AI response includes the doc source name

---

## AI Prompt Template

```
You are Adobe DocuBot, a friendly AI assistant that helps developers.

You specialize in {DOCS_NAME} documentation.

Based on the following documentation excerpt from {DOCS_BASE_URL}, 
answer the user's question clearly and concisely.

Documentation:
{scraped_doc_text}

User Question: {user_question}

Instructions:
- Be helpful and friendly (use emoji sparingly)
- Include code examples when relevant
- Keep answers concise (2-4 paragraphs max)
- Add a "Pro tip" if you have practical advice
- Always include the source URL
- Mention "{DOCS_NAME}" in your response so users know the source

Format your response in Slack markdown (mrkdwn format).
```

**Dynamic prompt based on configuration:**
- `{DOCS_NAME}` comes from environment variable (e.g., "App Builder", "Analytics", "AEM")
- `{DOCS_BASE_URL}` comes from environment variable
- This allows DocuBot to be reused for any documentation without code changes

---

## Future Enhancements (Post-Demo)

### Multi-Documentation Support
- **Multiple sources**: `/ab [source] question` to query specific docs
- **Auto-source detection**: AI figures out which doc source to use
- **Cross-reference**: "This is explained in both App Builder and AEM docs..."
- **Admin commands**: `/ab config add analytics https://...`

### Intelligence Upgrades
- **Conversational memory**: Remember context from previous questions
- **Multi-turn conversation**: "tell me more about that"
- **Code generation**: "generate a sample action that calls Adobe Analytics API"
- **Troubleshooting**: "why is my deploy failing?" with log analysis

### Team Features
- **Proactive tips**: Daily tips posted to channel (based on configured docs)
- **Team learning**: Track what questions team asks most
- **Integration with CLI**: Execute commands directly
- **Custom docs**: Point at company's internal documentation

---

## Non-Requirements (Out of Scope for MVP)

- ❌ Web UI (Slack only)
- ❌ Database/persistence (stateless for demo)
- ❌ User authentication beyond Slack
- ❌ Complex conversation history
- ❌ Integration with Adobe APIs (focus on docs only)
- ❌ Multi-language support (English only)

---

## Testing Checklist

Before recording demo:
- [ ] Test `/ab How do I deploy?` - should return deploy command
- [ ] Test `/ab What are memory limits?` - should return correct numbers
- [ ] Test `/ab calculate costs for 512MB, 5s, 100 runs daily` - accurate math
- [ ] Test `/ab Tell me about React` (off-topic) - should handle gracefully
- [ ] Test with network timeout (disconnect wifi briefly) - error handling
- [ ] Verify Slack formatting looks good (emoji, code blocks, links)
- [ ] Confirm response time is reasonable (<5s)
- [ ] Check action logs for errors
- [ ] Verify docs are being scraped correctly
- [ ] Test AI responses are accurate and helpful

---

## Why App Builder?

### Security Benefits
- **Isolated Execution**: Each action runs in its own secure container
- **Credential Management**: Environment variables kept secure, never exposed
- **Authentication**: Built-in Adobe IMS for enterprise identity management
- **API Security**: Secure integration with Adobe APIs using OAuth
- **No Infrastructure**: No servers to patch or secure

### Scalability Benefits
- **Auto-scaling**: Handles 1 request or 10,000 requests seamlessly
- **Global Distribution**: Adobe I/O Runtime runs in multiple regions
- **Concurrent Execution**: Multiple team members use simultaneously
- **No Capacity Planning**: Platform handles scaling automatically
- **Pay-per-use**: Only consume resources when actions execute

### Enterprise Benefits
- **Managed Infrastructure**: Adobe handles updates, patches, maintenance
- **High Availability**: Built on enterprise-grade infrastructure
- **Monitoring**: Built-in logging and observability
- **Compliance**: Enterprise security and compliance standards
- **Support**: Backed by Adobe enterprise support

Learn more: [App Builder Benefits](https://developer.adobe.com/app-builder/docs/overview/)

**Per query**:
- Memory allocation: 512 MB
- Average duration: ~5 seconds (includes scraping + AI processing)
- Concurrent requests: Supported via Adobe I/O Runtime

**Scalability**:
- Handles multiple team members simultaneously
- Stateless architecture (scales horizontally)
- Configurable timeout and memory limits

**Pricing Information**:
For detailed pricing information, refer to:
- [App Builder Pricing](https://developer.adobe.com/app-builder/docs/overview/)
- [AI API Pricing](https://www.anthropic.com/pricing) or [OpenAI Pricing](https://openai.com/pricing)

---

## Personality & Tone

Adobe DocuBot should be:
- **Friendly but professional** - like a helpful coworker
- **Concise** - get to the point quickly
- **Practical** - always include actionable tips
- **Encouraging** - positive about App Builder capabilities
- **Honest** - if it doesn't know, it says so

**Example personality**:
```
❌ Too formal: "The deployment process requires execution of the following command..."
✅ Just right: "To deploy your app, use `aio app deploy`. This will build everything and push it to production."

❌ Too casual: "Just type aio app deploy lol 🎉🚀💯"
✅ Just right: "To deploy your app, use `aio app deploy` 🚀"
```
