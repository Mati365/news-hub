import React from 'react';

import {useI18n} from '@i18n';

import {ARTICLE_CARD_SCHEMA} from '@constants/typeSchema';
import {
  Margin,
  Text,
} from '@utils/components';

const ArticleStatsToolbar = ({article}) => {
  const t = useI18n('website.article');

  return (
    <>
      {article.commentsCount > 0 && (
        <Margin right={2}>
          <Text.Muted>
            {t('comments_count', [article.commentsCount])}
          </Text.Muted>
        </Margin>
      )}
      <Text.Muted>
        {t('read_time', [article.readTime])}
      </Text.Muted>
    </>
  );
};

ArticleStatsToolbar.displayName = 'ArticleStatsToolbar';

ArticleStatsToolbar.propTypes = {
  article: ARTICLE_CARD_SCHEMA.isRequired,
};

export default ArticleStatsToolbar;
