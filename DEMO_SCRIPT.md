# Summit Demo Script: Adobe DocuBot
**App**: AI-powered documentation assistant for Slack  
**Duration**: 10 minutes
**Recording**: "Live to Tape" - Single continuous take

---

## Pre-Recording Setup Checklist

### Slack Workspace Setup
- [ ] Create demo workspace: "Adobe Summit 2026 Demo"
- [ ] Create channel: #demo
- [ ] Install bot (will create during demo)
- [ ] Have test questions ready (see below)

### Development Environment
- [ ] Clean workspace in /demos
- [ ] `aio login` confirmed working
- [ ] Cursor open with AGENTS.md ready
- [ ] Browser tabs: 
  - Tab 1: Slack workspace
  - Tab 2: Adobe Developer Console
  - Tab 3: This script
- [ ] Terminal ready with `aio` CLI
- [ ] Screen recording: 1920x1080, 60fps recommended

### Demo Assets Ready
- [ ] AI API key ready (Claude or OpenAI)
- [ ] Slack app credentials ready to paste
- [ ] `.env` template prepared
- [ ] Test questions memorized

### Cursor Settings
- [ ] Claude Sonnet 4 selected
- [ ] Auto-save enabled
- [ ] Terminal visible in split pane
- [ ] Font size readable on recording (14-16pt)

---

## Recording Script (10 minutes)

### SLIDE 1: What is Adobe App Builder? (30 seconds)
**[Screen: PowerPoint slide with App Builder overview]**

**YOU**: "Before we dive into the demo, let me quickly introduce Adobe App Builder.

App Builder is Adobe's framework for building custom cloud-native applications that extend Adobe Experience Cloud.

Here's what makes it powerful: With App Builder, you build secure and scalable apps that extend Adobe Commerce native functionality and integrate with third-party solutions. Adobe takes care of provisioning and managing compute, storage, and CDN capacity - so you just focus on building.

Importantly, App Builder requires no customization to core product code. This means simplified upgrades and lower cost of ownership.

**What it provides:**
- 🔒 **Secure execution** - Isolated containers, enterprise authentication
- ⚡ **Auto-scaling compute** - Adobe I/O Runtime handles infrastructure
- 🌐 **Seamless integrations** - Extend Commerce, connect to third-party services
- 📦 **Managed platform** - Adobe manages compute, storage, CDN
- 🚀 **Deploy in seconds** - One command from development to production

Today, we'll use App Builder to create an AI-powered assistant. Let's get started."

---

### MINUTE 0-1: The Hook
**[Screen: PowerPoint slide]**

**YOU**: "What if you could ask any question about App Builder right in Slack... and get an instant AI-powered answer with examples and sources? Meet **Adobe DocuBot** - and we're going to build it in 10 minutes using AI to build AI."

**[Switch to screen recording: Cursor + Slack side-by-side]**

**YOU**: "Here's our starting point: blank project. Here's our destination: an AI assistant that knows everything about App Builder. Let's go."

---

### MINUTE 1-3: Project Init with AI Guidance

**[Screen: Terminal]**

```bash
cd /Users/rokapoor/Documents/appbuilder
aio app init adobe-docubot --standalone-app
```

**YOU** (while it runs): "App Builder gives us the foundation. Now let's tell AI what we're building."

**[Screen: Cursor editor, create REQUIREMENTS.md]**

Type in Cursor:
```markdown
# Adobe DocuBot

AI-powered Slack bot that answers questions about Adobe App Builder.

Features needed:
1. /ab command - accepts natural language questions
2. Scrape developer.adobe.com/app-builder docs
3. Use AI (Claude or OpenAI) to understand and answer
4. Return formatted responses in Slack
5. Include code examples and source links

Must run on App Builder (Adobe I/O Runtime)
```

**[Open Cursor chat, type]**
```
@REQUIREMENTS.md Build Adobe DocuBot. Start with the /ab command handler.
It should scrape App Builder docs and use AI to answer questions.
Use Slack Block Kit for nice formatting.
```

