// eslint-disable-next-line import/prefer-default-export
export const deepCopy = obj => {
  return JSON.parse(JSON.stringify(obj))
}
