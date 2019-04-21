import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {NAV_TAB_INACTIVE_BORDER} from '@constants/colorSchema';
import {DIRECTION_SCHEMA} from '@constants/typeSchema';
import * as DIRECTIONS from '@constants/directions';

import styled from '@jss';
import Tab, {TabContent} from './Tab';

const TabsHolder = styled.div(
  {
    width: '100%',
  },
);

const TabsToolbar = styled.ul(
  {
    base: {
      display: 'flex',
      margin: 0,
      padding: 0,
      alignItems: 'flex-start',
      justifyContent: 'center',
      listStyleType: 'none',
      borderBottom: `1px solid ${NAV_TAB_INACTIVE_BORDER}`,
    },

    [DIRECTIONS.LEFT]: {
      justifyContent: 'flex-start',
    },

    [DIRECTIONS.CENTER]: {
      justifyContent: 'center',
    },

    [DIRECTIONS.RIGHT]: {
      justifyContent: 'flex-end',
    },
  },
  {
    omitProps: ['direction'],
    classSelector: (classes, {direction}) => classes[direction],
  },
);

const Tabs = ({children, toolbarDirection, defaultActiveTab}) => {
  const [activeTab, setActiveTab] = useState(
    defaultActiveTab || children[0].props.id,
  );

  const activeTabElement = (
    React.Children
      .toArray(children)
      .find(child => child.props.id === activeTab)
  ) || children[0];

  return (
    <TabsHolder>
      <TabsToolbar direction={toolbarDirection}>
        {React.Children.map(
          children,
          (child) => {
            const {id} = child.props;

            return React.cloneElement(
              child,
              {
                active: activeTab === id,
                onClick: () => setActiveTab(id),
              },
            );
          },
        )}
      </TabsToolbar>

      <TabContent>
        {activeTabElement?.props.children}
      </TabContent>
    </TabsHolder>
  );
};

Tabs.propTypes = {
  toolbarDirection: DIRECTION_SCHEMA,
  defaultActiveTab: PropTypes.string,
};

Tabs.defaultProps = {
  toolbarDirection: DIRECTIONS.LEFT,
  defaultActiveTab: null,
};

// export
const MemoizedTabs = React.memo(Tabs);

MemoizedTabs.Tab = Tab;

export default MemoizedTabs;
