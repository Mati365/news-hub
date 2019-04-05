import React from 'react';

import FAKE_TAGS from '@client/layout/mocks/topTags';

import {useI18n} from '@i18n';
import styled from '@jss';

import {Divider} from '@utils/components';
import TitledSection from '../../../../Parts/TitledSection';
import TagColumnSection from './TagColumnSection';

const TagsSectionGrid = styled.div(
  {
    display: 'grid',
    gridGap: '20px 30px',
    gridTemplateColumns: '3fr 1px 4fr 1px 3fr',
    gridTemplateRows: 'auto',
    gridTemplateAreas: `
      "a vspaceA b vspaceB c"
    `,
  },
);

const PopularSection = () => {
  const t = useI18n();

  return (
    <TitledSection
      title={
        t('website.sections.tags.title')
      }
    >
      <TagsSectionGrid>
        <TagColumnSection
          tag={FAKE_TAGS[3]}
          style={{
            gridArea: 'a',
          }}
        />

        <Divider
          spacing='none'
          vertical
          style={{
            gridArea: 'vspaceA',
          }}
        />

        <TagColumnSection
          tag={FAKE_TAGS[1]}
          style={{
            gridArea: 'b',
          }}
        />

        <Divider
          spacing='none'
          vertical
          style={{
            gridArea: 'vspaceB',
          }}
        />

        <TagColumnSection
          tag={FAKE_TAGS[2]}
          style={{
            gridArea: 'c',
          }}
        />
      </TagsSectionGrid>
    </TitledSection>
  );
};

PopularSection.displayName = 'PopularSection';

export default PopularSection;
