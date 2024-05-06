export const isNumeric = (str) => {
    return /^\d+$/.test(str);
};

export const toSnakeCase = (obj) => {
    const newObj = {};
    for (const key in obj) {
        const newKey = key.replace(/([A-Z])/g, (match) => `_${match.toLowerCase()}`);
        newObj[newKey] = obj[key];
    }
    return newObj;
}