# Pre-Recording Checklist & Setup Guide - Adobe DocuBot

## 🎯 One Week Before Recording

### Slack Workspace Setup
- [ ] Create dedicated Slack workspace: "Adobe Summit 2026 Demo"
  - URL: `adobe-summit-demo.slack.com` (or similar)
  - Keep it clean, no other channels/bots
  
- [ ] Create channel: `#demo`
  - Pin message: "Adobe DocuBot Demo Channel"
  - Clear all messages before recording

- [ ] Create Slack App at https://api.slack.com/apps
  - [ ] Name: "Adobe DocuBot"
  - [ ] Description: "AI assistant for Adobe App Builder"
  - [ ] Icon: Upload robot/AI themed icon (🤖)
  - [ ] Enable "Slash Commands" feature
  - [ ] Copy **Bot User OAuth Token** (starts with `xoxb-`)
  - [ ] Copy **Signing Secret** from Basic Information
  - [ ] Save both in password manager

### AI API Setup
- [ ] Get Claude API key from https://console.anthropic.com
  - OR OpenAI key from https://platform.openai.com
  - [ ] Test API key with simple request
  - [ ] Add credit to AI API account to avoid rate limits during demo
  - [ ] Save key in password manager

### Adobe Developer Console Setup
- [ ] Login to https://developer.adobe.com/console
- [ ] Create new App Builder project: "Adobe DocuBot"
- [ ] Create workspace: "Production"  
- [ ] Enable Runtime for workspace
- [ ] Download workspace credentials
- [ ] Test `aio login` works

### Local Development Environment
- [ ] Update AIO CLI: `npm install -g @adobe/aio-cli`
- [ ] Verify version: `aio -v` (should be 10.x or higher)
- [ ] Update plugins: `aio update`
- [ ] Verify login: `aio login` then `aio where`
- [ ] Test deploy works: Create test app, deploy it, undeploy it

### Cursor Setup
- [ ] Update to latest version
- [ ] Verify Claude Sonnet 4 is available
- [ ] Install recommended settings (see below)
- [ ] Test AI responses are working
- [ ] Clear chat history for clean demo

### Install Developer Tools
```bash
# Check what's installed
which rg jq gh curl

# Install missing tools (macOS)
brew install ripgrep jq gh

# Verify
rg --version
jq --version  
gh --version
```

---

## 📱 Two Days Before Recording

### Practice Run #1 (Don't Record)
- [ ] Go through entire demo flow
- [ ] Time each section (target: 10 minutes total)
- [ ] Test AI API actually returns good answers
- [ ] Test `/ab` command works end-to-end
- [ ] Verify screen layout works for recording
- [ ] Note any friction points

### Create Backup Assets
- [ ] Pre-build DocuBot fully (backup if AI fails)
  - Save in `backup-code/` folder
  - Test that it works
  - Don't show during demo unless needed
  
- [ ] Take screenshots of successful responses
  - `/ab How do I deploy?` response
  - `/ab What are memory limits?` response
  - `/ab Calculate costs...` response
  - Can insert if live demo has issues

- [ ] Screen record successful Slack interactions (30s clip)
  - B-roll footage you can insert if needed

- [ ] Cache one AI response (in case API fails during demo)
  - Call AI API manually, save response
  - Have it ready to show

### Prepare Test Questions
Memorize these 3 questions for demo:

1. ✅ **Easy**: `/ab How do I deploy my app?`
2. 📊 **Technical**: `/ab What are the memory limits for actions?`
3. 🔧 **Advanced**: `/ab What's the difference between aio app run and aio app dev?`

Optional 4th for reconfiguration:
4. 🔄 **Analytics**: `/ab How do I query data from Adobe Analytics?` (after switching DOCS_BASE_URL)

Test each question to ensure DocuBot answers correctly!

---

## 🎬 One Day Before Recording

### Final Practice Run #2 (Record It, But Don't Use)
- [ ] Full dress rehearsal with recording
- [ ] Watch the recording back
- [ ] Note timing issues
- [ ] Check audio levels
- [ ] Verify screen is readable
- [ ] Make adjustments to script

### Physical Setup
- [ ] Clean desk area (will be in reflection)
- [ ] Close unnecessary apps (free up memory)
- [ ] Disable notifications:
  - System Preferences → Notifications → Do Not Disturb ON
  - Slack → Preferences → Turn off all notification sounds
  - Close Mail, Messages, Calendar
  
