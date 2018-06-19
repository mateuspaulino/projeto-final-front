app.controller("mapaRequisicaoController", function($scope, $http){

    // TablesDatatables.init();

    $scope.usuarios=[];

    var idUsuario = localStorage.getItem("idUsuario");

    carregarRequisicoes= function (){		
        $http({method:'GET', url:'http://18.228.37.157/reprografiaapi/geral/requisicao/listar/porstatus?idStatus=6'})
        .then(function (response){

            $scope.requisicoes = response.data;
            // console.log(response.data);
            
            //observacao
            $.each($scope.requisicoes, function(i,d){
                $.each(d.historico, function(indx, hist){
                    $scope.requisicoes[i].observacao = hist.observacao;
                })
            })
            // TablesDatatables.init();
        } , function (response){
            alert("Nenhuma requisição!");
            // logout();
        });
    };
    carregarRequisicoes();

    

    $http({
        method:'GET', url:"http://18.228.37.157/reprografiaapi/geral/requisicao/obter?id=14",
    })
    .then(function (response){
       console.log(response);

    } , function (error){
        console.log('erro');
        console.log(error);
    });

    $scope.baixar = function(id, nomeArq){

        $http({
            method:'GET', url:"http://18.228.37.157/reprografiaapi/professor/requisicao/anexo/"+id,
            responseType: "arraybuffer"
        })
        .then(function (data, status, headers, config){
            baixaArquivo(data, nomeArq);
    
        } , function (error){
            console.log('erro');
            console.log(error);
        });

    }


})