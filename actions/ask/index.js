/**
 * Adobe DocuBot - Main Action Handler
 * 
 * This action receives Slack slash commands, scrapes relevant documentation,
 * uses AI to generate helpful answers, and returns formatted responses.
 */

const { Core } = require('@adobe/aio-sdk');
const { scrapeDocs } = require('../../utils/docScraper');
const { getAIResponse } = require('../../utils/aiClient');
const { calculateCost, isCostQuestion } = require('../../utils/costCalculator');

/**
 * Main action handler
 * @param {object} params - Action parameters from Slack
 * @returns {object} Slack Block Kit formatted response
 */
async function main(params) {
  const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' });
  const startTime = Date.now();
  
  try {
    logger.info('Adobe DocuBot received request');
    
    // Extract question from Slack payload
    const question = params.text || params.question || '';
    
    if (!question.trim()) {
      return formatSlackResponse(
        '🤖 *Adobe DocuBot*\n\nPlease ask me a question! For example:\n• How do I deploy my app?\n• What are the memory limits?\n• Show me an example action',
        null,
        null
      );
    }
    
    logger.info(`Question: ${question}`);
    
    // Check if this is a cost calculation question
    if (isCostQuestion(question)) {
      logger.info('Detected cost calculation question');
      const costResult = calculateCost(question);
      return formatSlackResponse(costResult.answer, costResult.proTip, costResult.learnMoreUrl);
    }
    
    // Scrape relevant documentation
    logger.info('Scraping documentation...');
    const docContent = await scrapeDocs(question);
    
    if (!docContent) {
      return formatSlackResponse(
        '🤖 *Adobe DocuBot*\n\nI couldn\'t find relevant documentation for your question. Could you try rephrasing it?',
        'Try asking about deployment, configuration, or development topics.',
        'https://developer.adobe.com/app-builder/docs/'
      );
    }
    
    // Get AI response
    logger.info('Getting AI response...');
    const aiResponse = await getAIResponse(question, docContent);
    
    // Log performance metrics
    const duration = Date.now() - startTime;
    logger.info(`Request completed in ${duration}ms`);
    
    return aiResponse;
    
  } catch (error) {
    logger.error(`Error in main action: ${error.message}`);
    logger.error(error.stack);
    
    // Return user-friendly error message
    return formatSlackResponse(
      '🤖 *Adobe DocuBot*\n\n❌ Oops! I encountered an error processing your question.',
      'This might be a temporary issue. Please try again in a moment.',
      null
    );
  }
}

/**
 * Format response in Slack Block Kit format
 * @param {string} answer - Main answer text
 * @param {string} proTip - Optional pro tip
 * @param {string} learnMoreUrl - Optional documentation URL
 * @returns {object} Slack formatted response
 */
function formatSlackResponse(answer, proTip, learnMoreUrl) {
  const blocks = [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: answer
      }
    }
  ];
  
  // Add pro tip if provided
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
  
  // Add learn more link if provided
  if (learnMoreUrl) {
    blocks.push({
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: `📖 <${learnMoreUrl}|Learn more>`
        }
      ]
    });
  }
  
  return {
    statusCode: 200,
    body: {
      response_type: 'in_channel',
      blocks: blocks
    }
  };
}

exports.main = main;
