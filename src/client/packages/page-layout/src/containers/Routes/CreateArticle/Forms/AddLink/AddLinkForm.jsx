import React from 'react';

import {useI18n} from '@i18n';
import linkInputs from '@utils/decorators/linkInputs';

import {Flex} from '@utils/components';
import {Input} from '@client/controls';
import {AsyncForm} from '@client/controls/Form';
import {GroupLabel} from '@client/controls/Form/FormGroup';

const AddLinkGroup = linkInputs(
  {
    initialData: {url: ''},
  },
)(
  ({l, value}) => {
    const t = useI18n('website.routes.create_article');
    console.log(value);

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
          {...l.input('url')}
        />
      </Flex>
    );
  },
);

const AddLinkForm = () => (
  <AsyncForm>
    <AddLinkGroup />
  </AsyncForm>
);

AddLinkForm.displayName = 'AddLinkForm';

export default AddLinkForm;
