import React from 'react';

import {useI18n} from '@i18n';
import linkInputs from '@utils/decorators/linkInputs';
import getReadTime from '@utils/helpers/getReadTime';

import {
  Float,
  Margin,
} from '@utils/components';

import {
  Input,
  TagInput,
  MarkdownEditor,
  FormGroup,
  AsyncForm,
  Button,
} from '@client/controls';

const SubmitArticleButton = (props) => {
  const t = useI18n('website.routes.create_article');

  return (
    <Button
      color='danger'
      type='submit'
      filled
      {...props}
    >
      {t('submit')}
    </Button>
  );
};

const BasicArticleForm = ({l}) => {
  const t = useI18n('website.routes.create_article');

  return (
    <AsyncForm>
      <FormGroup
        label={t('modify_title')}
        control={(
          <Input
            {...l.input('title')}
            required
          />
        )}
      />

      <FormGroup
        label={t('cover_url')}
        control={(
          <Input
            {...l.input('coverUrl')}
            required
          />
        )}
      />

      <FormGroup
        label={t('cover_title')}
        control={(
          <Input {...l.input('coverTitle')} />
        )}
      />

      <FormGroup
        label={t('card_lead')}
        control={(
          <MarkdownEditor
            minEditorHeight={80}
            required
            {...l.input('lead')}
          />
        )}
      />

      <FormGroup
        label={t('modify_info')}
        control={(
          <MarkdownEditor
            {...l.input('content', {
              relatedInputsFn: (newContent, name, {lead}) => ({
                readTime: getReadTime(newContent || lead),
              }),
            })}
          />
        )}
      />

      <FormGroup
        label={t('article_tags')}
        control={(
          <TagInput {...l.input('tags')} />
        )}
      />

      <Margin
        top={5}
        block
      >
        <Float right>
          <SubmitArticleButton />
        </Float>
      </Margin>
    </AsyncForm>
  );
};

BasicArticleForm.displayName = 'BasicArticleForm';

export default linkInputs(
  {
    initialData: {
      title: '',
    },
  },
)(BasicArticleForm);
