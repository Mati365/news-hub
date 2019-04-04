import styled from '@jss';
import Header from '@utils/components/Header';

const ArticleHeader = styled(
  Header,
  {
    margin: [10, 0],
    fontWeight: 700,
    textAlign: 'justify',
  },
  {
    tag: 'H4',
  },
);

ArticleHeader.displayName = 'ArticleHeader';

export default ArticleHeader;
