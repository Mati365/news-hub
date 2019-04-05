import React from 'react';

import {useI18n} from '@i18n';
import styled from '@jss';

import TagsList from '@client/core/components/Tags/TagsList';
import Button from '@client/core/components/Controls/Button';
import SearchIcon from '@icons/SearchIcon';

import {HomeLink} from '@client/links';
import {
  Margin,
  Header,
  Divider,
  Flex,
  Text,
} from '@utils/components';

import TOP_TAGS from '../../mocks/topTags';

const HeaderTitle = styled(
  Header.H1,
  {
    fontWeight: 700,
    margin: 0,
  },
);

const CreateArticleButton = () => {
  const t = useI18n();

  return (
    <Button>
      {t('website.buttons.create_article')}
    </Button>
  );
};

const SearchIconButton = () => {
  const t = useI18n();

  return (
    <Margin
      left={6}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
      }}
    >
      <Margin right={2}>
        <SearchIcon size='tiny' />
      </Margin>

      <Text uppercase>
        {t('website.titles.search')}
      </Text>
    </Margin>
  );
};

const PageHeader = () => {
  const t = useI18n();

  return (
    <header>
      <Margin
        top={4}
        block
      >
        <Flex
          direction='row'
          align='center'
        >
          <span>
            <HomeLink>
              <HeaderTitle>
                {t('website.info.name')}
              </HeaderTitle>
            </HomeLink>

            <Margin top={2}>
              <TagsList tags={TOP_TAGS} />
            </Margin>
          </span>

          <Margin left='auto'>
            <CreateArticleButton />
            <SearchIconButton />
          </Margin>
        </Flex>
      </Margin>

      <Divider spacing='big' />
    </header>
  );
};

PageHeader.displayName = 'PageHeader';

export default React.memo(PageHeader);
