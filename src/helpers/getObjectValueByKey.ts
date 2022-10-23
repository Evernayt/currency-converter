const getObjectValueByKey = (obj: object, key: string): any => {
  let value = null;
  Object.entries(obj).find(([objKey, objValue]) => {
    if (objKey === key) {
      value = objValue;
    }
  });
  return value;
};

export default getObjectValueByKey;
