import React from 'react';

import {useI18n} from '@i18n';
import styled from '@jss';

import {Divider} from '@utils/components';
import ArticleCard from '@client/core/components/Cards/ArticleCard';
import TitledSection from '../../../Parts/TitledSection';

import FAKE_ARTICLE from '../../../../mocks/articles';

const PopularSectionGrid = styled.div(
  {
    display: 'grid',
    gridGap: '20px 30px',
    gridTemplateColumns: '3.3fr 1px 3.3fr 1px 3.3fr',
    gridTemplateRows: 'auto',
    gridTemplateAreas: `
      "big vspace bigB vspaceB bigC"
    `,
  },
);

const PopularSection = () => {
  const t = useI18n();

  return (
    <TitledSection
      title={
        t('website.sections.articles.title')
      }
    >
      <PopularSectionGrid>
        <Divider
          spacing='none'
          vertical
          style={{
            gridArea: 'vspace',
          }}
        />

        <Divider
          spacing='none'
          vertical
          style={{
            gridArea: 'vspaceB',
          }}
        />

        <ArticleCard
          article={FAKE_ARTICLE[0]}
          style={{
            gridArea: 'big',
          }}
        />

        <ArticleCard
          article={FAKE_ARTICLE[1]}
          style={{
            gridArea: 'bigB',
          }}
        />

        <ArticleCard
          article={FAKE_ARTICLE[5]}
          style={{
            gridArea: 'bigC',
          }}
        />
      </PopularSectionGrid>
    </TitledSection>
  );
};

PopularSection.displayName = 'PopularSection';

export default PopularSection;
