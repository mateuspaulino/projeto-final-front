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
            console.log(filtro);
        } , function (response){
            alert("Sessão expirada");
            logout();
        });
    };
    carregarRequisicao();

    $scope.observacao = "";

    $scope.aprovar= function(id){

        if($scope.observacao == ""){
            $scope.observacao = "Coordenador aprovou a requisição" 
        }

        var opcao = confirm("Tem certeza que deseja aprovar a requisição?\nEssa ação não poderá ser desfeita!");
        if(opcao){

            var obj = {
                "requisicao": {
                    "id":id	
                },
                "status": {
                    "id": 3
                },
                "observacao": $scope.observacao
            };
            
            $http({
                method:'POST', 
                url:'http://18.228.37.157/reprografiaapi/geral/requisicao/alterar',
                data: obj
            })
            .then(function (response){
                alert("A requisição foi enviada para a reprografia!");
                $location.path("/aprovar-requisicao");
            } , function(error){
                console.log('erro');
                console.log(error);
                // alert("Sessão expirada");
                // logout();
            });

        }
              
    }

    $scope.recusar= function(id){

        if($scope.observacao == ""){
            $scope.observacao = "Coordenador devolveu a requisição" 
        }

        var opcao = confirm("Tem certeza que deseja recusar a requisição?");
        if(opcao){

            var obj = {
                "requisicao": {
                    "id":id	
                },
                "status": {
                    "id": 1
                },
                "observacao": $scope.observacao
            };
            
            $http({
                method:'POST', 
                url:'http://18.228.37.157/reprografiaapi/geral/requisicao/alterar',
                data: obj
            })
            .then(function (response){
                alert("A requisição foi devolvida para o professor!");
                $location.path("/aprovar-requisicao");
            } , function(error){
                console.log('erro');
                console.log(error);
                // alert("Sessão expirada");
                // logout();
            });

        }
              
    }

})