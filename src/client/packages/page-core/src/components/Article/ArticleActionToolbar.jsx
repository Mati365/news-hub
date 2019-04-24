import React from 'react';

import {ARTICLE_SCHEMA} from '@constants/typeSchema';

import {useI18n} from '@i18n';
import {useUA} from '@ua';

import styled from '@jss';
import createBreakpoints from '@utils/styles/createBreakpoints';

import HeartIcon from '@icons/HeartIcon';
import BookmarkIcon from '@icons/BookmarkIcon';
import EyeIcon from '@icons/EyeIcon';
import PencilIcon from '@icons/PencilIcon';

import {EditArticleLink} from '@client/links';
import {
  Flex,
  Margin,
  UnorderedList,
} from '@utils/components';

const TitledIcon = ({
  icon: IconComponent, title, iconProps,
  ...props
}) => (
  <Flex
    direction='row'
    align='center'
    {...props}
  >
    <IconComponent {...iconProps} />
    <Margin left={2}>
      {title}
    </Margin>
  </Flex>
);

const ArticleToolbarList = styled(
  UnorderedList,
  {
    marginTop: 20,
    textAlign: 'right',

    '& > li': {
      margin: [0, 10],
      cursor: 'pointer',
    },

    ...createBreakpoints(
      {
        'xs-md': {
          margin: [10, 0],
          fontSize: '0.9em',
          textAlign: 'center',

          '& > li': {
            margin: [0, 6],
            cursor: 'pointer',

            '& svg': {
              width: 20,
              height: 20,
            },
          },
        },
      },
    ),
  },
  {
    inline: true,
  },
);

const ArticleActionToolbar = ({article}) => {
  const t = useI18n();
  const ua = useUA();

  return (
    <ArticleToolbarList>
      <li>
        <TitledIcon
          icon={HeartIcon}
          title={
            t('website.article.likes', [25])
          }
        />
      </li>

      <li>
        <TitledIcon
          icon={EyeIcon}
          title={
            t('website.article.views', ['2k'])
          }
        />
      </li>

      <li>
        <TitledIcon
          icon={BookmarkIcon}
          title={
            t('website.article.bookmark')
          }
          iconProps={{
            outline: true,
          }}
        />
      </li>

      <li>
        <EditArticleLink
          article={article}
          rel='nofollow'
        >
          {(
            ua.mobile
              ? <PencilIcon />
              : (
                <TitledIcon
                  icon={PencilIcon}
                  title={
                    t('website.article.edit')
                  }
                />
              )
          )}
        </EditArticleLink>
      </li>
    </ArticleToolbarList>
  );
};

ArticleActionToolbar.propTypes = {
  article: ARTICLE_SCHEMA.isRequired,
};

export default ArticleActionToolbar;