**YOU**: "Watch how Cursor architects an AI-powered assistant..."

---

### MINUTE 3-5: AI Generates Code (The Magic Moment)

**[Screen: Split - Cursor generating code on left, you narrating on right]**

**YOU**: "AI is building several things at once:
1. Slack slash command handler
2. Web scraper for App Builder docs
3. AI integration (Claude or OpenAI)
4. Question understanding logic
5. Response formatting with examples
6. Error handling for edge cases"

**[Let AI generate, show key files briefly]**

**YOU**: "Notice it's using:
- Cheerio to parse HTML docs
- Claude API for intelligent answers
- Slack Block Kit for rich formatting
- Proper error handling for real-world use"

**[Show generated code for 5-10 seconds - actions/ask/index.js]**

---

### MINUTE 5-6: Slack App Configuration

**[Screen: Browser - Slack API dashboard]**

**YOU**: "Quick setup - registering our bot with Slack. Takes one minute."

**[Navigate to api.slack.com/apps]**
1. Create New App → From Scratch
2. Name: "Adobe DocuBot"
3. Workspace: Select demo workspace
4. Click "Slash Commands" → Create command:
   - Command: `/ab`
   - Description: "Ask anything about App Builder"
   - Usage hint: `/ab [your question]`
   - Request URL: (say "we'll add this after deploy")

**[Copy Bot Token and Signing Secret]**

**YOU**: "Credentials ready. Let's give them to our app."

**[Screen: Back to Cursor, .env file]**

Paste:
```
SLACK_BOT_TOKEN=xoxb-your-token
SLACK_SIGNING_SECRET=your-secret
ANTHROPIC_API_KEY=sk-ant-your-key
```

---

### MINUTE 6-7: Deploy to Production

**[Screen: Terminal in Cursor]**

```bash
aio app deploy
```

**YOU**: "One command to deploy everything:"

**[Show deploy output scrolling]**

**YOU** (while deploying): "Behind the scenes:
- Packaging our AI logic
- Deploying to Adobe I/O Runtime  
- Getting our production URL
- Ready to handle requests"

**[Deploy completes, show URL]**

**YOU**: "There's our endpoint. Let's connect it to Slack."

**[Copy action URL]**

---

### MINUTE 7-8: Wire Up & First Test

**[Screen: Browser - Slack API dashboard]**

**[Paste URL into /ab slash command]**
- Request URL: `https://your-namespace.adobeioruntime.net/.../ask`

**[Save changes]**

**YOU**: "Connected. Now let's ask DocuBot some questions..."

**[Screen: Slack workspace, full screen]**

---

### MINUTE 8-9: Live Testing (The Wow Moment)

**YOU**: "Remember, AI just wrote this code 5 minutes ago. Let's see if it works."

**[Type in Slack]**
```
/ab How do I deploy my app?
```

**[Response appears]**
```
🤖 App Builder Buddy

To deploy your app, use:
```
aio app deploy
```

This will:
• Build your actions
• Deploy to Adobe I/O Runtime
• Deploy web assets to CDN
• Return production URLs

💡 Pro tip: Use `aio app deploy --no-build` if you've 
already built locally to save time

📖 Learn more: developer.adobe.com/app-builder/docs/guides/deployment/
```

**YOU**: "Beautiful! Code example, clear steps, and source link. Let's try something harder."

**[Type]**
```
/ab What are the memory limits for actions?
```

**[Response appears]**
```
🤖 App Builder Buddy

Adobe I/O Runtime action limits:
• Memory: 256 MB to 2048 MB
• Timeout: 60 seconds maximum
• Payload: 1 MB (sync), 5 MB (async)

💡 Pro tip: Start with 256-512 MB and adjust based on 
your actual needs.

📖 Learn more: developer.adobe.com/runtime/docs/guides/system_settings/
```

