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

    
    // Pegar relacao professor-disciplina, para depois enviar na requisicao o id

    $scope.associacaoProfessorDisciplina = {};

    $http({method:'GET', url:'http://18.228.37.157/reprografiaapi/professor/professordisciplina/listarporprofessor'})
    .then(function (response){
        var disciplinasProfessores = response.data;
        $scope.associacaoProfessorDisciplina = response.data;
        console.log(disciplinasProfessores);
    } , function (response){
        // alert("Sessão expirada");
        // logout();
    });

    $scope.alterar= function(){
        
        $scope.requisicao.duplex = $scope.requisicao.duplex==="true"?true:false;
        $scope.requisicao.colorida = $scope.requisicao.colorida==="true"?true:false;
        $scope.requisicao.grampeada = $scope.requisicao.grampeada==="true"?true:false;

        //pega id professor disciplina

        var filtroProfessorAssociacoes= $scope.associacaoProfessorDisciplina.filter(function( obj ) {
            return obj.disciplina.id == $scope.disciplinaSelecionada;
        })
        // console.log('dos profesor');
        // console.log(filtroProfessorAssociacoes[0].id);

        $scope.requisicao.professorDisciplina = {id:filtroProfessorAssociacoes[0].id};

        var objAlterar = {
            "id": $scope.requisicao.id,
            "duplex":  $scope.requisicao.duplex,
            "grampeada":  $scope.requisicao.grampeada,
            "colorida":  $scope.requisicao.colorida,
            "numeroDePaginas":  $scope.requisicao.numeroDePaginas,
            "numeroDeCopias":  $scope.requisicao.numeroDeCopias,
            "professorDisciplina": {
                "id": filtroProfessorAssociacoes[0].id
            }
        };

        var arquivo = $scope.arquivo;
        console.log('arquivo');
        console.log(arquivo);
        var fd = new FormData();
        fd.append('arquivo-part', arquivo);
        // "professorDisciplina": {"id":1}

        // fd.append('file',file);
        // fd.append('meta-part',angular.toJson($scope.requisicao));
        // fd.append('meta-part',JSON.stringify($scope.requisicao));
        fd.append('meta-part',JSON.stringify(objAlterar));

        // console.log($scope.requisicao);
        // console.log(JSON.stringify($scope.requisicao));
        console.log(objAlterar);
        console.log(JSON.stringify(objAlterar));

        // $scope.usuario.tipoPessoa = "normal";
        

        $http({
            method : 'POST',
            url : 'http://18.228.37.157/reprografiaapi/professor/requisicao/alterar',
            headers : {
                'Content-Type' : undefined
            },
            transformRequest : function(data) {
                var formData = new FormData();
                formData.append('meta-part', new Blob([ angular.toJson(objAlterar) ], {
                    type : "application/json"
                }));
                formData.append("arquivo-part", arquivo);
                return formData;
            },
            data : {
                meta_part : objAlterar,
                imagem_part : arquivo
            }
        }).then(function(response) {
            alert("Requisição alterada com sucesso");
            $location.path("/editar-requisicao");
        }, function(response) {
            alert(response);
            console.log('erro');
            console.log(response);
        });
              
    }


})