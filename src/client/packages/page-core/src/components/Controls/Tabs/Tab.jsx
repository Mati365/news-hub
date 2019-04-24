import React from 'react';
import PropTypes from 'prop-types';

import styled from '@jss';
import createBreakpoints from '@utils/styles/createBreakpoints';

import {
  WHITE,
  NAV_TAB_TEXT,
  NAV_TAB_INACTIVE_BORDER,
} from '@constants/colorSchema';

const TabHolder = styled.li(
  {
    base: {
      padding: [10, 16],
      marginBottom: -1,
      fontWeight: 500,
      fontSize: '1.0rem',
      color: NAV_TAB_TEXT,
      border: `0 solid ${NAV_TAB_INACTIVE_BORDER}`,
      transition: 'border-color 250ms ease-in-out',
      cursor: 'pointer',
    },

    active: {
      border: `1px solid ${NAV_TAB_INACTIVE_BORDER}`,
      borderBottom: `1px solid ${WHITE}`,
      fontWeight: 600,
    },
  },
  {
    omitProps: ['active'],
    classSelector: (classes, {active}) => active && classes.active,
  },
);

const Tab = ({title, active, onClick}) => (
  <TabHolder
    active={active}
    onClick={onClick}
  >
    {title}
  </TabHolder>
);

Tab.displayName = 'Tab';

Tab.propTypes = {
  title: PropTypes.node,
  active: PropTypes.bool,
};

Tab.defaultProps = {
  title: null,
  active: false,
};

export const TabContent = styled.div(
  createBreakpoints(
    {
      xs: {
        paddingTop: 15,
      },

      md: {
        padding: [20, 16],
      },
    },
  ),
);

export default Tab;
