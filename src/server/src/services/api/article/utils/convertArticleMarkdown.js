import * as R from 'ramda';
import markdownToHTML from '@utils/helpers/markdownToHTML';

const convertArticleMarkdown = R.evolve(
  {
    lead: markdownToHTML,
    content: markdownToHTML,
  },
);

export default convertArticleMarkdown;
