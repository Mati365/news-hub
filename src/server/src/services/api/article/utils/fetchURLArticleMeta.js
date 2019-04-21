import cheerio from 'cheerio';
import * as R from 'ramda';

export const tokenizeKeywords = R.compose(
  R.map(R.trim),
  R.split(','),
);

const fetchURLArticleMeta = async (url) => {
  const html = await fetch(
    url,
    {
      method: 'GET',
      headers: {
        Accept: 'text/html',
      },
    },
  )
    .then(page => page.text());

  const $ = cheerio.load(html);
  const textKeywords = $('meta[name="keywords"]').attr('content') || '';

  return {
    url,
    title: $('title').text(),
    description: $('meta[name="description"]').attr('content'),

    // textKeywords is stored in DB for that URL
    textKeywords,
    keywords: tokenizeKeywords(textKeywords),
  };
};

export default fetchURLArticleMeta;
