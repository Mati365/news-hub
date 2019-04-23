import React from 'react';

import {useI18n} from '@i18n';

import APIQuery from '@api-client/components/APIQuery';
import {IdleRender} from '@utils/components';
import {loaderComponents} from '@client/core/components/LoaderAsyncTitles';

import {
  PageHeader,
  PageContainer,
} from '../../Parts';

import PreviewArticleForm from '../CreateArticle/Forms/BasicArticleForm/PreviewArticleForm';
import TitledSection from '../../Parts/TitledSection';

const ArticleEditForm = ({articleId}) => (
  <APIQuery
    path={`article/${articleId}`}
    urlParams={{
      markdown: true,
    }}
    {...loaderComponents}
  >
    {({data: article}) => (
      !article
        ? null
        : (
          <PreviewArticleForm
            initialData={article}
            metaData={article.externalMetaDescriptor || {}}
          />
        )
    )}
  </APIQuery>
);

const EditArticle = ({match}) => {
  const t = useI18n();

  return (
    <PageContainer>
      <PageHeader divider={false} />

      <IdleRender>
        <TitledSection
          title={
            t('website.sections.editor.title')
          }
        >
          <ArticleEditForm articleId={match.params.id} />
        </TitledSection>
      </IdleRender>
    </PageContainer>
  );
};

EditArticle.displayName = 'EditArticle';

export default React.memo(EditArticle);
