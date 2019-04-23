import React from 'react';
import * as R from 'ramda';

import {useI18n} from '@i18n';
import linkInputs from '@utils/decorators/linkInputs';

import APIQuery from '@api-client/components/APIQuery';
import {loaderComponents} from '@client/core/components/LoaderAsyncTitles';

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

    {!R.isEmpty(value.url) && (
      <Divider />
    )}

    <Debounce
      delay={500}
      loadingComponent={loaderComponents.loadingComponent}
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
          {...loaderComponents}
        >
          {({data}) => (
            !data
              ? null
              : (
                <PreviewArticleForm
                  initialData={data.article}
                  metaData={data.meta}
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
