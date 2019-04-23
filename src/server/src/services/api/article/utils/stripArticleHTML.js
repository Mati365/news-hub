import * as R from 'ramda';
import striptags from 'striptags';

const stripArticleHTML = R.evolve(
  {
    lead: striptags,
    content: striptags,
  },
);

export default stripArticleHTML;
