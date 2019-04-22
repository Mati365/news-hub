import React from 'react';
import PropTypes from 'prop-types';

import {HOME_URL_SCHEMA} from '@client/links/HomeLink';

import {useI18n} from '@i18n';
import {useAPIContext} from '@api-client/components/APIContext';
import useReactRouter from '@client/layout/hooks/useReactRouter';

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

const SubmitArticleButton = ({loading, ...props}) => {
  const t = useI18n('website.routes.create_article');

  return (
    <Button
      color='danger'
      type='submit'
      disabled={loading}
      filled={!loading}
      {...props}
    >
      {t(
        loading
          ? 'saving'
          : 'submit',
      )}
    </Button>
  );
};

const BasicArticleForm = ({inputs, ...props}) => {
  const t = useI18n('website.routes.create_article');
  const api = useAPIContext();
  const router = useReactRouter();

  return (
    <AsyncForm
      {...props}
      submitPromiseFn={
        l => api.post(
          {
            path: '/article',
            body: l.value,
          },
        )
      }
      onSubmitDone={
        () => {
          setTimeout(
            () => {
              router.history.push(
                HOME_URL_SCHEMA,
                {
                  toast: t('website.toasts.article_has_been_added'),
                },
              );
            },
            50,
          );
        }
      }
    >
      {({l, loading}) => (
        <>
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

          {inputs}

          <Margin
            top={5}
            block
          >
            <Float right>
              <SubmitArticleButton loading={loading} />
            </Float>
          </Margin>
        </>
      )}
    </AsyncForm>
  );
};

BasicArticleForm.displayName = 'BasicArticleForm';

BasicArticleForm.propTypes = {
  inputs: PropTypes.node,
};

BasicArticleForm.defaultProps = {
  inputs: null,
};

export default BasicArticleForm;
