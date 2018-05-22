// Criação do módulo principal da aplicação
var app = angular.module('app', ['ngRoute']);

// .controller('MainController', function($scope, $route, $routeParams, $location) {
//     $scope.$route = $route;
//     $scope.$location = $location;
//     $scope.$routeParams = $routeParams;
// })

// .controller('BookController', function($scope, $routeParams) {
//     $scope.name = 'BookController';
//     $scope.params = $routeParams;
// })

// .controller('ChapterController', function($scope, $routeParams) {
//     $scope.name = 'ChapterController';
//     $scope.params = $routeParams;
// })

// app.config(function($routeProvider) {
//     $routeProvider
//     .when('/usuario', {
//         templateUrl: 'usuario.html',
//         controller: 'usuarioController',
//     })
//     .otherwise({redirectTo:"/"});
// })


function verificaLogin(){
  var token = localStorage.getItem('userToken');

  if(token=="" || !token || token=="undefinec"){
    window.location.href = './login.html';
  }
}

function logout(){
  localStorage.clear();
  window.location.href = './login.html';
}

app.controller("appController", function($scope){
  verificaLogin();
  $scope.verificarPermissoes = function(tipo) {
    console.log("checou");
    var permitido;
    var tipoUsuario = $window.localStorage.getItem("tipoUsuario");
    if (tipo === tipoUsuario) {
      permitido = true;
    }
  
    return permitido;
  }
})

app.config(function($routeProvider) {
  $routeProvider
   .when('/usuario', {
    templateUrl: '../static/view/usuario.html',
    controller: 'usuarioController',
  })
  .when('/', {
    templateUrl: '../static/view/home.html',
    controller: '',
  })
  .when('/home', {
    redirectTo: '/'
  })
  // .otherwise({
  //   redirectTo: '/'
  // });   
});

// app.config(function($httpProvider){
//   $httpProvider.interceptors.push('tokenInterceptor');
// });

//  // configure html5 to get links working on jsfiddle
//  $locationProvider.html5Mode(true);
// });

// app.controller("indexController", function($scope, $http){

//     $scope.nome = "Mateus";

//     $scope.posts = [];

//     $scope.carregarPosts = function(){
//         $http({
//             method: 'GET',
//             url: 'https://jsonplaceholder.typicode.com/posts/'
//         }).then(function successCallback(response) {
//             console.log(response.data);
//             console.log(response.status);
//             $scope.posts = response.data;
//         }, function errorCallback(response) {
//             console.log(response.data);
//             console.log(response.status);
//         });
//     }

//     $scope.carregarPosts();

//     $scope.post = {};

//     $scope.salvarPost = function(){
//         $http({
//             method: 'POST',
//             url: 'https://jsonplaceholder.typicode.com/posts/',
//             data: $scope.post
//         }).then(function successCallback(response) {
//             console.log(response.data);
//             // console.log(response.status);
//             $scope.posts = response.data;

//             $scope.carregarPosts();
//         }, function errorCallback(response) {
//             console.log(response.data);
//             // console.log(response.status);
//         });
//     }

   

// })