import {Model} from 'objection';

import * as USER_PERMISSIONS from './constants/userPermissions';
import * as pageJWT from '../../helpers/pageJWT';
import JWTFieldsMixin from './mixins/JWTFieldsMixin';

export default
class User extends JWTFieldsMixin(
  {
    tableName: 'Users',
    jwtEncoder: pageJWT,
    signFieldsFn: user => ({
      id: user.id,
      permissionLevel: user.permissionLevel,
    }),
  },
)(Model) {
  static jsonSchema = {
    type: 'object',
    required: [],

    properties: {
      id: {type: 'string'},
      permissionLevel: {type: 'integer'},
      jwtRefreshToken: {type: 'string'},
    },
  };

  static insertAnonymousUser() {
    return User
      .query()
      .insert(
        {
          permissionLevel: USER_PERMISSIONS.ANONYMOUS,
        },
      );
  }
}
