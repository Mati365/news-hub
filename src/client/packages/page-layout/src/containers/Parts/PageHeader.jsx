import React from 'react';

import {useI18n} from '@i18n';
import styled from '@jss';

import TagsList from '@client/core/components/Tags/TagsList';
import Button from '@client/core/components/Controls/Button';
import {
  Margin,
  Header,
  Divider,
  Flex,
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

const PageHeader = () => (
  <>
    <Margin
      top={4}
      block
    >
      <Flex
        direction='row'
        align='center'
      >
        <span>
          <HeaderTitle>
            Daily Jews
          </HeaderTitle>

          <Margin top={2}>
            <TagsList tags={TOP_TAGS} />
          </Margin>
        </span>

        <Margin left='auto'>
          <CreateArticleButton />
        </Margin>
      </Flex>
    </Margin>

    <Divider spacing='big' />
  </>
);

PageHeader.displayName = 'PageHeader';

export default React.memo(PageHeader);
