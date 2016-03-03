// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
  .service('scrayping',["$q", function($q) {

      // 初期化・エントリ用defer
      var process_defer;
      var ref;

      // 初期化
      var start = function(url, disp){
        process_defer = $q.defer();
        var features = disp ? 'location=yes,enableViewportScale=yes' : 'hidden=yes';
        ref = window.open(url, '_blank', features);
        ref.addEventListener("loadstop",loadStop);
        return process_defer.promise;
      };

      // エントリ
      var exe = function(code, isParse){
        process_defer = $q.defer();
        if(isParse){
          ref.executeScript(code,function(result){
            console.log("parse result",result);
            process_defer.resolve(result);
          });
        }else{
          ref.executeScript(code,function(){}); // HACK: 取り敢えず
        }
        return process_defer.promise;
      };

      // loadstop時
      var loadStop = function(e){
        process_defer.resolve(e);
      };
      this.login = function login() {
        var defer = $q.defer(); // 非同期のprocessを確保
        start("http://www.yahoo.co.jp/", false)
          .then(function () {
            console.log("parse");
            return exe(get_parse_title(), true);
          })
          .then(function (result) {
            console.log("finish");
            finish(result);
          })

        // parse用のtitle取得
        function get_parse_title(){
          var code = {};
          code["code"] = '(function(){var ret={href:document.location.hostname,title:document.title};return ret}())';
          return code;
        }

        // 終了
        function finish(a){
          console.log(a[0]);
          alert(JSON.stringify(a[0]));
          defer.resolve(a[0]);
        }
        console.log("return promise");
        return defer.promise;
      };

    }]
  ).controller('PassCtrl', function($scope,$http,scrayping) {
  var ref = null;
  var item = null;
  $scope.login = function () {
    console.log("\nmove");
    $scope.a = "moveing";
    scrayping.login().then(function (a) {
      console.log("success");
      $scope.a = JSON.stringify(a);
      $scope.$apply();
    }).catch(function (e) { // rejected
      console.log("rejected");
      $scope.a = JSON.stringify(e);
      $scope.$apply();
    });
    console.log("move final");

  }
});

