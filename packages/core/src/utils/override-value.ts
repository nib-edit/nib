import { KeyValue } from '../types/common';

/**
 * The function will override values in first object,
 * with the corresponding value if present in second object.
 */
const overrideValue = (obj1: any, obj2: any) => {
  if (obj2 === undefined) return obj1;
  const result: KeyValue = {};
  Object.keys(obj1).forEach((key) => {
    if (typeof obj1[key] === 'object') {
      result[key] = overrideValue(obj1[key], obj2[key]);
    } else {
      result[key] = obj2[key] === undefined ? obj1[key] : obj2[key];
    }
  });
  return result;
};

export default overrideValue;
