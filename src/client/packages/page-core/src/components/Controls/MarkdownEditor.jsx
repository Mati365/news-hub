import React, {useState, useCallback} from 'react';
import ReactMde from 'react-mde';
import injectSheet from 'react-jss';
import * as R from 'ramda';

import {WHITE} from '@constants/colorSchema';

import {useI18n} from '@i18n';
import linkInputs from '@utils/decorators/linkInputs';
import markdownToHTML from '@utils/helpers/markdownToHTML';

import DisableSSRRender from '@utils/components/DisableSSRRender';

const MarkdownEditor = ({l, classes, ...props}) => {
  const t = useI18n();
  const [selectedTab, setSelectedTab] = useState();

  const generateMarkdownPreview = useCallback(
    markdown => Promise.resolve(
      markdownToHTML(markdown),
    ),
    [],
  );

  return (
    <DisableSSRRender>
      <ReactMde
        {...props}
        {...l.input(null)}
        l18n={
          t('website.markdown_editor')
        }
        generateMarkdownPreview={generateMarkdownPreview}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
      />
    </DisableSSRRender>
  );
};

MarkdownEditor.displayName = 'MarkdownEditor';

export default R.compose(
  linkInputs(
    {
      initialData: '',
    },
  ),
  React.memo,
  injectSheet(
    {
      '@global': {
        '.react-mde': {
          '& > .mde-header, .grip': {
            background: WHITE,
          },
        },
      },
    },
  ),
)(MarkdownEditor);
