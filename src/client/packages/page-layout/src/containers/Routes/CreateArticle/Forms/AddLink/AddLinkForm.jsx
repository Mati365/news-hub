import React from 'react';
import * as R from 'ramda';

import {useI18n} from '@i18n';
import linkInputs from '@utils/decorators/linkInputs';

import {
  Debounce,
  Flex,
  Margin,
} from '@utils/components';

import {Input} from '@client/controls';
import {AsyncForm} from '@client/controls/Form';
import {GroupLabel} from '@client/controls/Form/FormGroup';
import APIQuery from '@api-client/components/APIQuery';

const CrawlerLoading = () => {
  const t = useI18n();

  return (
    <Flex
      centered
      expanded
    >
      {t('website.titles.loading')}
    </Flex>
  );
};

const CrawlerError = () => {
  const t = useI18n();

  return (
    <Flex
      centered
      expanded
    >
      {t('website.titles.error')}
    </Flex>
  );
};

const AddLinkGroup = ({value, onChange}) => {
  const t = useI18n('website.routes.create_article');

  return (
    <Flex
      direction='row'
      align='center'
    >
      <GroupLabel>
        {t('page_url_label')}
      </GroupLabel>

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
    </Flex>
  );
};

const AddLinkForm = ({l, value}) => (
  <AsyncForm>
    <Margin
      bottom={4}
      block
    >
      <AddLinkGroup {...l.input('url')} />
    </Margin>

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
          {({data}) => (
            !data
              ? null
              : (
                <div>
                  {data.title}
                </div>
              )
          )}
        </APIQuery>
      )}
    </Debounce>
  </AsyncForm>
);

AddLinkForm.displayName = 'AddLinkForm';

export default linkInputs(
  {
    initialData: {url: ''},
  },
)(AddLinkForm);
