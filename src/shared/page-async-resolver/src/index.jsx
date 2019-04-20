import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import ssr from '@shared/utils/src/helpers/ssr';
import provideContext from '@shared/utils/src/decorators/provideContext';

import {AsyncPromisesContext} from './AsyncContextProvider';

export default
@provideContext('asyncContext', AsyncPromisesContext)
class AsyncComponent extends React.Component {
  static propTypes = {
    keyValue: PropTypes.string,
    promiseFn: PropTypes.func.isRequired,
    loadingComponent: PropTypes.any,
    disableSSR: PropTypes.bool,
  };

  static defaultProps = {
    loadingComponent: R.always(null),
    keyValue: null,
    disableSSR: false,
  };

  constructor(props) {
    super(props);

    const {
      promiseFn,
      asyncContext,
      disableSSR,
    } = props;

    const uuid = asyncContext.generateUUID();
    const cacheData = asyncContext.cache && asyncContext.cache[uuid];

    if (cacheData && !disableSSR) {
      this.state = {
        loading: false,
        data: cacheData,
      };
    } else {
      this.state = {
        loading: true,
      };
    }

    if (!disableSSR && ssr && asyncContext.attachPromise)
      asyncContext.attachPromise(uuid, promiseFn());
  }

  async componentDidMount() {
    const {loading} = this.state;

    if (!ssr && loading)
      this.triggerFetch();
  }

  componentDidUpdate(prevProps) {
    const {keyValue} = this.props;
    if (prevProps.keyValue !== keyValue)
      this.triggerFetch();
  }

  triggerFetch = async () => {
    const {promiseFn} = this.props;
    const {loading} = this.state;

    if (!loading) {
      this.setState({
        loading: true,
      });
    }

    const data = await promiseFn();

    this.setState({
      loading: false,
      data,
    });
  };

  render() {
    const {
      loading,
      data,
    } = this.state;

    const {
      loadingComponent: LoadingComponent,
      children,
    } = this.props;

    if (loading)
      return <LoadingComponent />;

    return children(data) || null;
  }
}
