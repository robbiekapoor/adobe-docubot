# Adobe DocuBot - Project Context

## What This Is
Adobe DocuBot is a Slack AI assistant built on Adobe App Builder that:
- Answers questions by scraping and understanding public documentation
- Uses AI to understand and explain complex topics
- Brings intelligent documentation search into Slack
- **Configurable**: Can point at ANY public documentation (not just App Builder)
- Demonstrates AI-assisted development workflow

**Tagline**: AI-powered documentation assistant for Slack
**Default**: App Builder docs (for demo)
**Extensible**: Point it at Analytics, AEM, your internal docs, any API docs, etc.

## Architecture
- **Runtime**: Adobe I/O Runtime (Apache OpenWhisk)
- **Memory**: 512MB per action (needs space for AI calls)
- **Expected Duration**: 3-5 seconds per question
- **Integration**: Slack Slash Commands + AI API (Claude/OpenAI)
- **Scalability**: Stateless, handles concurrent requests
- **Pricing**: See developer.adobe.com/app-builder/docs/overview/ for details

## Slack Commands Implemented

### `/ab <your question>`
Ask anything about Adobe App Builder
- Scrapes relevant App Builder documentation
- Uses AI to understand and answer
- Returns formatted response with sources
- Includes code examples and pro tips

**Examples**:
- `/ab How do I deploy my app?`
- `/ab What are the memory limits?`
- `/ab Calculate costs for 512MB running 5s, 100 times daily`
- `/ab Show me an example action`

## Key Files

### `actions/ask/index.js`
Main AI assistant handler
- Receives Slack slash command
- Extracts question from payload
- Calls doc scraper to get relevant content
- Sends to AI for answer generation
- Formats response for Slack Block Kit
- Handles errors gracefully

### `utils/docScraper.js`
Documentation scraping utility
- Fetches pages from developer.adobe.com/app-builder
- Extracts clean text (removes nav, footer)
- Searches for keywords from question
- Returns relevant documentation sections

### `utils/aiClient.js`
AI API wrapper
- Connects to Claude or OpenAI
- Formats prompts for App Builder context
- Handles rate limits and errors
- Optimizes token usage

### `utils/costCalculator.js`
Cost calculation utility
- Parses cost questions
- Performs technical calculations and analysis
- Formats results with optimization tips

### `app.config.yaml`
Action configuration
- Maps `/ab` command to action
- Sets memory limit (512MB)
- Configures timeout (30s)

### `.env`
Environment variables (DO NOT COMMIT)
```
# Slack Configuration
SLACK_BOT_TOKEN=xoxb-...
SLACK_SIGNING_SECRET=...

# AI Configuration
ANTHROPIC_API_KEY=sk-ant-...
# OR
OPENAI_API_KEY=sk-...

# Documentation Configuration (Configurable!)
DOCS_BASE_URL=https://developer.adobe.com/app-builder/docs/
DOCS_NAME=App Builder

# Examples of other docs you can point to:
# DOCS_BASE_URL=https://experienceleague.adobe.com/docs/analytics/
# DOCS_NAME=Adobe Analytics

# Adobe I/O Runtime (auto-populated)
AIO_runtime_auth=...
AIO_runtime_namespace=...
```

## AI Development Patterns

When using Cursor/AI to extend Adobe DocuBot:

### Good Prompts
✅ "Add caching for frequently accessed docs to reduce scraping"
✅ "Make the AI responses more concise - target 2-3 paragraphs max"
✅ "Add support for follow-up questions by maintaining conversation context"
✅ "Improve error messages when AI API rate limits are hit"
✅ "Add ability to search GitHub issues in addition to docs"
✅ "Add support for multiple documentation sources - user can specify [source] in question"
✅ "Create an admin command to reconfigure DOCS_BASE_URL without redeploying"

