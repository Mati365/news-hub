import {ADMIN} from '@db/models/constants/userPermissions';
import {getLocalUserInfo} from './authJWTUserMiddleware';

const authJWTGuard = ({
  levels = [],
  checkLevelFn,
}) => (req, res, next) => {
  const userInfo = getLocalUserInfo(res);

  if (!userInfo
      || (checkLevelFn && !checkLevelFn(userInfo))
      || !levels.includes(userInfo.permissionLevel)) {
    res
      .status(401)
      .json(
        {
          error: 'Unauthorized',
        },
      );
  } else
    next();
};

export const adminOnlyGuard = authJWTGuard(
  {
    lavels: [ADMIN],
  },
);

export default authJWTGuard;
