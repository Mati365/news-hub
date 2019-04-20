/**
 * Express doesnt support async, use catch method
 *
 * @param {Function} fn
 */
const wrapAsyncRoute = fn => (req, res, next) => fn(req, res, next).catch(next);

export default wrapAsyncRoute;
