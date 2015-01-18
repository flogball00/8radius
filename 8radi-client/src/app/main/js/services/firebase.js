var app = angular.module('8rad');

app.factory('fireRef', [function () {
    var ref = new Firebase(radiusConfig.firebase.host);
    return ref;
}]);

var pathRef = function(args) {
    for(var i=0; i < args.length; i++) {
        if( typeof(args[i]) === 'object' ) {
            args[i] = pathRef(args[i]);
        }
    }
    return args.join('/');
};

app.factory('gFirebaseRef', [function() {
    return function() {
        var path = pathRef([radiusConfig.firebase.host].concat(Array.prototype.slice.call(arguments)));
        return new Firebase(path);
    };
}]);

app.factory('ngFirebaseRef', ['$firebase', function($firebase) {
    return function() {
        var path = pathRef([radiusConfig.firebase.host].concat(Array.prototype.slice.call(arguments)));
        var fbRef = new Firebase(path);
        return  $firebase(fbRef);
    };
}]);


app.factory('fireAuth', ['$firebaseAuth', 'fireRef', function ($firebaseAuth, fireRef) {
    return $firebaseAuth(fireRef);
}]);


app.service('myFirebase', ['$firebase', 'fireRef', 'fireAuth', 'gFirebaseRef', 'ngFirebaseRef', '$q', function ($firebase, fireRef, fireAuth, gFirebaseRef, ngFirebaseRef, $q) {

    var ngFireSync = $firebase(fireRef);

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
        createUser: function (user) {
            return createUserAndLogin(user);
        },

        addUser: function(user){
            ngFirebaseRef('Users', user.userId).$set(user);
        },

        login: function (userObj) {
            return authWithPassword(userObj);
        },

        logout: function() {
            return fireAuth.$unauth();
        },

        getPost: function (postId, user) {
            return gFirebaseRef('Posts' , user.location.state, postId);
        },

        getOwnPosts: function (uid) {
             return ngFirebaseRef('Users', uid, 'posts').$asArray();
        },

        getCurrentUser: function(uid) {
           return gFirebaseRef('Users', uid);
        },

        getCurrentNGUser: function(uid) {
            return ngFirebaseRef('Users', uid).$asObject();
        },

        getAllUsers: function() {
            return ngFirebaseRef('Users').$asObject();
        },

        incrementPostCount: function(){
            return ngFirebaseRef('Counts', 'postCount').$transaction(function(currentValue) {
                return (currentValue||0) + 1;
            });
        },

        addPost: function(post, user) {
            return ngFirebaseRef('Posts', user.location.state ).$push(post);
        },

        addPostKey: function(key, uid) {
            return ngFirebaseRef('Users', uid, 'posts', key).$set({createdAt:Firebase.ServerValue.TIMESTAMP});
        },

        getTimestamp: function() {
            return Firebase.ServerValue.TIMESTAMP;
        }





    }
}]);



