import React, {useState, useMemo} from 'react';
import ReactMde from 'react-mde';
import injectSheet from 'react-jss';
import * as Showdown from 'showdown';
import * as R from 'ramda';

import {WHITE} from '@constants/colorSchema';

import {useI18n} from '@i18n';
import linkInputs from '@utils/decorators/linkInputs';

import DisableSSRRender from '@utils/components/DisableSSRRender';

const MarkdownEditor = ({l, classes, ...props}) => {
  const t = useI18n();
  const [selectedTab, setSelectedTab] = useState();

  const generateMarkdownPreview = useMemo(
    () => {
      const converter = new Showdown.Converter(
        {
          tables: true,
          simplifiedAutoLink: true,
          strikethrough: true,
          tasklists: true,
        },
      );

      return markdown => Promise.resolve(
        converter.makeHtml(markdown),
      );
    },
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