### Common AI Mistakes to Watch For
❌ Using ES modules (use CommonJS: `require()` not `import`)
❌ Hardcoding API keys (always use `process.env.VAR_NAME`)
❌ Sending entire doc pages to AI (use smart excerpting)
❌ Forgetting Slack 3-second response limit (use async responses for slow queries)
❌ Not handling AI API failures gracefully

## Documentation Scraping Strategy

### Configurable Documentation Sources
```javascript
// Read from environment variables
const DOCS_CONFIG = {
  baseUrl: process.env.DOCS_BASE_URL || 'https://developer.adobe.com/app-builder/docs/',
  name: process.env.DOCS_NAME || 'App Builder',
  searchPattern: process.env.DOCS_SEARCH_PATTERN || '**/*.html'
};

// Default URLs for App Builder (demo)
const APP_BUILDER_URLS = {
  overview: 'https://developer.adobe.com/app-builder/docs/overview/',
  gettingStarted: 'https://developer.adobe.com/app-builder/docs/getting_started/',
  guides: 'https://developer.adobe.com/app-builder/docs/guides/',
  runtime: 'https://developer.adobe.com/runtime/docs/guides/',
};

// Examples of other doc sources you can configure:
// Analytics: https://experienceleague.adobe.com/docs/analytics/
// AEM: https://experienceleague.adobe.com/docs/experience-manager/
// Custom: https://docs.yourcompany.com/
```

### Scraping Flow (Works with Any Docs)
1. Identify keywords from user question
2. Search table of contents for relevant pages
3. Fetch matching page(s)
4. Extract clean text using cheerio
5. Limit to relevant sections (2-3K tokens max)
6. Pass to AI with question

### Cheerio Example
```javascript
const cheerio = require('cheerio');
const axios = require('axios');

async function scrapeDocs(url) {
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);
  
  // Remove nav, footer, ads
  $('nav, footer, .ad, .sidebar').remove();
  
  // Extract main content
  const content = $('main').text();
  
  return content.trim();
}
```

## AI Prompt Template

```javascript
// Read docs configuration from environment
const DOCS_NAME = process.env.DOCS_NAME || 'App Builder';
const DOCS_BASE_URL = process.env.DOCS_BASE_URL || 'https://developer.adobe.com/app-builder/docs/';

const SYSTEM_PROMPT = `You are Adobe DocuBot, a friendly AI assistant for developers.

You specialize in ${DOCS_NAME} documentation.

Your job is to help developers by answering questions about ${DOCS_NAME} clearly and concisely.

Guidelines:
- Be friendly and helpful (like a coworker)
- Use emoji sparingly (1-2 per response max)
- Include code examples when relevant
- Keep answers concise (2-4 paragraphs)
- Add a "Pro tip" with practical advice
- Always cite the source URL
- Mention "${DOCS_NAME}" in your response so users know the source
- Format responses in Slack mrkdwn (markdown)

If you don't know the answer from the provided docs, say so honestly and suggest where to look.`;

const USER_PROMPT = `Based on this documentation from ${DOCS_BASE_URL}:

${docContent}

Answer this question: ${userQuestion}

Format your response for Slack using:
- *bold* for emphasis
- \`code\` for commands
- \`\`\` for code blocks
- Include 🤖 emoji at the start
- Mention ${DOCS_NAME} naturally in your answer
- End with 📖 Learn more: [URL]`;
```

## Slack Block Kit Response Pattern

```javascript
{
  response_type: 'in_channel',
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '🤖 *Adobe DocuBot*\n\nTo deploy your app, use:\n```\naio app deploy\n```\n\nThis will build your actions and deploy to Adobe I/O Runtime.'
      }
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: '💡 *Pro tip:* Use `aio app deploy --no-build` if you\'ve already built locally'
        }
      ]
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: '📖 <https://developer.adobe.com/app-builder/docs/guides/deployment/|Learn more>'
        }
      ]
    }
  ]
}
```

## Performance Monitoring

```javascript
// Track performance metrics
function logPerformance(startTime, memoryUsed, questionLength) {
  const duration = Date.now() - startTime;
  
  console.log({
    duration: `${duration}ms`,
    memory: `${memoryUsed}MB`,
    questionLength: questionLength,
    timestamp: new Date().toISOString()
  });
  
  // Use for optimization and monitoring
}
```

## Testing Locally

```bash
# Run in dev mode (hot reload)
aio app dev

