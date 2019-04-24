import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import {HOME_URL_SCHEMA} from '@client/links/HomeLink';

import {useI18n} from '@i18n';
import {useAPIContext} from '@api-client/components/APIContext';
import {useAPIMutation} from '@api-client/components/APIQuery';
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

const SubmitArticleButton = ({loading, editing, ...props}) => {
  const t = useI18n('website.routes.create_article');

  let text = null;
  if (loading)
    text = 'saving';
  else if (editing)
    text = 'editing';
  else
    text = 'submit';

  return (
    <Button
      color='danger'
      type='submit'
      disabled={loading}
      filled={!loading}
      {...props}
    >
      {t(text)}
    </Button>
  );
};

const DeleteArticleButton = ({articleId, onDeleted}) => {
  const t = useI18n('website.routes.create_article');
  const [apiCall, {loading}] = useAPIMutation();

  let text = null;
  if (loading)
    text = 'deleting';
  else
    text = 'delete';

  return (
    <Button
      color='secondary'
      type='submit'
      disabled={loading}
      filled={loading}
      onClick={
        async () => {
          await apiCall(
            {
              method: 'DELETE',
              path: `/article/${articleId}`,
            },
          );

          if (onDeleted)
            onDeleted();
        }
      }
    >
      {t(text)}
    </Button>
  );
};

const BasicArticleForm = ({inputs, method, ...props}) => {
  const t = useI18n('website.routes.create_article');
  const api = useAPIContext();
  const router = useReactRouter();

  const onSubmitDone = (toast = t('website.toasts.article_has_been_added')) => {
    setTimeout(
      () => {
        router.history.push(
          HOME_URL_SCHEMA,
          {
            toast,
          },
        );
      },
      50,
    );
  };

  return (
    <AsyncForm
      {...props}
      submitPromiseFn={
        l => (::api[l.value?.id ? 'patch' : 'post'])(
          {
            path: '/article',
            body: l.value,
          },
        )
      }
      onSubmitDone={onSubmitDone}
    >
      {({l, loading}) => {
        const editing = !R.isNil(l.value?.id);

        return (
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
              {editing && (
                <DeleteArticleButton
                  articleId={l.value.id}
                  onDeleted={onSubmitDone}
                />
              )}
              <Float right>
                <SubmitArticleButton
                  loading={loading}
                  editing={editing}
                />
              </Float>
            </Margin>
          </>
        );
      }}
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
