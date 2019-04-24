import React from 'react';

import {useI18n} from '@i18n';
import {useUA} from '@ua';

import linkInputs from '@utils/decorators/linkInputs';
import suppressEvent from '@utils/helpers/suppressEvent';
import convertArticleMarkdown from '@client/core/helpers/convertArticleMarkdown';

import ArticleCard from '@client/core/components/Cards/ArticleCard';
import Article from '@client/core/components/Article';

import {
  Label,
  Divider,
  Grid,
  Flex,
} from '@utils/components';

import {ExpandableContent} from '@client/controls';
import {ExpandableIconText} from '@client/controls/ExpandableContent';

import BasicArticleForm from './BasicArticleForm';
import ArticleCrawlerInfo from './ArticleCrawlerInfo';

const ExpandableArticlePreview = ({article}) => {
  const t = useI18n('website.routes.create_article');

  return (
    <Flex
      align='center'
      justify='center'
      direction='column'
      style={{
        marginTop: 20,
      }}
      onClick={suppressEvent}
    >
      <ExpandableContent
        initialExpanded={false}
        triggerRenderFn={
          ({expanded, toggleExpanded}) => (
            <ExpandableIconText
              text={
                expanded
                  ? t('collapse_preview')
                  : t('expand_preview')
              }
              expanded={expanded}
              onToggle={toggleExpanded}
            />
          )
        }
      >
        {() => (
          <>
            <Label>
              {t('article_full_preview')}
            </Label>
            <Article
              article={article}
              withActionToolbar={false}
              bordered
            />
          </>
        )}
      </ExpandableContent>
    </Flex>
  );
};

const PreviewArticleFormEditor = ({l, metaData, value: article}) => {
  const ua = useUA();

  const t = useI18n('website.routes.create_article');
  const htmlArticle = convertArticleMarkdown(article || {});

  return (
    <Grid>
      <Grid.Column
        xs={12}
        md={6}
        lg={4}
      >
        <Label>
          {t('card_preview')}
        </Label>

        <ArticleCard
          article={htmlArticle}
          style={{
            width: '100%',
          }}
          bordered
          linkComponent={
            ({children}) => children
          }
        />

        {metaData && (
          <>
            <Divider />
            <ArticleCrawlerInfo metaData={metaData} />
          </>
        )}
      </Grid.Column>

      <Grid.Column
        xs={12}
        md={6}
        lg={8}
        {...(
          ua.desktop
            ? {
              paddingDir: 'horizontal',
              padding: 'big',
            }
            : {
              paddingDir: 'vertical',
              padding: 'medium',
            }
        )}
      >
        <Label>
          {t('edit_article')}
        </Label>

        <BasicArticleForm
          {...l.input()}
          inputs={(
            <ExpandableArticlePreview article={htmlArticle} />
          )}
        />
      </Grid.Column>
    </Grid>
  );
};

export default linkInputs(
  {
    initialData: {
      readTime: 0,
      tags: [],
      title: '',
      content: '',
      lead: '',
    },
  },
)(PreviewArticleFormEditor);
