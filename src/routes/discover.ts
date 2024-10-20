import express from 'express';
import { searchSearxng } from '../lib/searxng';
import logger from '../utils/logger';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const data = (
      await Promise.all([
        searchSearxng('site:apnews.com world', {
          engines: ['bing news'],
          pageno: 1,
        }),
        searchSearxng('site:apnews.com politics', {
          engines: ['bing news'],
          pageno: 1,
        }),
        searchSearxng('site:apnews.com business', {
          engines: ['bing news'],
          pageno: 1,
        }),
        searchSearxng('site:apnews.com tech', {
          engines: ['bing news'],
          pageno: 1,
        }),
      ])
    )
      .map((result) => result.results)
      .flat()
      .sort(() => Math.random() - 0.5);

    return res.json({ blogs: data });
  } catch (err: any) {
    logger.error(`Error in discover route: ${err.message}`);
    return res.status(500).json({ message: 'An error has occurred' });
  }
});

export default router;
