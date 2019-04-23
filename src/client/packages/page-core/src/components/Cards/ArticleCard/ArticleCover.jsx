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
    square: {
      width: '100%',
      paddingBottom: '100%',
    },

    rectangle: {
      paddingBottom: '50%',
    },
  },
  {
    omitProps: ['square'],
    classSelector: (classes, {type}) => (
      classes[type]
    ),
  },
);

const ArticleCover = ({
  vertical, article, coverType,
  ...props
}) => {
  const t = useI18n();
  const {coverUrl, coverTitle} = article;

  return (
    <div {...props}>
      <ArticleImageWrapper
        type={
          coverType || (
            vertical
              ? 'rectangle'
              : 'square'
          )
        }
      >
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
  coverType: PropTypes.string,
};

ArticleCover.defaultProps = {
  vertical: true,
  coverType: null,
};

export default ArticleCover;
