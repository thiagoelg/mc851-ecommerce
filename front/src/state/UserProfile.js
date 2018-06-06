import {cart} from "../cart/Cart";

const jwt = require('jsonwebtoken');

const LOCAL_STORAGE_ITEM_NAME = 'auth-token-ecommerce';

let UserProfile = (function () {
    let token = null;
    let id = null;
    let name = null;
    let email = null;
    let cpf = null;
    let logged = false;

    let getId = function() {
        return id;
    };

    let getName = function () {
        return name;
    };

    let getFirstName = function() {
        if(name) {
            return name.split(' ').slice(0, 1);
        }
    };

    let getEmail = function() {
        return email;
    };

    let getCpf = function() {
        return cpf;
    };

    let getToken = function () {
        if(isLogged()) {
            return token;
        }
    };

    let isLogged = function () {
        return logged;
    };

    let getAuthHeader = function () {
        let headers = {};
        if(isLogged()) {
            headers["x-auth-token"] = token;
        }

        return headers;
    };

    let set = function (t) {
        token = t;

        const decoded = jwt.decode(token);
        id = decoded.cid;
        name = decoded.name;
        email = decoded.email;
        cpf = decoded.cpf;
        logged = true;

        localStorage.setItem(LOCAL_STORAGE_ITEM_NAME, token);
    };

    let clear = function () {
        id = null;
        name = null;
        email = null;
        cpf = null;
        token = null;
        logged = false;
        localStorage.removeItem(LOCAL_STORAGE_ITEM_NAME);
        cart.clear();
    };

    const savedToken = localStorage.getItem(LOCAL_STORAGE_ITEM_NAME);
    if(savedToken) {
        set(savedToken);
    }

    return {
        getId: getId,
        getName: getName,
        getFirstName: getFirstName,
        getEmail: getEmail,
        getCpf: getCpf,
        getToken: getToken,
        isLogged: isLogged,
        getAuthHeader: getAuthHeader,
        set: set,
        clear: clear
    }

})();

export default UserProfile;