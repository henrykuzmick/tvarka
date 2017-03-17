angular.module('adminApp', ['servicesModule', 'ui', 'file-model', 'wysiwyg.module'])
.controller('mainAdminCtrl', ['$scope', '$firebaseAuth', '$firebaseArray', function($scope, $firebaseAuth, $firebaseArray) {
  $scope.loggedin = false;
  var ref = firebase.database().ref().child("admins");
  var admins = $firebaseArray(ref);
  ref.on('value', function(snapshot) {
    console.log(snapshot.child("QR31Dl1TdQZnVAXfeKD5fK1rNNu1").val());
  });
  $scope.login = function() {
    firebase.auth().signInWithEmailAndPassword($scope.admemail, $scope.admpassword).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
    }).then(function(){
      $scope.isAdmin();
    });
  };
  $scope.isAdmin = function() {
    if(firebase.auth()) {
      ref.on('value', function(snapshot) {
        if(snapshot.child(firebase.auth().currentUser.uid).val()) {
          $scope.loggedin = true;
          $scope.$apply();
          return true;
        } else {
          return false;
        }
      });
    } else {
      return false;
    }
  };
  $scope.signout = function(){
    firebase.auth().signOut().then(function() {
    }, function(error) {
    });
  };
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {console.log(firebase.auth().currentUser.uid);
      $scope.isAdmin();
    } else {
      $scope.signout();
    }
  });
}])
.controller('progCtrl', ['$scope', 'programaFactory', function($scope, programaFactory) {
  $scope.redPrograma = {};
  $scope.loading = false;
  programaFactory.getAllItems().$loaded(function(data){
    $scope.programa = data;
  });
  $scope.addPrograma = function() {
    $scope.loading = true;
    programaFactory.addPrograma($scope.pavadinimas, $scope.fileModel, $scope.fileModel2, $scope.aprasymas)
    .then(function(){
      $scope.loading = false;
      angular.forEach(
      angular.element("input[type='file']"),
      function(inputElem) {
        angular.element(inputElem).val(null);
      });
    });
    $scope.pavadinimas = "";
    $scope.aprasymas = "";
  };
  $scope.removePrograma = function(pr) {
    programaFactory.removePrograma(pr);
  };
  $scope.updatePrograma = function() {
    // if(typeof $scope.uploadme !== 'undefined') {
    //   $scope.redPrograma.foto = $scope.uploadme.src;
    // }
    $scope.loading = true;
    programaFactory.updatePrograma($scope.redPrograma)
    .then(function(){
      $scope.loading = false;
      angular.forEach(
      angular.element("input[type='file']"),
      function(inputElem) {
        angular.element(inputElem).val(null);
      });
      angular.element('.modal').modal('hide');
    });
  };
  $scope.redaguoti = function(pr) {
    $scope.redPrograma = pr;
  };
  $scope.customMenu = [
    ['bold', 'italic', 'underline'],
    ['format-block'],
    ['remove-format'],
    ['unordered-list'],
    ['left-justify', 'center-justify', 'right-justify'],
    ['link']
  ];
}])
.controller('vardaiCtrl', ['$scope', 'vardaiFactory', function($scope, vardaiFactory) {
  $scope.redVardas = {};
  $scope.loading = false;
  vardaiFactory.getAllItems().$loaded(function(data){
    $scope.vardai = data;
  });
  $scope.addVardas = function() {
    $scope.loading = true;
    vardaiFactory.addVardas($scope.vardas, $scope.apygarda, $scope.fileModel, $scope.biografija, $scope.facebook, 90)
    .then(function(){
      angular.forEach(
      angular.element("input[type='file']"),
      function(inputElem) {
        angular.element(inputElem).val(null);
      });
      $scope.loading = false;
    });
    $scope.vardas = "";
    $scope.apygarda = "";
    $scope.biografija = "";
    $scope.facebook = "";
  };
  $scope.removeVardas = function(vardas) {
    vardaiFactory.removeVardas(vardas);
  };
  $scope.updateVardas = function() {
    $scope.loading = true;
    vardaiFactory.updateVardas($scope.redVardas)
    .then(function(){
      angular.forEach(
      angular.element("input[type='file']"),
      function(inputElem) {
        angular.element(inputElem).val(null);
      });
      $scope.loading = false;
      angular.element('.modal').modal('hide');
    });
  };
  $scope.redaguoti = function(v) {
    $scope.redVardas = v;
  };
  $scope.customMenu = [
    ['bold', 'italic', 'underline'],
    ['format-block'],
    ['remove-format'],
    ['unordered-list'],
    ['left-justify', 'center-justify', 'right-justify'],
    ['link']
  ];
}]);
