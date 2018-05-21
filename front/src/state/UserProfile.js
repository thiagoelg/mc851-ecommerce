let UserProfile = (function () {
    let id = null;
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

    let isLogged = function () {
        return logged;
    };

    let set = function (params) {
        name = params.name;
        id = params.id;
        logged = true;
    };

    let clear = function () {
        name = null;
        id = null;
        logged = false;
    };

    return {
        getName: getName,
        getFirstName: getFirstName,
        isLogged: isLogged,
        set: set,
        clear: clear
    }

})();

export default UserProfile;