**YOU**: "Perfect! It found the exact limits. Now let's try something more advanced."

**[Type]**
```
/ab What's the difference between aio app run and aio app dev?
```

**[Response appears]**
```
🤖 App Builder Buddy

Great question! Here's the difference:

**aio app dev**
• Local development with hot reload
• Actions run locally in Node.js
• Web UI on localhost
• Best for rapid development

**aio app run**
• Deploys actions to Adobe I/O Runtime
• Web UI still on localhost
• Closer to production environment
• Best for testing integrations

💡 Pro tip: Use 'aio app dev' for daily development, 
'aio app run' when testing Adobe API integrations.

📖 Learn more: developer.adobe.com/app-builder/docs/...
```

**YOU**: "Not only does it understand the question, it explains the nuance and gives practical advice."

---

### MINUTE 9-10: The Reveal & Wow Moment

**[Screen: Back to Cursor code]**

**YOU**: "Here's the best part - DocuBot isn't just for App Builder. Watch this."

**[Screen: Show .env file]**

**YOU**: "See these environment variables? DOCS_BASE_URL and DOCS_NAME. Let's change them."

**[Edit .env file]**
```bash
# Change from:
DOCS_BASE_URL=https://developer.adobe.com/app-builder/docs/
DOCS_NAME=App Builder

# To:
DOCS_BASE_URL=https://experienceleague.adobe.com/docs/analytics/
DOCS_NAME=Adobe Analytics
```

**[Screen: Terminal]**
```bash
aio app deploy
```

**YOU** (while deploying - 20 seconds): "No code changes. Just configuration. DocuBot can now answer Analytics questions instead. This works with ANY public documentation:
- Adobe Analytics, AEM, Target
- Your company's internal docs
- React, Vue, any framework
- Any API documentation

One bot. Any docs. Infinitely reusable."

**[Deploy completes]**

**[Screen: Slack]**

**YOU**: "Now let's ask an Analytics question."

**[Type in Slack]**
```
/ab How do I query data from Adobe Analytics?
```

**[Response appears]**
```
🤖 App Builder Buddy

To query Adobe Analytics data, use the Analytics 2.0 API:

```javascript
const response = await analytics.getReport({
  rsid: 'your-report-suite-id',
  dimension: 'variables/page',
  metric: 'metrics/pageviews'
});
```

You'll need:
• Analytics Company ID
• Report Suite ID  
• OAuth credentials

💡 Pro tip: Start with the Discovery API to explore 
available metrics and dimensions for your report suite.

📖 Learn more: experienceleague.adobe.com/docs/analytics/...
```

**YOU**: "Same bot. Different docs. That's the power of configuration over code."

**[Show app.config.yaml]**

```yaml
actions:
  ask:
    function: actions/ask/index.js
    web: 'yes'
    runtime: 'nodejs:20'
    limits:
      memory: 512  # Needs space for AI calls
      timeout: 30000
```

**YOU**: "Let's look at the technical specs:"

**[Show specs on screen]**
```
Technical Specifications:
• Memory: 512 MB per request
• Response time: ~5 seconds (scraping + AI)
• Architecture: Stateless, scales automatically
• Security: Isolated container execution
• Authentication: Built-in credential management
• Deployment: One command (aio app deploy)
• Infrastructure: Managed by Adobe (zero maintenance)

App Builder Benefits:
🔒 Secure execution environment
⚡ Auto-scales with demand
🛡️ Enterprise authentication
🌐 Global infrastructure
📦 No servers to manage

Pricing & Security: developer.adobe.com/app-builder/docs/overview/
```

**[Screen: Final slide]**

**YOU**: "Let me show you what we actually built."

**[Show app.config.yaml side by side with .env]**

**YOU**: "The genius is in the separation:
- Code handles scraping, AI, Slack formatting
- Configuration handles WHICH docs to search
- Change the URL, change the bot's expertise
- No rewriting. No retraining. Just redeploy."

