app.controller("requisicoesAprovadasController", function($scope, $http){

    // TablesDatatables.init();

    $scope.usuarios=[];

    var idUsuario = localStorage.getItem("idUsuario");

    carregarRequisicoes= function (){		
        $http({method:'GET', url:'http://18.228.37.157/reprografiaapi/geral/requisicao/listar/porstatus?idStatus=3'})
        .then(function (response){

            //requisicoes do professor
            // var filtroRequisicoes = response.data.filter(function( obj ) {
            //     return obj.professorDisciplina.professor.id == idUsuario;
            // })
            $scope.requisicoes = response.data;
            console.log(response.data);
            
            //observacao
            $.each($scope.requisicoes, function(i,d){
                $.each(d.historico, function(indx, hist){
                    $scope.requisicoes[i].observacao = hist.observacao;
                })
            })
            // TablesDatatables.init();
        } , function (response){
            alert("Nenhuma requisição foi aprovada ainda!");
            // logout();
        });
    };
    carregarRequisicoes();

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