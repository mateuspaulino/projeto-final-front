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
      //salva o id do usuário no storage
      localStorage.setItem("idUsuario", response.data.pessoa.id);
			// console.log(response);
		} , function (response){
			console.log(response);
			
    });
  };
  dadosUsuario();
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
  .when('/cadastrar-disciplina', {
    templateUrl: '../static/view/disciplina.html',
    controller: 'disciplinaController',
  })
  .when('/editar-disciplina', {
    templateUrl: '../static/view/editar-disciplina.html',
    controller: 'editarDisciplinaController',
  })
  .when('/editar-disciplina/:disciplinaId', {
    templateUrl: '../static/view/editar-disciplina-especifico.html',
    controller: 'editarDisciplinaEspecificoController',
  })
  .when('/professor-disciplina', {
    templateUrl: '../static/view/professor-disciplina.html',
    controller: 'professorDisciplinaController',
  })
  .when('/editar-professor-disciplina/:usuarioId', {
    templateUrl: '../static/view/editar-professor-disciplina-especifico.html',
    controller: 'editarProfessorDisciplinaEspecificoController',
  })
  .when('/cadastrar-centro-de-custo', {
    templateUrl: '../static/view/centro-custo.html',
    controller: 'centroCustoController',
  })
  .when('/editar-centro-custo', {
    templateUrl: '../static/view/editar-centro-custo.html',
    controller: 'editarCentroCustoController',
  })
  .when('/editar-centro-custo/:centroId', {
    templateUrl: '../static/view/editar-centro-custo-especifico.html',
    controller: 'editarCentroCustoEspecificoController',
  })
  .when('/nova-requisicao', {
    templateUrl: '../static/view/requisicao.html',
    controller: 'requisicaoController',
  })
  .when('/editar-requisicao', {
    templateUrl: '../static/view/editar-requisicao.html',
    controller: 'editarRequisicaoController',
  })
  .when('/editar-requisicao/:requisicaoId', {
    templateUrl: '../static/view/editar-requisicao-especifico.html',
    controller: 'editarRequisicaoEspecificoController',
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
