// Criação do módulo principal da aplicação
var app = angular.module('app', ['ngRoute']);

function verificaLogin(){
  var token = localStorage.getItem('userToken');

  if(token=="" || !token || token=="undefinec"){
    window.location.href = './login.html';
    // console.log('logout');
  }
}

//chamada quando o usuário clica em sair
function logout(){
  localStorage.clear();
  window.location.href = './login.html';
}

app.controller("appController", function($scope, $http){
  verificaLogin();

  //exibe o nome do usuário na home
  $scope.nome = localStorage.getItem("nomeUsuario");
  //mostra o menu de acordo com o que tá no HTML
  $scope.checarPermissoes = function(tipo) {
    var permitido;
    var tipoUsuario = localStorage.getItem("tipoUsuario");
   
    // verifica se o menu aparece para mais de um tipo ou não
    if(tipo.indexOf(',')!==-1){
      tipo = tipo.split(',');
    }else{
      tipo = [tipo];
    }
    for(var x=0;x<tipo.length;x++){
       //Verifica se o tipo que vem do servidor tem algum texto do tipo que tá no usuário
      if (tipoUsuario.indexOf(tipo[x]) !== -1) {
        //se conter palavras parecidas, exibe o menu
        permitido = true;
      }
    }
    return permitido;
  }

  dadosUsuario= function (){
		token = localStorage.getItem("userToken");
		
		$http({method:'GET', url:'http://18.228.37.157/reprografiaapi/seguranca/usuario/logado'})
		.then(function (response){
      // $scope.usuario=response.data;
			console.log(response);
		} , function (response){
			console.log(response);
			
    });
  };
  // dadosUsuario();
})

app.config(function($routeProvider) {
  $routeProvider
  .when('/cadastrar-usuario', {
    templateUrl: '../static/view/usuario.html',
    controller: 'usuarioController',
  })
  .when('/editar-usuario', {
    templateUrl: '../static/view/editar-usuario.html',
    controller: 'editarUsuarioController',
  })
  .when('/editar-usuario/:usuarioId', {
    templateUrl: '../static/view/editar-usuario-especifico.html',
    controller: 'editarUsuarioEspecificoController',
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
