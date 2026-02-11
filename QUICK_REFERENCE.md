# 🎬 QUICK REFERENCE CARD - Adobe DocuBot Demo

## ⏱️ Timing (10-11 minutes total)
- 0-0:30: **Slide 1 - What is App Builder?**
- 0:30-1: Hook (AI building AI for ANY docs)
- 1-3: Init project + AI prompt
- 3-5: AI generates code
- 5-6: Slack config
- 6-7: Deploy
- 7-8: Wire up Slack
- 8-9: Test DocuBot with App Builder questions
- 9-10: **RECONFIGURE LIVE** for Analytics + wrap

---

## 🎤 Key Talking Points

### Opening (30 seconds)
**Slide 1 - Introduce App Builder**:
"App Builder is Adobe's framework for building secure, scalable cloud-native apps. It provides secure execution, auto-scaling compute, seamless integrations, and a managed platform. No servers to manage."

**Then the hook**:
"Today we'll use App Builder to build an AI assistant that can answer questions about ANY documentation. Let's see it in action."

### During AI Generation (Minute 4)
"AI is simultaneously building:
1. Slack command handler
2. Doc scraper for App Builder
3. AI integration (Claude)
4. Question understanding
5. Response formatting
6. Error handling"

### During Deploy (Minute 6-7)
"One command deploys to secure, isolated containers. Auto-scales with team size. Adobe manages the infrastructure."

### Final Reveal (Minute 9)
"Now watch this - let's reconfigure DocuBot for different docs."

[Show .env changes]
DOCS_BASE_URL → change to Analytics
DOCS_NAME → change to Analytics

[Redeploy - 30 seconds]
"Same code. Different docs. Now DocuBot answers Analytics questions."

[Test Analytics question]
"Works with ANY public docs. Configuration over code."

"Pricing details available at developer.adobe.com/app-builder/docs/overview/"

---

## 💻 Commands to Type

### 1. Init Project
```bash
cd ~/Documents/appbuilder
aio app init adobe-docubot --standalone-app
```
**Select**: Actions only
**Name action**: ask

---

### 2. AI Prompt (in Cursor chat)
```
@REQUIREMENTS.md Build Adobe DocuBot. Create the /ab command 
that scrapes App Builder docs and uses AI to answer questions.
Use Slack Block Kit for formatting.
```

---

### 3. Deploy
```bash
aio app deploy
```
**Copy**: Action URL from output

---

### 4. Test Questions in Slack

**Question 1** (Easy):
```
/ab How do I deploy my app?
```
Expected: Returns `aio app deploy` with explanation

**Question 2** (Technical):
```
/ab What are the memory limits for actions?
```
Expected: Returns 256MB-2048MB with details

**Question 3** (Advanced):
```
/ab What's the difference between aio app run and aio app dev?
```
Expected: Explains both commands with practical advice

**Question 4** (THE WOW MOMENT - Reconfiguration):
```
[In .env file, change to:]
DOCS_BASE_URL=https://experienceleague.adobe.com/docs/analytics/
DOCS_NAME=Adobe Analytics

[Redeploy:]
aio app deploy

[Then ask:]
/ab How do I query data from Adobe Analytics?
```
Expected: Returns Analytics-specific answer (not App Builder)

---

## 🔗 URLs You'll Need

### Slack URLs
- API Apps: `https://api.slack.com/apps`
- Your workspace: `https://[workspace].slack.com`

### Adobe URLs
- Console: `https://developer.adobe.com/console`
- App Builder Docs: `https://developer.adobe.com/app-builder/docs/`

---

## 🎯 Technical Specs (For Final Reveal)

```
Adobe DocuBot Specifications:
Memory: 512 MB per request
Duration: ~5 seconds average
Architecture: Stateless, serverless
Security: Isolated container execution
Scalability: Auto-scales automatically
Authentication: Built-in credential management
Deployment: One command (aio app deploy)
Infrastructure: Managed by Adobe (zero maintenance)

App Builder Benefits:
🔒 Secure by default
⚡ Auto-scales with demand
🛡️ Enterprise authentication
🌐 Extends Adobe Commerce
🔌 Third-party integrations
📦 Adobe manages infrastructure
🔄 No core customization

Details: developer.adobe.com/app-builder/docs/overview/
```

---

## 🔑 Environment Variables Template

### For App Builder (Default)
```bash
SLACK_BOT_TOKEN=xoxb-your-token-here
SLACK_SIGNING_SECRET=your-secret-here
ANTHROPIC_API_KEY=sk-ant-your-key-here

# Documentation Config
DOCS_BASE_URL=https://developer.adobe.com/app-builder/docs/
DOCS_NAME=App Builder
```

### For Analytics (Demo Reconfiguration)
```bash
# Change to:
DOCS_BASE_URL=https://experienceleague.adobe.com/docs/analytics/
DOCS_NAME=Adobe Analytics
```

---

## 🆘 Backup Phrases (If Something Goes Wrong)

**If AI is slow**:
"While that's generating, this is building an entire AI-powered system - doc scraping, AI integration, Slack formatting..."

**If deploy fails**:
"Let me use a pre-deployed version to keep us moving..."

**If Slack doesn't respond**:
"Here's what DocuBot returns..." [show screenshot]

**If AI API fails during demo**:
"Network hiccup - here's the response DocuBot gives..." [show cached]

**If you forget what's next**:
"Let me check what question to ask next..." [glance at script]

**If you mess up**:
[Pause 3 seconds] → restart sentence

---

## ✅ Pre-Flight Check (Right Before Recording)

- [ ] Do Not Disturb ON
- [ ] Phone airplane mode
- [ ] `aio login` confirmed
- [ ] Slack workspace open
- [ ] Cursor with REQUIREMENTS.md ready
- [ ] AI API key tested (make one test call)
- [ ] Test questions memorized
- [ ] Water nearby (no ice)
- [ ] Deep breath!

---

## 🎬 Recording Start Sequence

1. Start recording
2. Count silently: 3, 2, 1
3. **First slide**: "Before we jump into the demo, let me introduce Adobe App Builder..."
4. **Then hook**: "Today we'll build an AI assistant..."
5. Smile and GO! 🚀

---

## 💡 Remember

- Speak 10% slower
- Pause instead of "um"
- Energy up (stand if possible)
- If you mess up, pause and restart sentence
- Have fun - your energy is contagious!
- This is IMPRESSIVE - let that excitement show!

---

## 🎭 Demo Flow Cheat Sheet

```
1. Hook → "AI building AI"
2. Init → aio app init adobe-docubot
3. Prompt → "@REQUIREMENTS.md Build DocuBot..."
4. Watch → AI generates everything
5. Config → Quick Slack setup
6. Deploy → aio app deploy
7. Wire → Connect URL to /ab command
8. Test → Ask 3 questions, watch magic
9. Reveal → Technical specs & reconfiguration
10. Wrap → "Questions?"
```

---

## 🌟 Key Message

**Core Idea**: 
"In 10 minutes, we built an AI assistant that works with ANY documentation. It runs securely on App Builder, auto-scales with your team, and requires zero infrastructure management."

**Technical Audience**: 
"Secure by default. Auto-scaling compute. Enterprise authentication. All built-in with App Builder. Configuration over code."

**Business Audience**:
"Enterprise-grade security and scalability out of the box. No servers to manage. Details at developer.adobe.com/app-builder."

**Everyone**:
"One bot. Any docs. Secure. Scalable. That's the power of App Builder."

---

**You've got this! Make DocuBot proud! 🤖💙**
