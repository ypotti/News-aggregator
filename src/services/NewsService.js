import axios from 'axios';
import { GUARDIAN, NEWSAPI, NYTIMES } from '../constants';
import { getQueryParams } from '../utils';

const API_KEYS = {
  newsAPI: 'bc14f8d4af1c4e91895472a1167535f1',
  guardianAPI: '4826c801-3972-4fba-bb44-15ac199bca6c',
  nyTimesAPI: 'F2zZA02nzEXD61yfdLGdz5ywVDGadpAI'
};

const fetchFromNewsAPI = async (query, { fromDate, toDate, category, source }) => {
  if (source === "" || source === NEWSAPI) { 
    const queryParams = getQueryParams({ q: query, from: fromDate, to: toDate, category });
    const url = `https://newsapi.org/v2/top-headlines?${queryParams}&apiKey=${API_KEYS.newsAPI}`;
    const response = await axios.get(url);
    return response.data.articles;
  }
  return [];
};

const fetchFromGuardianAPI = async (query, { fromDate, toDate, source }) => {
  if (source === "" || source === GUARDIAN) {
    const queryParams = getQueryParams({ q: query, 'from-date': fromDate, 'to-date': toDate });
    const url = `https://content.guardianapis.com/search?${queryParams}&api-key=${API_KEYS.guardianAPI}&show-fields=thumbnail,trailText&show-tags=contributor`;
    const response = await axios.get(url);
    return response.data.response.results;
  }
  return [];
};

const fetchFromNYTAPI = async (query, { fromDate, toDate, source }) => {
  if (source === "" || source === NYTIMES) {
    const queryParams = getQueryParams({ q: query, 'begin_date': fromDate, 'end_date': toDate });
    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?${queryParams}&api-key=${API_KEYS.nyTimesAPI}`;
    const response = await axios.get(url);
    return response.data.response.docs;
  }
  return [];
};

const formatArticle = (article, sourceType) => {
  if (sourceType === 'newsAPI') {
    return {
      title: article.title,
      description: article.description,
      url: article.url,
      image: article.urlToImage || '/news.webp',
      source: 'NewsAPI',
      date: article.publishedAt,
    };
  } else if (sourceType === 'guardian') {
    return {
      title: article.webTitle,
      description: article.fields?.trailText || 'No description available',
      url: article.webUrl,
      image: article.fields?.thumbnail || '/news.webp', 
      source: 'The Guardian',
      date: article.webPublicationDate,
    };
  } else if (sourceType === 'nyTimes') {
    return {
      title: article.headline.main,
      description: article.abstract || 'No description available',
      url: `https://www.nytimes.com/${article.web_url}`,
      image: article.multimedia.length ? `https://www.nytimes.com/${article.multimedia[0].url}` : '/news.webp',
      source: 'New York Times',
      date: article.pub_date,
    };
  }
  return article; 
};

const fetchAllNews = async (query, options) => {
  try {
    let { preferredSource, fromDate, toDate, category, source } = options;
    query = query || "latest news";
    if (!source) {
      source = preferredSource;
    }

    const [newsAPI, guardian, nyTimes] = await Promise.all([
      fetchFromNewsAPI(query, { fromDate, toDate, category, source }),
      fetchFromGuardianAPI(query, { fromDate, toDate, source }),
      fetchFromNYTAPI(query, { fromDate, toDate, source }),
    ]);

    const newsAPIFormatted = newsAPI.map((article) => formatArticle(article, 'newsAPI'));
    const guardianFormatted = guardian.map((article) => formatArticle(article, 'guardian'));
    const nyTimesFormatted = nyTimes.map((article) => formatArticle(article, 'nyTimes'));

    return [...newsAPIFormatted, ...guardianFormatted, ...nyTimesFormatted];
  } catch (error) {
    console.error("API fetch error:", error);
    throw new Error("Unable to fetch articles. Please try again later.");
  }
};

export default fetchAllNews;
