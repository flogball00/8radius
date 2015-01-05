var app = angular.module('8rad');

app.factory("fireRef", [function() {
    var ref = new Firebase(radiusConfig.firebase.host);
    return ref;
}]);

app.service('myFirebase', ['$firebase', 'fireRef', function($firebase, fireRef) {

    var sync = $firebase(fireRef);

    return {
        createUser: function (userID, password) {
            fireRef.createUser({
                email    : userID,
                password : password
            }, function(error) {
                if (error === null) {
                    console.log("User created successfully");
                } else {
                    console.log("Error creating user:", error);
                }
            });
        },
        login: function(userId, password) {
            fireRef.authWithPassword({
                email    : userId,
                password : password
            }, function(error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    console.log("Authenticated successfully with payload:", authData);
                }
            });
        }
    }
}]);


app.factory('fireAuth', ['$firebaseAuth','fireRef', function($firebaseAuth, fireRef) {

    return $firebaseAuth(fireRef);
}]);

