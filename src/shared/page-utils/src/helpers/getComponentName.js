const getComponentName = Component => (
  (typeof Component === 'string' && Component)
    || Component.displayName
    || Component.name
    || 'Component'
);

export const getHOCName = (hocName, Component, attrs = null) => `${hocName}${attrs ? `(${attrs})` : ''}(${getComponentName(Component)})`;

export default getComponentName;
