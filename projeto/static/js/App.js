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
    // console.log('logout');
  }
  // console.log('ok');
}

function checarPermissoes(tipo) {
  console.log("checou");
  var permitido;
  var tipoUsuario = $window.localStorage.getItem("tipoUsuario");
  if (tipo === tipoUsuario) {
    permitido = true;
  }

  return permitido;
}

function logout(){
  localStorage.clear();
  window.location.href = './login.html';
}



app.controller("appController", function($scope, $http){
  verificaLogin();

  $scope.nome = localStorage.getItem("nomeUsuario");

  $scope.checarPermissoes = function(tipo) {
    // console.log("checou");
    var permitido;
    var tipoUsuario = localStorage.getItem("tipoUsuario");
    if (tipo === tipoUsuario) {
      permitido = true;
    }
  
    return permitido;
  }

  carregarUsuario= function (){
		token = localStorage.getItem("userToken");
		//$http.defaults.headers.common.Authorization = 'Bearer '+ token;
		
		$http({method:'GET', url:'http://18.228.37.157/reprografiaapi/seguranca/usuario/logado'})
		.then(function (response){
      // $scope.clientes=response.data;
      console.log('funcionou');
			console.log(response.data);
		} , function (response){
      console.log('erro');
			console.log(response);
			// console.log(response.status);
			
    });

    // var req = {
    //   // "async": true,
    //   // "crossDomain": true,
    //   "url": "http://18.228.37.157/reprografiaapi/seguranca/usuario/logado",
    //   "method": "GET",
    //   "headers": {
    //     Authorization: 'Bearer ' + localStorage.getItem("userToken"),
    //   }
    // }
    // console.log('Bearer ' + localStorage.getItem("userToken"));

    // $.ajax(req).done(function (response) {
    //   console.log(response);
    // }).fail(function(response) {
    //   console.log(response);
    // })
    
  };
  
  carregarUsuario();
  
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

app.config (function($httpProvider){
	$httpProvider.interceptors.push("tokenInterceptor");
});

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