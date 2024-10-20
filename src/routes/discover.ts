import express from 'express';
import { searchSearxng } from '../lib/searxng';
import logger from '../utils/logger';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const data = (
      await Promise.all([
        searchSearxng('site:apnews.com world news', {
          engines: ['brave.news'],
          pageno: 1,
        }),
        searchSearxng('site:apnews.com politics', {
          engines: ['brave.news'],
          pageno: 1,
        }),
        searchSearxng('site:apnews.com business', {
          engines: ['brave.news'],
          pageno: 1,
        }),
        searchSearxng('site:apnews.com technology', {
          engines: ['brave.news'],
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
