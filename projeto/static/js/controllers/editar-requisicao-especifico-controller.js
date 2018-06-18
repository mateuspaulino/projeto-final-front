app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

app.controller("editarRequisicaoEspecificoController", function($scope, $routeParams, $http, $location){
    $scope.requisicao = {};
    $scope.tipos = {};

    var idUsuario = localStorage.getItem("idUsuario");
    var nomeUsuario = localStorage.getItem("nomeUsuario");

    var idRequisicao = $routeParams.requisicaoId;

    carregarRequisicoes= function (){		
        $http({method:'GET', url:'http://18.228.37.157/reprografiaapi/professor/requisicao/listar'})
        .then(function (response){
            var requisicoes = response.data;
            //filtra pelo usuário da url
            var filtro = requisicoes.filter(function( requisicao ) {
                return requisicao.id == idRequisicao;
            })
            $scope.requisicao = filtro[0];
            //converte para string para marcar as opces no forumario, já que sao strings lá
            $scope.requisicao.duplex = $scope.requisicao.duplex===true?"true":"false";
            $scope.requisicao.colorida = $scope.requisicao.colorida===true?"true":"false";
            $scope.requisicao.grampeada = $scope.requisicao.grampeada===true?"true":"false";
            console.log(filtro);
        } , function (response){
            alert("Sessão expirada");
            logout();
        });
    };
    carregarRequisicoes();

    //disciplinas do professor
    $scope.disciplinasProfessor= {};
    $scope.disciplinaSelecionada = {};

    dadosUsuario = function (){
		
		$http({method:'GET', url:'http://18.228.37.157/reprografiaapi/seguranca/usuario/logado'})
		.then(function (response){
                $scope.disciplinasProfessor=response.data.pessoa.disciplinas;
            } , function (response){
                console.log(response);
        });

    };
    dadosUsuario();

    // $scope.tipos = {};
    // $scope.tipoSelecionado = {};

    // $http({method:'GET', url:'http://18.228.37.157/reprografiaapi/suporte/perfil/listar'})
    // .then(function (response){
    //     $scope.tipos = response.data;
    //     // console.log(response.data);
    // } , function (response){
    //     // console.log(response);
    // });

    $scope.alterar= function(){
        
        if($scope.usuario.ativo==="true"){
            $scope.usuario.ativo = true;
        }else{
            $scope.usuario.ativo = false;
        }
        $scope.usuario.tipoPessoa = "normal";
        $scope.usuario.perfil.id = parseInt($scope.tipoSelecionado);

        delete $scope.usuario.perfil.nome;
        delete $scope.usuario.perfil.descricao;
        delete $scope.usuario.salvo;
        delete $scope.usuario.naoSalvo;
        console.table($scope.usuario);

        $http({
            method:'POST', 
            url:'http://18.228.37.157/reprografiaapi/suporte/pessoa/alterar',
            data: $scope.usuario
        })
        .then(function (response){
            alert("Usuário alterado com sucesso");
            // $scope.usuario = {};
            // redirecionar para a lista
            $location.path("/editar-usuario");
        } , function(){
            alert("Sessão expirada");
            logout();
        });
              
    }


})