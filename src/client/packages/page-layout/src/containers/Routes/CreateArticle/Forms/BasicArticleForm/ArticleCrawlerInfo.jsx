import React from 'react';
import PropTypes from 'prop-types';

import {useI18n} from '@i18n';
import styled from '@jss';

import {GroupLabel} from '@client/controls/Form/FormGroup';
import {
  Flex,
  Text,
  Label,
} from '@utils/components';

const CrawlerLabel = styled(
  GroupLabel,
  {
    color: 'rgba(0, 0, 0, 0.5)',
    marginRight: 8,
  },
  {
    index: 2,
  },
);

const CrawlerRow = ({title, content}) => (
  <Flex
    direction='row'
    style={{
      fontSize: '0.65rem',
      wordBreak: 'break-all',
      alignItems: 'center',
    }}
  >
    <CrawlerLabel>
      {title}
    </CrawlerLabel>

    <Text
      type='muted'
      style={{
        flex: 1,
      }}
    >
      {content || '-'}
    </Text>
  </Flex>
);

const ArticleCrawlerInfo = ({metaData}) => {
  const t = useI18n('website.routes.create_article.crawler_info');

  return (
    <div>
      <Label>
        {t('website_box_title')}
      </Label>

      <CrawlerRow
        title={t('title')}
        content={metaData.metaTitle}
      />

      <CrawlerRow
        title={t('description')}
        content={metaData.metaDescription}
      />

      <CrawlerRow
        title={t('tags')}
        content={metaData.metaKeywords}
      />
    </div>
  );
};

ArticleCrawlerInfo.displayName = 'ArticleCrawlerInfo';

ArticleCrawlerInfo.propTypes = {
  metaData: PropTypes.shape(
    {
      title: PropTypes.string,
      description: PropTypes.string,
      textTags: PropTypes.string,
    },
  ).isRequired,
};

export default React.memo(ArticleCrawlerInfo);
