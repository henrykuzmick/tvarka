angular.module('servicesModule')
.factory('vardaiFactory', ['$firebaseArray', function($firebaseArray){
  var vardaiFactory = {};
  var ref = firebase.database().ref().child("vardai");
  var storageRef = firebase.storage().ref();
  var vardai = $firebaseArray(ref);
  var makeid = function()
  {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for( var i=0; i < 10; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
  };
  vardaiFactory.addVardas = function(p, a, f, b, fb, i) {
    return storageRef.child('images/' + makeid() + f.name).put(f).then(function(snapshot) {
      var url = snapshot.metadata.downloadURLs[0];
      vardai.$add({
        vardas: p,
        apygarda: a,
        foto: url,
        biografija: b,
        facebook: fb,
        id: i
      });
    });
  };
  vardaiFactory.removeVardas = function(vardas) {
    if (confirm('Ar tikrai')) {
      vardai.$remove(vardas);
    }
  };
  vardaiFactory.updateVardas = function(v) {
    return new Promise(function(resolve, reject) {
      if(typeof v.fileModel !== 'undefined') {
        storageRef.child('images/' + makeid() +  v.fileModel.name).put(v.fileModel).then(function(snapshot) {
          v.foto = snapshot.metadata.downloadURLs[0];
          vardai.$save(v).then(
            resolve()
          );
        });
      } else {
        vardai.$save(v).then(
          resolve()
        );
      }
    });
  };
  vardaiFactory.getAllItems = function() {
    return vardai;
  };
  return vardaiFactory;
}]);
