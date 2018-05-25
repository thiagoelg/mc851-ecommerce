export const toObject = (addressAsString) => {
    if(!addressAsString) {
        return;
    }
    return JSON.parse(addressAsString);
};

export const toString = (address) => {
    if(!address) {
        return;
    }
    return JSON.stringify(address);
};

export default {
    toObject,
    toString
}