/**
 * Documentation Scraper Utility
 * 
 * Configurable scraper that can point to any public documentation.
 * Fetches relevant pages based on user questions and extracts clean text.
 */

const axios = require('axios');
const cheerio = require('cheerio');

// Read documentation configuration from environment variables
const DOCS_CONFIG = {
  baseUrl: process.env.DOCS_BASE_URL || 'https://developer.adobe.com/app-builder/docs/',
  name: process.env.DOCS_NAME || 'App Builder',
};

// Default App Builder documentation URLs (for demo)
const APP_BUILDER_URLS = {
  overview: 'https://developer.adobe.com/app-builder/docs/overview/',
  gettingStarted: 'https://developer.adobe.com/app-builder/docs/getting_started/',
  guides: 'https://developer.adobe.com/app-builder/docs/guides/',
  deployment: 'https://developer.adobe.com/app-builder/docs/guides/deployment/',
  runtime: 'https://developer.adobe.com/runtime/docs/guides/',
  actions: 'https://developer.adobe.com/app-builder/docs/guides/actions/',
};

/**
 * Scrape relevant documentation based on user question
 * @param {string} question - User's question
 * @returns {Promise<string>} Relevant documentation content
 */
async function scrapeDocs(question) {
  try {
    // Identify keywords and relevant URLs
    const urls = identifyRelevantUrls(question);
    
    // Fetch and parse documentation
    const docContents = await Promise.all(
      urls.map(url => fetchAndParseDocs(url))
    );
    
    // Combine and limit content (max 3000 tokens ~= 12000 chars)
    const combinedContent = docContents
      .filter(content => content)
      .join('\n\n---\n\n')
      .substring(0, 12000);
    
    return combinedContent;
    
  } catch (error) {
    console.error('Error scraping docs:', error.message);
    return null;
  }
}

/**
 * Identify relevant documentation URLs based on question keywords
 * @param {string} question - User's question
 * @returns {Array<string>} Array of relevant URLs
 */
function identifyRelevantUrls(question) {
  const lowerQuestion = question.toLowerCase();
  const urls = [];
  
  // Keyword matching for App Builder docs
  if (lowerQuestion.includes('deploy') || lowerQuestion.includes('deployment')) {
    urls.push(APP_BUILDER_URLS.deployment);
  }
  
  if (lowerQuestion.includes('start') || lowerQuestion.includes('begin') || lowerQuestion.includes('getting started')) {
    urls.push(APP_BUILDER_URLS.gettingStarted);
  }
  
  if (lowerQuestion.includes('action') || lowerQuestion.includes('function') || lowerQuestion.includes('runtime')) {
    urls.push(APP_BUILDER_URLS.actions);
    urls.push(APP_BUILDER_URLS.runtime);
  }
  
  if (lowerQuestion.includes('overview') || lowerQuestion.includes('what is') || lowerQuestion.includes('introduction')) {
    urls.push(APP_BUILDER_URLS.overview);
  }
  
  if (lowerQuestion.includes('guide') || urls.length === 0) {
    urls.push(APP_BUILDER_URLS.guides);
  }
  
  // Limit to 2 URLs to keep response time reasonable
  return urls.slice(0, 2);
}

/**
 * Fetch and parse documentation from a URL
 * @param {string} url - Documentation URL
 * @returns {Promise<string>} Parsed documentation content
 */
async function fetchAndParseDocs(url) {
  try {
    console.log(`Fetching docs from: ${url}`);
    
    const response = await axios.get(url, {
      timeout: 5000,
      headers: {
        'User-Agent': 'Adobe-DocuBot/1.0'
      }
    });
    
    const $ = cheerio.load(response.data);
    
    // Remove unwanted elements (navigation, footer, ads, sidebar)
    $('nav, footer, .ad, .sidebar, .navigation, header, .header').remove();
    
    // Extract main content (try common selectors)
    let content = '';
    if ($('main').length) {
      content = $('main').text();
    } else if ($('.main-content').length) {
      content = $('.main-content').text();
    } else if ($('article').length) {
      content = $('article').text();
    } else {
      content = $('body').text();
    }
    
    // Clean up whitespace
    content = content
      .replace(/\s+/g, ' ')
      .replace(/\n\s*\n/g, '\n')
      .trim();
    
    // Add source URL
    content = `Source: ${url}\n\n${content}`;
    
    return content.substring(0, 6000); // Limit per URL
    
  } catch (error) {
    console.error(`Error fetching ${url}:`, error.message);
    return null;
  }
}

module.exports = {
  scrapeDocs,
  identifyRelevantUrls,
  fetchAndParseDocs,
  DOCS_CONFIG
};
