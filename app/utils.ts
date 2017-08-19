function parseJSONObject(obj) {
  return Object.keys(obj).reduce((newObj, objKey) => {
    const value = obj[objKey];
    newObj[objKey] = !isNaN(+value) ? +value : value
    return newObj;
  }, {});
}

function parseJSONList(list) {
  return list.reduce((newList, listObj) => {
    return newList.concat(parseJSONObject(listObj));
  }, []);
} 

export {
  parseJSONObject,
  parseJSONList
}