import React from 'react';
import * as R from 'ramda';

import styled from '@jss';
import {useI18n} from '@i18n';

import linkInputs from '@utils/decorators/linkInputs';

import {UnorderedList} from '@utils/components';
import {InputBorderedHolder, inputStyles} from '../Input';
import RemovableTag from './RemovableTag';

const findIndexBy = keyName => name => R.findIndex(R.propEq(keyName, name));
const findIndexByName = findIndexBy('name');

const NonBorderedTagInput = styled.input(
  {
    width: 200,
    border: 0,
    outline: 0,
    padding: 0,
    margin: inputStyles.base.padding,
  },
);

const TagInput = ({l, value}) => {
  const t = useI18n();

  const onKeyDown = (e) => {
    // Enter
    if (e.keyCode !== 13)
      return;

    // Append new tag if not duplicated
    const name = R.trim(e.target.value || '');
    if (value && findIndexByName(name)(value) >= 0)
      return;

    e.preventDefault();
    l.setValue(
      [
        ...(value || []),
        {
          id: name,
          name,
        },
      ],
    );

    e.target.value = '';
  };

  const onRemoveTag = (tag) => {
    if (!value)
      return;

    const index = findIndexByName(tag.name)(value);
    if (index < 0)
      return;

    l.setValue(
      R.remove(index, 1, value),
    );
  };

  const onChangeTag = ({name: oldName}, newTag) => {
    const index = findIndexByName(oldName)(value);
    if (index < 0)
      return;

    l.setValue(
      R.update(
        index,
        newTag,
        value,
      ),
    );
  };

  return (
    <InputBorderedHolder>
      {value && (
        <UnorderedList>
          {value.map(
            tag => (
              <RemovableTag
                key={tag.name}
                tag={tag}
                onRemove={onRemoveTag}
                onChange={onChangeTag}
              />
            ),
          )}
        </UnorderedList>
      )}

      <NonBorderedTagInput
        placeholder={
          t('website.placeholders.enter_tag')
        }
        onKeyDown={onKeyDown}
      />
    </InputBorderedHolder>
  );
};

TagInput.displayName = 'TagInput';

export default R.compose(
  React.memo,
  linkInputs(
    {
      initialData: [],
    },
  ),
)(TagInput);
