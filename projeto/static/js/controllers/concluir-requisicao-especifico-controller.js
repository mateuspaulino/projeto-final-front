app.controller("concluirRequisicaoEspecificoController", function($scope, $routeParams, $http, $location){
    $scope.requisicao = {};
    $scope.tipos = {};

    var idUsuario = localStorage.getItem("idUsuario");
    var nomeUsuario = localStorage.getItem("nomeUsuario");

    var idRequisicao = $routeParams.requisicaoId;

    console.log('controller');

    carregarRequisicao = function (){		
        $http({method:'GET', url:'http://18.228.37.157/reprografiaapi/geral/requisicao/listar/porstatus?idStatus=3'})
        .then(function (response){
            var requisicoes = response.data;
            console.log('exec');
            console.log(requisicoes);
            //filtra pelo usuário da url
            var filtro = requisicoes.filter(function( requisicao ) {
                return requisicao.id == idRequisicao;
            })
            $scope.requisicao = filtro[0];
            
            console.log(filtro);
        } , function (response){
            alert("Sessão expirada");
            logout();
        });
    };
    carregarRequisicao();

    $scope.observacao = "";

    $scope.concluir= function(id){

        if($scope.observacao == ""){
            $scope.observacao = "Reprografia imprimiu a solicitação" 
        }

        var opcao = confirm("Tem certeza que deseja concluir a requisição?\nEssa ação não poderá ser desfeita!");
        if(opcao){

            var obj = {
                "requisicao": {
                    "id":id	
                },
                "status": {
                    "id": 6
                },
                "observacao": $scope.observacao
            };
            
            $http({
                method:'POST', 
                url:'http://18.228.37.157/reprografiaapi/geral/requisicao/alterar',
                data: obj
            })
            .then(function (response){
                alert("A requisição foi concluída com sucesso!");
                $location.path("/concluir-requisicao");
            } , function(error){
                console.log('erro');
                console.log(error);
                // alert("Sessão expirada");
                // logout();
            });

        }
              
    }

})