import React from 'react';
import PropTypes from 'prop-types';

import {ARTICLE_SCHEMA} from '@constants/typeSchema';

import {Divider} from '@utils/components';
import ArticleCard from '@client/core/components/Cards/ArticleCard';

import createResponsiveCardsGrid from '../utils/createCardsGrid';

const PopularSectionGrid = createResponsiveCardsGrid(
  {
    md: {
      gridGap: '20px 30px',
      gridTemplateColumns: '3.3fr 1px 3.3fr 1px 3.3fr',
      gridTemplateRows: 'auto',
      gridTemplateAreas: `
        "big vspace bigB vspaceB bigC"
      `,

      '&:not(:only-child)': {
        marginBottom: 45,
      },
    },
  },
);

const ThreeArticlesCardsRow = ({list: articles}) => (
  <PopularSectionGrid>
    {articles[0] && (
      <ArticleCard
        article={articles[0]}
        style={{
          gridArea: 'big',
        }}
      />
    )}

    {articles[1] && (
      <>
        <Divider
          spacing='none'
          vertical
          style={{
            gridArea: 'vspaceB',
          }}
        />
        <ArticleCard
          article={articles[1]}
          style={{
            gridArea: 'bigB',
          }}
        />
      </>
    )}

    {articles[2] && (
      <>
        <Divider
          spacing='none'
          vertical
          style={{
            gridArea: 'vspace',
          }}
        />

        <ArticleCard
          article={articles[2]}
          style={{
            gridArea: 'bigC',
          }}
        />
      </>
    )}
  </PopularSectionGrid>
);

ThreeArticlesCardsRow.displayName = 'ThreeArticlesCardsRow';

ThreeArticlesCardsRow.propTypes = {
  list: PropTypes.arrayOf(ARTICLE_SCHEMA),
};

ThreeArticlesCardsRow.defaultProps = {
  list: [],
};

export default ThreeArticlesCardsRow;
