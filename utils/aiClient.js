/**
 * AI Client Utility
 * 
 * Wrapper for AI APIs (Claude/OpenAI) to generate helpful responses
 * based on documentation and user questions.
 */

const Anthropic = require('@anthropic-ai/sdk');
const OpenAI = require('openai');

// Read configuration from environment
const DOCS_NAME = process.env.DOCS_NAME || 'App Builder';
const DOCS_BASE_URL = process.env.DOCS_BASE_URL || 'https://developer.adobe.com/app-builder/docs/';

// Initialize AI clients
const anthropicClient = process.env.ANTHROPIC_API_KEY 
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null;

const openaiClient = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

/**
 * System prompt for AI assistant
 */
const SYSTEM_PROMPT = `You are Adobe DocuBot, a friendly AI assistant for developers.

You specialize in ${DOCS_NAME} documentation.

Your job is to help developers by answering questions about ${DOCS_NAME} clearly and concisely.

Guidelines:
- Be friendly and helpful (like a coworker)
- Use emoji sparingly (1-2 per response max)
- Include code examples when relevant
- Keep answers concise (2-4 paragraphs)
- Add a "Pro tip" with practical advice when applicable
- Always cite the source URL when available
- Mention "${DOCS_NAME}" in your response so users know the source
- Format responses in Slack mrkdwn (markdown)
- Use *bold* for emphasis, \`code\` for commands, \`\`\` for code blocks

If you don't know the answer from the provided docs, say so honestly and suggest where to look.`;

/**
 * Get AI response for a question based on documentation
 * @param {string} question - User's question
 * @param {string} docContent - Relevant documentation content
 * @returns {Promise<object>} Formatted Slack response
 */
async function getAIResponse(question, docContent) {
  try {
    // Build user prompt
    const userPrompt = `Based on this documentation from ${DOCS_BASE_URL}:

${docContent}

Answer this question: ${question}

Format your response for Slack:
- Start with 🤖 *Adobe DocuBot*
- Use *bold* for emphasis
- Use \`code\` for commands
- Use \`\`\` for code blocks
- Mention ${DOCS_NAME} naturally in your answer
- Include a practical pro tip if relevant
- End with a source URL if you have one`;

    let responseText;
    
    // Try Claude first (preferred)
    if (anthropicClient) {
      console.log('Using Anthropic Claude...');
      responseText = await getClaudeResponse(userPrompt);
    } 
    // Fall back to OpenAI
    else if (openaiClient) {
      console.log('Using OpenAI...');
      responseText = await getOpenAIResponse(userPrompt);
    } 
    // No AI API configured
    else {
      throw new Error('No AI API key configured. Set ANTHROPIC_API_KEY or OPENAI_API_KEY in .env');
    }
    
    // Parse response and format for Slack
    return parseAIResponse(responseText);
    
  } catch (error) {
    console.error('Error getting AI response:', error.message);
    throw error;
  }
}

/**
 * Get response from Anthropic Claude
 * @param {string} prompt - User prompt
 * @returns {Promise<string>} AI response text
 */
async function getClaudeResponse(prompt) {
  const message = await anthropicClient.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: prompt
      }
    ]
  });
  
  return message.content[0].text;
}

/**
 * Get response from OpenAI
 * @param {string} prompt - User prompt
 * @returns {Promise<string>} AI response text
 */
async function getOpenAIResponse(prompt) {
  const completion = await openaiClient.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    max_tokens: 1024,
    messages: [
      {
        role: 'system',
        content: SYSTEM_PROMPT
      },
      {
        role: 'user',
        content: prompt
      }
    ]
  });
  
  return completion.choices[0].message.content;
}

/**
 * Parse AI response and format for Slack Block Kit
 * @param {string} responseText - Raw AI response
 * @returns {object} Slack formatted response
 */
function parseAIResponse(responseText) {
  // Extract pro tip if present
  const proTipMatch = responseText.match(/💡.*?[Pp]ro [Tt]ip:?\s*(.+?)(?=\n|$)/);
  const proTip = proTipMatch ? proTipMatch[1].trim() : null;
  
  // Extract learn more URL if present
  const urlMatch = responseText.match(/📖.*?<?(https?:\/\/[^\s>]+)>?/);
  const learnMoreUrl = urlMatch ? urlMatch[1] : DOCS_BASE_URL;
  
  // Remove pro tip and learn more from main text
  let mainText = responseText
    .replace(/💡.*?[Pp]ro [Tt]ip:?\s*.+?(?=\n|$)/g, '')
    .replace(/📖.*?<?(https?:\/\/[^\s>]+)>?/g, '')
    .trim();
  
  // Build Slack blocks
  const blocks = [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: mainText
      }
    }
  ];
  
  // Add pro tip if found
  if (proTip) {
    blocks.push({
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: `💡 *Pro tip:* ${proTip}`
        }
      ]
    });
  }
  
  // Add learn more link
  blocks.push({
    type: 'context',
    elements: [
      {
        type: 'mrkdwn',
        text: `📖 <${learnMoreUrl}|Learn more>`
      }
    ]
  });
  
  return {
    statusCode: 200,
    body: {
      response_type: 'in_channel',
      blocks: blocks
    }
  };
}

module.exports = {
  getAIResponse,
  getClaudeResponse,
  getOpenAIResponse,
  parseAIResponse
};
