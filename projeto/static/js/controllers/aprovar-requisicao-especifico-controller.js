app.controller("aprovarRequisicaoEspecificoController", function($scope, $routeParams, $http, $location){
    $scope.requisicao = {};
    $scope.tipos = {};

    var idUsuario = localStorage.getItem("idUsuario");
    var nomeUsuario = localStorage.getItem("nomeUsuario");

    var idRequisicao = $routeParams.requisicaoId;

    carregarRequisicao = function (){		
        $http({method:'GET', url:'http://18.228.37.157/reprografiaapi/geral/requisicao/listar/porstatus?idStatus=2'})
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
    carregarRequisicao();

    //disciplinas do professor
    // $scope.disciplinasProfessor= {};
    // $scope.disciplinaSelecionada = {};

    // dadosUsuario = function (){
		
	// 	$http({method:'GET', url:'http://18.228.37.157/reprografiaapi/seguranca/usuario/logado'})
	// 	.then(function (response){
    //             $scope.disciplinasProfessor=response.data.pessoa.disciplinas;
    //         } , function (response){
    //             console.log(response);
    //     });

    // };
    // dadosUsuario();

    
    // Pegar relacao professor-disciplina, para depois enviar na requisicao o id

    // $scope.associacaoProfessorDisciplina = {};

    // $http({method:'GET', url:'http://18.228.37.157/reprografiaapi/professor/professordisciplina/listarporprofessor'})
    // .then(function (response){
    //     var disciplinasProfessores = response.data;
    //     $scope.associacaoProfessorDisciplina = response.data;
    //     console.log(disciplinasProfessores);
    // } , function (response){
    //     // alert("Sessão expirada");
    //     // logout();
    // });

})