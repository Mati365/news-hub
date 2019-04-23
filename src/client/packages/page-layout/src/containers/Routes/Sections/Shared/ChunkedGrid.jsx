import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';

const ChunkedGrid = ({
  every,
  list,
  listPropName,
  rowComponent: RowComponent,
}) => R.compose(
  R.addIndex(R.map)(
    (rowArticles, row) => (
      <RowComponent
        key={row}
        {...{
          [listPropName]: rowArticles,
        }}
      />
    ),
  ),
  R.splitEvery(every),
)(list);

ChunkedGrid.defaultProps = 'ChunkedGrid';

ChunkedGrid.propTypes = {
  every: PropTypes.number,
  list: PropTypes.arrayOf(PropTypes.any),
  listPropName: PropTypes.string,
  rowComponent: PropTypes.any.isRequired,
};

ChunkedGrid.defaultProps = {
  list: [],
  listPropName: 'list',
  every: 3,
};

export default ChunkedGrid;
