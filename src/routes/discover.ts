import express from 'express';
import { searchSearxng } from '../lib/searxng';
import logger from '../utils/logger';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const data = (
      await Promise.all([
        searchSearxng('site:wsj.com world', {
          engines: ['bing news'],
          pageno: 1,
        }),
        searchSearxng('site:wsj.com politics', {
          engines: ['bing news'],
          pageno: 1,
        }),
        searchSearxng('site:wsj.com news', {
          engines: ['bing news'],
          pageno: 1,
        }),
        searchSearxng('site:wsj.com business', {
          engines: ['bing news'],
          pageno: 1,
        }),
        searchSearxng('site:wsj.com economy', {
          engines: ['bing news'],
          pageno: 1,
        }),
        searchSearxng('site:wsj.com tech', {
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
