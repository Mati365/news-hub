import Cookies from 'js-cookie';
import ssr from '@shared/utils/src/helpers/ssr';

class UniversalCookiesAccessor {
  constructor({ssr: {req, res}} = {}) {
    // undefined on client
    this.req = req;
    this.res = res;

    Object.assign(
      this,
      this.handlers[ssr ? 'server' : 'client'],
    );
  }

  handlers = {
    server: {
      get: name => this.req.cookies[name],
      set: (name, value, params) => {
        this.res.cookies(
          name,
          value,
          params,
        );
      },
    },

    client: {
      get: ::Cookies.get,
      set: ::Cookies.set,
    },
  };
}

export default UniversalCookiesAccessor;
