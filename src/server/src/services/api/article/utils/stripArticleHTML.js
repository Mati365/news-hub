import * as R from 'ramda';
import striptags from 'striptags';

const ALLOWED_TAGS = [
  'a', 'strong', 'p', 'b', 'br', 'img',
  'table', 'tr', 'th', 'td', 'hr',
];

const safeTags = html => striptags(html, ALLOWED_TAGS);

const stripArticleHTML = R.evolve(
  {
    lead: safeTags,
    content: safeTags,
  },
);

export default stripArticleHTML;
