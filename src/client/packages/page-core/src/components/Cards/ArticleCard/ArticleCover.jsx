import React from 'react';
import PropTypes from 'prop-types';

import {LIGHT_GRAY} from '@constants/colorSchema';

import {useI18n} from '@i18n';
import styled from '@jss';

import {ArticleLink} from '@client/links';
import {
  Text,
  LayerImage,
} from '@utils/components';

const ArticleImageWrapper = styled.figure(
  {
    base: {
      position: 'relative',
      width: '100%',
      margin: 0,
      padding: 0,
      background: LIGHT_GRAY,
    },

    // it should be always square
    horizontal: {
      width: '100%',
      paddingBottom: '100%',
    },

    vertical: {
      paddingBottom: '50%',
    },
  },
  {
    omitProps: ['vertical'],
    classSelector: (classes, {vertical}) => (
      vertical
        ? classes.vertical
        : classes.horizontal
    ),
  },
);

const ArticleCover = ({vertical, article, ...props}) => {
  const t = useI18n();
  const {coverUrl, coverTitle} = article;

  return (
    <div {...props}>
      <ArticleImageWrapper vertical={vertical}>
        <ArticleLink article={article}>
          <LayerImage
            src={coverUrl}
            title={coverTitle}
          />
        </ArticleLink>
      </ArticleImageWrapper>

      {coverTitle && (
        <Text.Muted
          size='tiny'
          align={
            vertical
              ? 'right'
              : 'left'
          }
          block
          style={{
            marginTop: 2,
          }}
        >
          {t('website.titles.images.figcaption', [coverTitle])}
        </Text.Muted>
      )}
    </div>
  );
};

ArticleCover.displayName = 'ArticleCover';

ArticleCover.propTypes = {
  vertical: PropTypes.bool,
};

ArticleCover.defaultProps = {
  vertical: true,
};

export default ArticleCover;