# Test action directly with curl
curl -X POST https://localhost:9080/api/v1/web/guest/adobe-docubot/ask \
  -H "Content-Type: application/json" \
  -d '{"text": "How do I deploy my app?"}'

# Deploy to production
aio app deploy

# View logs
aio app logs --limit 10

# Test AI integration separately
node utils/aiClient.js "How do I deploy?"
```

## Extension Ideas (After Demo)

### Multi-Documentation Support
1. **Multiple Sources**: Support `/ab [source] question` syntax
2. **Auto-Detection**: AI figures out which doc source based on question
3. **Cross-Reference**: "This is in both App Builder and Analytics docs..."
4. **Admin Commands**: `/ab config add <name> <url>` to add new doc sources
5. **Source Switching**: `/ab use analytics` to change default source

### Intelligence Features
6. **Conversational Context**: Remember previous questions in thread
7. **Code Generation**: "Generate an action that calls Adobe Analytics API"
8. **Troubleshooting Helper**: Analyze error logs and suggest fixes
9. **CLI Integration**: Execute aio commands directly from Slack

### Team Features
10. **Proactive Tips**: Post daily tips (from configured docs) to channel
11. **Team Analytics**: Track most common questions, suggest internal docs
12. **Custom Docs**: Point at company's internal documentation
13. **Multi-source Search**: Include GitHub issues, Stack Overflow
14. **Interactive Tutorials**: Step-by-step guides with checkpoints

## Security Considerations

1. **Verify Slack Signatures**: Ensure requests come from Slack
2. **Rate Limiting**: Prevent abuse (per user/channel limits)
3. **Input Sanitization**: Clean user questions before passing to AI
4. **API Key Security**: Never log or expose AI API keys
5. **Doc Scraping Ethics**: Respect robots.txt, cache appropriately
6. **PII Protection**: Don't send sensitive data to AI APIs

## Demo Tips

- Test all example questions before recording
- Have backup responses as screenshots
- Use realistic questions developers would ask
- Show both technical and beginner questions
- Demonstrate error handling (ask off-topic question)
- Keep Slack window at readable size
- Pre-warm AI API (make test call before demo)

## Resources

- [App Builder Documentation](https://developer.adobe.com/app-builder/docs/)
- [Slack Block Kit Builder](https://app.slack.com/block-kit-builder/)
- [Claude API Docs](https://docs.anthropic.com/claude/reference/)
- [OpenAI API Docs](https://platform.openai.com/docs/api-reference)
- [Cheerio (HTML parsing)](https://cheerio.js.org/)
- [I/O Runtime Limits](https://developer.adobe.com/runtime/docs/guides/using/system_settings/)

## DocuBot's Personality Guide

**Tone**: Helpful coworker, not a robot or formal documentation

**Do's**:
- ✅ "To deploy, use `aio app deploy`"
- ✅ "Pro tip: This will save you time..."
- ✅ Use 🤖 emoji for DocuBot's identity
- ✅ End with 📖 for docs links

**Don'ts**:
- ❌ "The deployment procedure necessitates..."
- ❌ "AWESOME ANSWER BRO 🎉🚀💯🔥"
- ❌ "I'm just an AI, so..."
- ❌ Over-apologizing

**Example responses**:
```
Good question! Memory limits for actions are:
• 256 MB minimum
• 2048 MB maximum
• Default: 256 MB

💡 Pro tip: Start with 256-512 MB. You can always increase it if needed, but lower memory = lower costs!
```
