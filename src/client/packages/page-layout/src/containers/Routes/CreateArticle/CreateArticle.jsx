import React from 'react';

import {useI18n} from '@i18n';

import {Tabs} from '@client/controls';
import {
  Margin,
  Container,
  IdleRender,
} from '@utils/components';

import {
  PageFooter,
  PageHeader,
} from '../../Parts';

import * as Forms from './Forms';

const AddArticleTabs = () => {
  const t = useI18n('website.routes.create_article');

  return (
    <Tabs>
      <Tabs.Tab
        id='www'
        title={
          t('add_link')
        }
      >
        <Forms.AddLink />
      </Tabs.Tab>

      <Tabs.Tab
        id='article'
        title={
          t('add_article')
        }
      >
        <Forms.AddArticle />
      </Tabs.Tab>
    </Tabs>
  );
};

const CreateArticleRoute = () => (
  <Container>
    <PageHeader divider={false} />

    <IdleRender>
      <Margin
        top={6}
        block
      >
        <AddArticleTabs />
        <PageFooter />
      </Margin>
    </IdleRender>
  </Container>
);

CreateArticleRoute.displayName = 'CreateArticleRoute';

export default CreateArticleRoute;
