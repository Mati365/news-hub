import React from 'react';

import {useI18n} from '@i18n';

import APIQuery from '@api-client/components/APIQuery';
import {loaderComponents} from '@client/core/components/LoaderAsyncTitles';

import {Divider} from '@utils/components';
import TitledSection from '../../../Parts/TitledSection';
import TagColumnSection from './TagColumnSection';

import createResponsiveCardsGrid from '../utils/createCardsGrid';

const TagsSectionGrid = createResponsiveCardsGrid(
  {
    md: {
      gridGap: '20px 30px',
      gridTemplateColumns: '3fr 1px 4fr 1px 3fr',
      gridTemplateRows: 'auto',
      gridTemplateAreas: `
        "col-0 vspace-0 col-1 vspace-1 col-2"
      `,
    },
  },
);

const PopularTagsSection = ({sections}) => {
  const t = useI18n();

  return (
    <TitledSection
      title={
        t('website.sections.tags.title')
      }
    >
      <TagsSectionGrid>
        {(sections || []).map(
          ({tag, articles}, index) => (
            <React.Fragment key={tag.id}>
              <TagColumnSection
                tag={tag}
                articles={articles}
                style={{
                  gridArea: `col-${index}`,
                }}
              />

              {(
                index === sections.length - 1
                  ? null
                  : (
                    <Divider
                      spacing='none'
                      vertical
                      style={{
                        gridArea: `vspace-${index}`,
                      }}
                    />
                  )
              )}
            </React.Fragment>
          ),
        )}
      </TagsSectionGrid>
    </TitledSection>
  );
};

PopularTagsSection.displayName = 'PopularSection';

export default React.memo(
  () => (
    <APIQuery
      path='/articles/popular-by-tags'
      urlParams={{
        sortBy: 'popularity',
      }}
      {...loaderComponents}
    >
      {({data: sections}) => (
        <PopularTagsSection sections={sections} />
      )}
    </APIQuery>
  ),
);
