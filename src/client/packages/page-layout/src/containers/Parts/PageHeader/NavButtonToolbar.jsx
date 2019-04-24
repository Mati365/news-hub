import React from 'react';

import {useUA} from '@ua';
import {useI18n} from '@i18n';

import styled from '@jss';
import textEllipsis from '@utils/styles/textEllipsis';

import Button from '@client/core/components/Controls/Button';
import {UnorderedList} from '@utils/components';

import {CreateArticleLink} from '@client/links';

const NavItemHolder = styled.li(
  {
    extend: textEllipsis,
    whiteSpace: 'nowrap',
  },
);

const CreateArticleButton = (props) => {
  const t = useI18n();

  return (
    <CreateArticleLink>
      <Button {...props}>
        {t('website.buttons.create_article')}
      </Button>
    </CreateArticleLink>
  );
};

const ReportCrimeButton = (props) => {
  const t = useI18n();

  return (
    <Button
      color='danger'
      {...props}
    >
      {t('website.buttons.report_hate_crime')}
    </Button>
  );
};

const NavButtonToolbar = () => {
  const ua = useUA();

  return (
    <UnorderedList
      flex={ua.mobile}
      inline
    >
      <NavItemHolder>
        <CreateArticleButton small={ua.mobile} />
      </NavItemHolder>

      <NavItemHolder>
        <ReportCrimeButton small={ua.mobile} />
      </NavItemHolder>
    </UnorderedList>
  );
};

NavButtonToolbar.displayName = 'NavButtonToolbar';

export default NavButtonToolbar;
