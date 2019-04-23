import React from 'react';

import {useI18n} from '@i18n';

import {IdleRender} from '@utils/components';

import {PageFooter} from '../../Parts';
import TitledSection from '../../Parts/TitledSection';

import PrimarySection from './PrimarySection';
import PopularSection from './PopularSection';
import TagsSection from './TagsSection';

const SeeAlsoSection = () => {
  const t = useI18n();

  return (
    <TitledSection title={t('website.titles.see_also')}>
      <IdleRender>
        <PrimarySection />
      </IdleRender>

      <IdleRender>
        <PopularSection />
        <TagsSection />
        <PageFooter />
      </IdleRender>
    </TitledSection>
  );
};

SeeAlsoSection.displayName = 'SeeAlsoSection';

export default React.memo(SeeAlsoSection);
