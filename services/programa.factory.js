angular.module('servicesModule')
.factory('programaFactory', ['$firebaseArray', function($firebaseArray){
  var programaFactory = {};
  var ref = firebase.database().ref().child("programa");
  var storageRef = firebase.storage().ref();
  var programa = $firebaseArray(ref);
  var makeid = function()
  {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for( var i=0; i < 10; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
  };
  programaFactory.addPrograma = function(p, f, f2, a) {
    return storageRef.child('images/' + makeid() + f.name).put(f).then(function(snapshot) {
      var url = snapshot.metadata.downloadURLs[0];
      storageRef.child('pdf/' + makeid() + f2.name).put(f2).then(function(snapshot2) {
        var url2 = snapshot2.metadata.downloadURLs[0];
        programa.$add({
          pavadinimas: p,
          foto: url,
          pdf: url2,
          aprasymas: a
        });
      });
    });
  };
  programaFactory.removePrograma = function(pr) {
    if (confirm('Ar tikrai')) {
      programa.$remove(pr);
    }
  };
  programaFactory.updatePrograma = function(pr) {
    return new Promise(function(resolve, reject) {
      if(typeof pr.fileModel !== 'undefined') {
        storageRef.child('images/' + makeid() +  pr.fileModel.name).put(pr.fileModel).then(function(snapshot) {
          pr.foto = snapshot.metadata.downloadURLs[0];
          if(typeof pr.fileModel2 !== 'undefined') {
            storageRef.child('pdf/' + makeid() +  pr.fileModel2.name).put(pr.fileModel2).then(function(snapshot2) {
              pr.pdf = snapshot2.metadata.downloadURLs[0];
              programa.$save(pr).then(
                resolve()
              );
            });
          } else {
            programa.$save(pr).then(
              resolve()
            );
          }
        });
      } else {
        if(typeof pr.fileModel2 !== 'undefined') {
          storageRef.child('pdf/' + makeid() +  pr.fileModel2.name).put(pr.fileModel2).then(function(snapshot2) {
            pr.pdf = snapshot2.metadata.downloadURLs[0];
            programa.$save(pr).then(
              resolve()
            );
          });
        } else {
          programa.$save(pr).then(
            resolve()
          );
        }
      }
    });
  };
  programaFactory.getAllItems = function() {
    return programa;
  };

  return programaFactory;
}]);
