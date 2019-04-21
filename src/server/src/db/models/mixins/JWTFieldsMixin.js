import consola from 'consola';
import crypto from 'crypto';

const JWTFieldsMixin = ({
  refreshTokenField = 'jwtRefreshToken',
  defaultExpire = 300, // 5min
  signFieldsFn,
  jwtEncoder,
  tableName,
}) => Model => class MixinWrappedModel extends Model {
  static tableName = tableName;

  /**
   * @param {Number} expiresIn Seconds
   */
  async signJWT(expiresIn = defaultExpire) {
    const payload = signFieldsFn(this);
    const token = jwtEncoder.sign(
      payload,
      {
        expiresIn,
      },
    );

    const refreshToken = crypto.randomBytes(255).toString('hex');
    await this
      .$query()
      .update(
        {
          [refreshTokenField]: refreshToken,
        },
      );

    return {
      expiresIn,
      token,
      refreshToken,
      payload,
    };
  }

  /**
   * @param {String} token Token
   */
  static async decryptJWT(token) {
    try {
      return jwtEncoder.verify(token).data;
    } catch (e) {
      consola.error(e);
    }

    return null;
  }

  static async refreshJWT(
    refreshToken,
    expiresIn = defaultExpire,
  ) {
    const user = await (
      MixinWrappedModel
        .query()
        .findOne(refreshTokenField, refreshToken)
    );

    if (!user)
      return null;

    return user.signJWT(expiresIn);
  }
};

export default JWTFieldsMixin;
