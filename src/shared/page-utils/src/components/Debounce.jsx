import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import debounce from '../helpers/async/debounce';

export default class Debounce extends React.Component {
  static propTypes = {
    delay: PropTypes.number.isRequired,
    initialInstant: PropTypes.bool,
    allowRerenders: PropTypes.bool,
  };

  static defaultProps = {
    initialInstant: false,
    allowRerenders: false,
  };

  state = {
    lockUpdate: true,
  };

  initialRender = true;

  constructor(props) {
    super(props);

    this.onUnlockRender = debounce(
      {
        delay: props.delay,
        initialInstant: props.initialInstant,
      },
      () => {
        if (this.unmounted)
          return;

        this.setState(
          {
            lockUpdate: null,
          },
        );
      },
    );
  }

  static getDerivedStateFromProps(props, state) {
    return {
      lockUpdate: state.lockUpdate || !R.isNil(state.lockUpdate),
    };
  }

  componentDidMount() {
    this.initialRender = false;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.lockUpdate)
      this.onUnlockRender();

    return nextProps.allowRerenders || !nextState.lockUpdate;
  }


  componentWillUnmount() {
    this.unmounted = true;
  }

  render() {
    const {initialRender} = this;
    const {lockUpdate} = this.state;
    const {children} = this.props;

    return children(!initialRender && lockUpdate);
  }
}
