var app = angular.module('8rad');

app.factory("fireRef", [function () {
    var ref = new Firebase(radiusConfig.firebase.host);
    return ref;
}]);

app.service('myFirebase', ['$firebase', 'fireRef', '$q', function ($firebase, fireRef, $q) {

    var sync = $firebase(fireRef);

    // Handle Email/Password login
    // returns a promise
    function authWithPassword(userObj) {
        var deferred = $q.defer();
        fireRef.authWithPassword(userObj, function onAuth(err, user) {
            if (err)
            {
                deferred.reject(err);
            }

            if (user)
            {
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }

    // create a user but not login
    // returns a promsie
    function createUser(userObj) {
        var deferred = $q.defer();
        fireRef.createUser(userObj, function (err) {
            console.log('err', err);
            if (!err)
            {
                deferred.resolve();
            } else
            {
                deferred.reject(err);
            }
        });

        return deferred.promise;
    }

    // Create a user and then login in
    // returns a promise
    function createUserAndLogin(userObj) {
        return createUser(userObj)
            .then(function () {
                return authWithPassword(userObj);
            });
    }

    return {
        createUser: function (userObj) {
            return createUserAndLogin(userObj);
        },

        login: function (userObj) {
            return authWithPassword(userObj);
        },

        getPostings: function () {
            return 'mikes test postings';
        }
    }
}]);


app.factory('fireAuth', ['$firebaseAuth', 'fireRef', function ($firebaseAuth, fireRef) {
    return fireRef.getAuth();
}]);

