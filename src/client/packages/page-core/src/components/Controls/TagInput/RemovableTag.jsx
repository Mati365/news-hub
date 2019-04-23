import React, {useState} from 'react';
import PropTypes from 'prop-types';

import styled from '@jss';

import {KEY_ITEM_PAIR} from '@constants/typeSchema';
import {LIGHT_GRAY} from '@constants/colorSchema';

import TimesIcon from '@icons/TimesIcon';
import Input from '../Input';

const TagHolder = styled.li(
  {
    display: 'inline-flex !important',
    flexDirection: 'row !important',
    alignItems: 'center !important',

    border: `1px solid ${LIGHT_GRAY}`,
    margin: '2px !important',
    padding: '4px 6px !important',

    userSelect: 'none',
  },
  {
    index: 2,
  },
);

const TagRemoveIcon = styled(
  TimesIcon,
  {
    width: 16,
    height: '100%',
    marginRight: 5,

    color: 'rgba(0, 0, 0, 0.16)',
    cursor: 'pointer',

    transition: 'color 250ms ease-in-out',

    '&:hover': {
      color: 'rgba(0, 0, 0, 0.4)',
    },
  },
);

const TagTitle = styled.span(
  {
    cursor: 'text',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
);

const ClickUpdateTitle = ({wrapperComponent: Component = 'span', value, onChange}) => {
  const [editing, setEditing] = useState(false);

  if (!editing) {
    return (
      <Component onClick={() => setEditing(true)}>
        {value}
      </Component>
    );
  }

  return (
    <Input
      small
      defaultValue={value}
      innerRef={
        (ref) => {
          if (ref)
            ref.focus();
        }
      }
      onKeyDown={
        (e) => {
          // enter
          if (e.keyCode !== 13)
            return;

          e.preventDefault();
          onChange(e.target.value);
        }
      }
      onBlur={
        (e) => {
          const {value: newValue} = e.target;

          if (newValue !== value)
            onChange(e.target.value);
          setEditing(false);
        }
      }
    />
  );
};

const RemovableTag = ({tag, onRemove, onChange}) => (
  <TagHolder>
    <TagRemoveIcon onClick={() => onRemove(tag)} />
    <ClickUpdateTitle
      value={tag.name}
      wrapperComponent={TagTitle}
      onChange={
        value => onChange(
          tag,
          {
            id: value, // remove old tag
            name: value,
          },
        )
      }
    />
  </TagHolder>
);

RemovableTag.displayName = 'RemovableTag';

RemovableTag.propTypes = {
  tag: KEY_ITEM_PAIR.isRequired,
  onRemove: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default React.memo(RemovableTag);
