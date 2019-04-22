import React from 'react';
import * as R from 'ramda';

import {useI18n} from '@i18n';
import linkInputs from '@utils/decorators/linkInputs';

import APIQuery from '@api-client/components/APIQuery';

import {
  Debounce,
  Margin,
  Divider,
} from '@utils/components';

import {
  FormGroup,
  Input,
} from '@client/controls';

import PreviewArticleForm from '../BasicArticleForm/PreviewArticleForm';
import {
  CrawlerError,
  CrawlerLoading,
} from './CrawlerAsyncTitles';

const AddLinkGroup = ({value, onChange}) => {
  const t = useI18n('website.routes.create_article');

  return (
    <FormGroup
      inline
      label={
        t('page_url_label')
      }
      control={(
        <Input
          placeholder={
            t('paste_url_placeholder')
          }
          style={{
            flex: 1,
          }}
          {...{
            value,
            onChange,
          }}
        />
      )}
    />
  );
};

const AddLinkForm = ({l, value}) => (
  <>
    <Margin
      bottom={3}
      block
    >
      <AddLinkGroup {...l.input('url')} />
    </Margin>

    <Divider />

    <Debounce
      delay={500}
      loadingComponent={CrawlerLoading}
    >
      {debounced => (
        <APIQuery
          skipIf={
            debounced || R.isEmpty(value.url)
          }
          path='article/link-crawler'
          urlParams={{
            url: value.url,
          }}

          loadingComponent={CrawlerLoading}
          errorComponent={CrawlerError}
        >
          {({data: {meta, article}}) => (
            !article
              ? null
              : (
                <PreviewArticleForm
                  initialData={article}
                  metaData={meta}
                />
              )
          )}
        </APIQuery>
      )}
    </Debounce>
  </>
);

AddLinkForm.displayName = 'AddLinkForm';

export default linkInputs(
  {
    initialData: {
      url: 'https://wp.pl',
    },
  },
)(AddLinkForm);
