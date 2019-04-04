import React from 'react';
import PropTypes from 'prop-types';

import {LIGHT_GRAY} from '@constants/colorSchema';

import {useI18n} from '@i18n';
import styled from '@jss';

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
    },

    rectangle: {
      paddingBottom: '50%',
      background: LIGHT_GRAY,
    },
  },
  {
    omitProps: ['orientation'],
    classSelector: (classes, {orientation}) => classes[orientation],
  },
);

const ArticleCover = ({orientation, title, ...props}) => {
  const t = useI18n();

  return (
    <>
      <ArticleImageWrapper orientation={orientation}>
        <LayerImage
          {...props}
          title={title}
        />
      </ArticleImageWrapper>

      {title && (
        <Text.Muted
          size='tiny'
          align='right'
          block
        >
          {t('website.titles.images.figcaption', [title])}
        </Text.Muted>
      )}
    </>
  );
};

ArticleCover.displayName = 'ArticleCover';

ArticleCover.propTypes = {
  orientation: PropTypes.oneOf([
    'rectangle',
    'square',
  ]),
};

ArticleCover.defaultProps = {
  orientation: 'rectangle',
};

export default ArticleCover;
