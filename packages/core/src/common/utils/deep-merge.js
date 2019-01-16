export const deepMerge = (obj1, obj2) => {
  if (obj2 === undefined) return obj1;
  if (typeof obj1 === "object") {
    const result = {};
    Object.keys(obj1).forEach(key => {
      if (typeof obj1[key] === "object") {
        result[key] = deepMerge(obj1[key], obj2[key]);
      } else {
        result[key] = obj2[key] === undefined ? obj1[key] : obj2[key];
      }
    });
    return result;
  }
  return obj2 === undefined ? obj1 : obj2;
};
