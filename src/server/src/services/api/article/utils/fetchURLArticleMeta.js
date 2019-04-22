import cheerio from 'cheerio';
import * as R from 'ramda';

import getReadTime from '@utils/helpers/getReadTime';
import decodeDomain from '@utils/helpers/decodeDomain';

export const tokenizeKeywords = R.compose(
  R.map(
    R.compose(
      R.toLower,
      R.when(
        R.startsWith('#'),
        R.tail,
      ),
      R.trim,
    ),
  ),
  R.split(','),
);

export const tokenizeFakeKeywords = R.compose(
  R.map(
    tagName => ({
      id: tagName,
      name: tagName,
    }),
  ),
  tokenizeKeywords,
);

export const metaInfoToArticle = article => ({
  // @see ARTICLE_SCHEMA
  coverUrl: article.ogImage,
  coverTitle: decodeDomain(article.websiteUrl),
  title: article.metaTitle,
  lead: article.metaDescription,
  content: '',
  tags: tokenizeFakeKeywords(article.metaKeywords),
  readTime: getReadTime(article.metaDescription),
  commentsCount: 0,
});

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
  const meta = {
    websiteUrl: url,
    metaTitle: $('title').text(),
    metaDescription: $('meta[name="description"i]').attr('content'),
    ogImage: $('meta[property="og:image"i]').attr('content'),
    metaKeywords: $('meta[name="keywords"i]').attr('content') || '',
  };

  return {
    empty: !meta.metaDescription && !meta.metaTitle,
    meta,
    article: metaInfoToArticle(meta),
  };
};

export default fetchURLArticleMeta;
