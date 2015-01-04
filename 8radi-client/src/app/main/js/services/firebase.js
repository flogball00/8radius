angular.module('8rad')
    .service('myFirebase', ['$firebase', function($firebase) {
        var ref = new Firebase("https://boiling-torch-378.firebaseio.com/");
        var sync = $firebase(ref);

    return {
        createUser: function (userID, password) {
            ref.createUser({
                email    : userID,
                password : password
            }, function(error) {
                if (error === null) {
                    console.log("User created successfully");
                } else {
                    console.log("Error creating user:", error);
                }
            });
        }
    }
}]);
