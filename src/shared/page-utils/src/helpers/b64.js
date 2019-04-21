export const decodeB64 = str => (
  typeof atob === 'undefined'
    ? Buffer.from(str, 'base64').toString('binary')
    : atob(str)
);

export const encodeB64 = str => (
  typeof btoa === 'undefined'
    ? Buffer.from(str, 'binary').toString('base64')
    : btoa(str)
);
