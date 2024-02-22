export const pick = <T extends AnyObject>(object: T, keys: Array<keyof T>) => {
  return keys.reduce((obj: T, key: keyof T) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {} as T);
};

export const omit = <T extends AnyObject>(object: T, keys: Array<keyof T>) => {
  const keysHashMap = new Set(keys);
  return Object.keys(object).reduce((obj: T, key: keyof T) => {
    if (!keysHashMap.has(key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {} as T);
};
