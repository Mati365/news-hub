import React from 'react';

import styled from '@jss';

import {Divider} from '@utils/components';
import ArticleCard from '@client/core/components/Cards/ArticleCard';

import FAKE_ARTICLE from '../../../../mocks/articles';

const PrimarySectionGrid = styled.div(
  {
    display: 'grid',
    gridGap: '20px 30px',
    gridTemplateColumns: '3fr 1px 3.5fr 3.5fr',
    gridTemplateRows: '190px 1px 190px',
    gridTemplateAreas: `
      "big vspace smallA smallB"
      "big vspace hspace  hspace"
      "big vspace smallC  smallD"
    `,
  },
);

const PrimarySection = () => (
  <PrimarySectionGrid>
    <Divider
      spacing='none'
      vertical
      style={{
        gridArea: 'vspace',
      }}
    />

    <Divider
      spacing='none'
      style={{
        gridArea: 'hspace',
      }}
    />

    <ArticleCard
      article={FAKE_ARTICLE[0]}
      style={{
        gridArea: 'big',
      }}
    />

    <ArticleCard.Horizontal
      article={FAKE_ARTICLE[1]}
      maxDescriptionLength={220}
      style={{
        gridArea: 'smallA',
      }}
    />

    <ArticleCard.Horizontal
      article={FAKE_ARTICLE[3]}
      maxDescriptionLength={180}
      style={{
        gridArea: 'smallB',
      }}
    />

    <ArticleCard.Horizontal
      article={FAKE_ARTICLE[2]}
      maxDescriptionLength={180}
      style={{
        gridArea: 'smallC',
      }}
    />

    <ArticleCard.Horizontal
      article={FAKE_ARTICLE[4]}
      maxDescriptionLength={180}
      style={{
        gridArea: 'smallD',
      }}
    />
  </PrimarySectionGrid>
);

PrimarySection.displayName = 'PrimarySection';

export default PrimarySection;
