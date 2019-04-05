import React from 'react';

import {useI18n} from '@i18n';
import styled from '@jss';

import HeartIcon from '@icons/HeartIcon';
import BookmarkIcon from '@icons/BookmarkIcon';
import EyeIcon from '@icons/EyeIcon';

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
    marginTop: 115,

    '& > li': {
      marginBottom: 20,
      cursor: 'pointer',
    },
  },
  {
    inline: false,
  },
);

const ArticleActionToolbar = () => {
  const t = useI18n();

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
    </ArticleToolbarList>
  );
};

export default ArticleActionToolbar;
