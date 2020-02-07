function DeepClone (obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    var cpObj = obj instanceof Array ? [] : {};
    for (var key in obj) cpObj[key] = DeepClone(obj[key]);
    return cpObj;
}



export const utils = {
    DeepClone
}