- [ ] Charge laptop to 100%
- [ ] Plug in power (don't record on battery)
- [ ] Test microphone setup
- [ ] Test screen recording quality

### Desktop Cleanup
- [ ] Clean desktop (no random files)
- [ ] Set clean wallpaper (solid color or subtle pattern)
- [ ] Hide desktop icons: 
  ```bash
  defaults write com.apple.finder CreateDesktop false
  killall Finder
  ```
- [ ] Quit all apps except:
  - Cursor
  - Chrome (Slack + Console tabs)
  - Terminal (if not using Cursor's)
  - OBS or QuickTime

### Browser Setup (Chrome)
- [ ] Create new Profile: "Summit Demo"
- [ ] Bookmarks bar: Hide
- [ ] Extensions: Disable all (clean interface)
- [ ] Open tabs (in this order):
  1. Slack workspace
  2. Adobe Developer Console
  3. App Builder docs (for reference)
  4. This script (in another window)
- [ ] Clear history and cache
- [ ] Test Slack loads quickly

### Cursor Settings
```json
{
  "editor.fontSize": 16,
  "editor.fontFamily": "JetBrains Mono, Menlo, Monaco, 'Courier New', monospace",
  "editor.lineHeight": 24,
  "editor.tabSize": 2,
  "terminal.integrated.fontSize": 14,
  "workbench.colorTheme": "GitHub Dark Default",
  "editor.minimap.enabled": false,
  "editor.lineNumbers": "on",
  "editor.renderWhitespace": "none",
  "editor.rulers": [],
  "breadcrumbs.enabled": true,
  "editor.formatOnSave": true
}
```

Apply with: CMD+, → Open Settings (JSON)

---

## 🎤 Day of Recording - Morning Setup

### Start Fresh
- [ ] Restart computer (clean slate)
- [ ] Don't open anything except what's needed
- [ ] Enable Do Not Disturb mode
- [ ] Airplane mode for phone (no interruptions)
- [ ] Coffee/water ready (no ice - noisy)

### Recording Software Setup

**Option A: QuickTime (Simple)**
```bash
# Open QuickTime
# File → New Screen Recording
# Click Options:
#   - Microphone: Your microphone
#   - Quality: Maximum
# Click red record button, select area
```

**Option B: OBS Studio (Advanced)**
```
Settings → Video:
  - Base Resolution: 1920x1080
  - Output Resolution: 1920x1080  
  - FPS: 60

Settings → Output:
  - Encoder: H.264
  - Rate Control: CRF
  - CRF: 18 (high quality)
  - Preset: Quality

Settings → Audio:
  - Sample Rate: 48kHz
  - Channels: Stereo
```

### Audio Check
- [ ] Record 10 seconds of speech
- [ ] Play back - check levels
- [ ] Not too quiet, not clipping
- [ ] Minimal background noise
- [ ] Keyboard clicks not too loud

### Screen Layout Test
- [ ] Open Cursor - position on left 60%
- [ ] Open Chrome (Slack) - position on right 40%
- [ ] Check both are readable at recording resolution
- [ ] Font sizes appropriate (not too small)
- [ ] Terminal visible in Cursor if needed

### Final Check (5 Minutes Before)
- [ ] `aio login` - confirm logged in
- [ ] Open Slack workspace in browser
- [ ] Slack app with `/ab` command registered
- [ ] `.env` file with tokens ready to paste
  ```
  SLACK_BOT_TOKEN=xoxb-...
  SLACK_SIGNING_SECRET=...
  ANTHROPIC_API_KEY=sk-ant-...
  ```
- [ ] `REQUIREMENTS.md` file created and ready
- [ ] Demo script open (read from second monitor or iPad)
- [ ] Test AI API one more time (make a real call)
- [ ] Water nearby (no ice)
- [ ] Phone in airplane mode
- [ ] Take a deep breath 😊

---

## 🎬 Recording Workflow

### Start Recording
1. Press record in OBS/QuickTime
2. Count silently "3, 2, 1"
3. Start speaking (you can trim this later)

### During Recording
- Speak 10% slower than normal
- If you mess up: Pause, breathe, restart that sentence
- Don't say "um" - pause instead (easier to edit out)
- Smile while talking (really helps energy!)
- Stand if possible (better voice projection)
- Let excitement show - this is COOL tech!

### End Recording
1. Finish last sentence
2. Pause 2 seconds
3. Stop recording
4. Save immediately (name: `adobe-docubot-demo-take-1.mov`)

### If You Need Multiple Takes
- Don't delete bad takes until you have a good one
- Take 5 minute break between attempts
- Review what went wrong before next take
- Usually take 2-3 is the best (not first, not 10th)
- Most common issue: going too fast (slow down!)

---

## 🎥 Post-Recording Checklist

### Immediate Review
- [ ] Watch full recording
- [ ] Check audio throughout
- [ ] Verify all Slack responses visible and readable
- [ ] Confirm code is readable (not too small)
- [ ] Verify AI responses make sense
- [ ] Note any issues for re-recording

### If Recording is Good
- [ ] Backup file immediately (copy to Dropbox/Drive)
- [ ] Begin editing (or send to editor)
- [ ] Re-enable desktop icons:
  ```bash
  defaults write com.apple.finder CreateDesktop true
  killall Finder
  ```
- [ ] Celebrate! 🎉

### Simple Edits You Can Do
1. **Trim start/end**: Remove silence before/after
2. **Speed up slow parts**: AI code generation at 1.5x speed
3. **Add text overlays**: 
   - Show prompts you typed to Cursor
   - Highlight cost calculations
   - Add "Adobe DocuBot" branding
4. **Add background music**: Subtle, quiet (30% volume max)
5. **Color correction**: Ensure readable on all screens
6. **Add lower thirds**: Your name, title during key moments

### Send to Editor (If Using One)
Include:
- [ ] Raw recording file (full quality)
- [ ] Demo script (for reference on structure)
- [ ] Screenshots/B-roll footage
- [ ] Audio file (if recorded separately)
- [ ] Notes on timing and sections
- [ ] Brand guidelines (Adobe colors, fonts)

---

## 🆘 Common Problems & Solutions

### Problem: AI generates wrong code
**Solution**: Have backup code in `backup-code/` folder
- Say: "Let me refine that prompt..."
- Paste backup code (or key parts)
- Continue demo smoothly

### Problem: Slack doesn't respond to `/ab`
**Solution**: Pre-recorded screenshots
- Say: "Here's what DocuBot returns..."
- Show screenshot
- Continue with next question

### Problem: AI API fails during demo
**Solution**: Use cached response
- Say: "And DocuBot answers..."
- Show pre-recorded successful response
- Nobody will know difference

### Problem: Deploy fails
**Solution**: Have pre-deployed backup
- Say: "Using the production URL..."
- Paste backup URL
- Show it working in Slack

### Problem: Forgot test question
**Solution**: Have them visible
- Keep questions on second monitor or iPad
- Glance quickly (edit out later)
- Or say: "Let me ask about..." and read naturally

### Problem: Lost train of thought
**Solution**: Use your script confidently
- Say: "Let me check our progress..."
- Glance at script openly
- Resume with: "Next, we're testing..."
- Confidence matters more than perfection

### Problem: Demo runs too long
**Solution**: Skip optional parts
- Skip 4th question (off-topic test)
- Shorten code explanation
- Quick cost calculation
- End at 10-11 minutes is fine

---

## 📊 Recording Metrics Targets

- **Total Duration**: 9-11 minutes (editing will tighten to 10)
- **Audio Level**: -12dB to -6dB (nice range, not clipping)
- **Video Quality**: 1080p minimum, 4K if possible
- **FPS**: 60fps preferred (smooth)
- **File Size**: 2-5GB for 10 minutes
- **Speaking Pace**: 140-160 words per minute
- **Pause Between Sentences**: 0.5-1 second
- **Energy Level**: 7-8 out of 10 (excited but not manic)

---

## 🎯 The Golden Rule

**Done is better than perfect.**

Your audience cares about:
✅ Seeing AI build an AI assistant (meta!)
✅ Understanding the workflow
✅ Getting excited about possibilities
✅ Understanding the architecture and scalability
✅ Seeing practical use cases

They don't care about:
❌ Perfect lighting or Hollywood production
❌ Your occasional "um" or "uh"
❌ Minor code typos (as long as it works)
❌ Reading from notes once or twice

---

## 🌟 Final Pep Talk

You're demonstrating something genuinely impressive:
- AI building AI (meta and cool)
- Real business value (team productivity gains!)
- Actual working software (not vaporware)
- Built in 10 minutes (mindblowing)

**Let your excitement show. This IS exciting!**

You've got this! Go build DocuBot! 🤖🚀
