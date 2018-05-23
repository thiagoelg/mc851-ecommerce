const jwt = require('jsonwebtoken');

const LOCAL_STORAGE_ITEM_NAME = 'auth-token-ecommerce';

let UserProfile = (function () {
    let token = null;
    let name = null;
    let logged = false;

    let getName = function () {
        return name;
    };

    let getFirstName = function() {
        if(name) {
            return name.split(' ').slice(0, 1);
        }
    };

    let getToken = function () {
        return token;
    };

    let isLogged = function () {
        return logged;
    };

    let set = function (t) {
        token = t;

        const decoded = jwt.decode(token);
        name = decoded.name;
        logged = true;

        localStorage.setItem(LOCAL_STORAGE_ITEM_NAME, token);
    };

    let clear = function () {
        name = null;
        token = null;
        logged = false;
    };

    const savedToken = localStorage.getItem(LOCAL_STORAGE_ITEM_NAME);
    if(savedToken) {
        set(savedToken);
    }

    return {
        getName: getName,
        getFirstName: getFirstName,
        getToken: getToken,
        isLogged: isLogged,
        set: set,
        clear: clear
    }

})();

export default UserProfile;