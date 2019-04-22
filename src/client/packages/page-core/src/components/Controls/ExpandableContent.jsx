import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {
  Margin,
  IconText,
} from '@utils/components';

import ChevronIcon from '@icons/ChevronIcon';
import TextButton from './TextButton';

export const ExpandableIconText = ({expanded, onToggle, ...props}) => (
  <TextButton
    wrapped={false}
    onClick={onToggle}
  >
    <IconText
      {...props}
      icon={(
        <ChevronIcon
          style={{
            height: '1em',
            transition: 'transform 250ms ease-in-out',
            ...!expanded && {
              transform: 'rotateZ(180deg)',
            },
          }}
        />
      )}
      {...props}
    />
  </TextButton>
);

const ExpandableContent = ({initialExpanded, triggerRenderFn, children}) => {
  const [expanded, setExpanded] = useState(initialExpanded);

  return (
    <>
      {triggerRenderFn(
        {
          expanded,
          setExpanded,
          toggleExpanded: () => {
            setExpanded(!expanded);
          },
        },
      )}
      {expanded && children && (
        <Margin
          top={2}
          block
          style={{
            width: '100%',
          }}
        >
          {children()}
        </Margin>
      )}
    </>
  );
};

ExpandableContent.displayName = 'ExpandableContent';

ExpandableContent.propTypes = {
  initialExpanded: PropTypes.bool,
  triggerRenderFn: PropTypes.func,
};

ExpandableContent.defaultProps = {
  initialExpanded: true,
  triggerRenderFn: ({expanded, toggleExpanded}) => (
    <ExpandableIconText
      expaned={expanded}
      onToggle={toggleExpanded}
    />
  ),
};

export default ExpandableContent;