**[Screen: Summary slide]**

**YOU**: "In 10 minutes, we built an AI documentation assistant that:
✓ Works with ANY public documentation
✓ Serves your entire team
✓ Can be reconfigured in 30 seconds
✓ **Runs securely on Adobe I/O Runtime**
✓ **Auto-scales to handle any team size**
✓ **No servers to manage or secure**

This isn't just an App Builder demo. It's a template for solving documentation problems across your entire organization.

**Why App Builder?**
- Secure execution in isolated containers
- Enterprise-grade authentication and credential management
- Auto-scales from 1 to 10,000 requests automatically
- Global infrastructure for low latency
- You write the code, Adobe handles the infrastructure

Got internal platform docs nobody reads? Point DocuBot at them - **securely**.
Got complex API docs? Point DocuBot at them - **with enterprise authentication**.
Got tribal knowledge you need to capture? Write docs, point DocuBot at them - **scalably**.

For security, scalability, and pricing details, visit developer.adobe.com/app-builder/docs/overview/

Everything is in the repo below. Deploy it. Configure it. Use it. Questions?"

**[End recording]**

---

## Post-Production Polish

### Add These Overlays in Editing

1. **Minute 2**: Text overlay showing Cursor prompt
2. **Minute 4**: Speed up AI generation to 1.5x (keep audio normal)
3. **Minute 6**: Text overlay: "Deploying to Adobe I/O Runtime..."
4. **Minute 8-9**: Zoom in on Slack responses for readability
5. **Minute 9**: Lower third with cost breakdown graphic

### B-Roll to Shoot Separately
- Typing close-up
- Adobe Developer Console overview
- App Builder docs website
- Architecture diagram

---

## Test Questions Ready for Demo

### Easy (Show It Works)
1. "How do I deploy my app?"
2. "What are memory limits?"
3. "Calculate costs for 512MB, 5s, 100 runs daily"

### Medium (Show Intelligence)
4. "What's the difference between aio app run and aio app dev?"
5. "Show me an example of creating an action"

### Edge Cases (Show Error Handling)
6. "Tell me about React hooks" (off-topic)
7. "asdfasdf" (gibberish)

**Pick 3 for demo**: Questions 1, 2, 3 (or 1, 2, 6 to show error handling)

---

## Backup Plan: If Something Fails

### Have These Pre-Recorded
1. Successful Slack responses (screenshots)
2. Deploy output
3. Can say "Here's what DocuBot returns..." and show screenshot

### Common Failures & Fixes
- **AI generates wrong code**: Backup code in `backup/` folder
- **Slack doesn't respond**: Show screenshot, blame network
- **AI API fails**: Show cached response
- **Deploy fails**: Use pre-deployed URL

---

## Pro Recording Tips

### Audio
- Good microphone (not laptop mic)
- Minimize typing noise
- Record in quiet room

### Visual
- Clean desktop
- Disable notifications
- Large fonts (16pt+)
- 1920x1080 minimum

### Energy
- Stand while recording
- Smile (comes through in voice)
- Practice once before recording
- Morning energy is best

### Pacing
- Speak 10% slower than normal
- Pause between sentences
- If you mess up, pause 3 seconds, restart sentence

---

## The Day Before

- [ ] Full practice run (don't record)
- [ ] Time each section
- [ ] Test all credentials
- [ ] Charge laptop
- [ ] Clear browser cache
- [ ] Get good sleep!

---

## Alternative Demo Angles

### If Technical Audience
- Show more code
- Explain AI prompt engineering
- Discuss scraping strategy
- Show token optimization

### If Business Audience
- Focus on team productivity gains!
- Show ease of use (just type questions)
- Emphasize team productivity
- Compare to alternatives (searching docs manually)

### If Mixed Audience
- Balance technical "how" with business "why"
- Show both code and results
- Explain costs clearly
- Demonstrate real value

---

**You've got this! Adobe DocuBot is going to blow them away! 🚀**
