app.controller("editarRequisicaoController", function($scope, $http){

    // TablesDatatables.init();

    $scope.usuarios=[];

    var idUsuario = localStorage.getItem("idUsuario");

    carregarRequisicoes= function (){		
        $http({method:'GET', url:'http://18.228.37.157/reprografiaapi/professor/requisicao/listar'})
        .then(function (response){

            //requisicoes do professor
            // var filtroRequisicoes = response.data.filter(function( obj ) {
            //     return obj.professorDisciplina.professor.id == idUsuario;
            // })
            $scope.requisicoes = response.data;
            $.each($scope.requisicoes, function(i,d){
                $.each(d.historico, function(indx, hist){
                    $scope.requisicoes[i].observacao = hist.observacao;
                })
            })
            console.log($scope.requisicoes);
            // TablesDatatables.init();
        } , function (response){
            alert("Nenhuma requisição aberta");
        });
    };
    carregarRequisicoes();

    $scope.baixar = function(id){

        $http({method:'GET', url:"http://18.228.37.157/reprografiaapi/professor/requisicao/anexo/"+id+""})
        .then(function (response){
            console.log('foi');
            console.log(response);
        } , function (error){
            console.log('erro');
            console.log(error);
        });

    }

    // teste
    // $http({method:'GET', url:"http://18.228.37.157/reprografiaapi/professor/requisicao/anexo/15"})
    //     .then(function (response){
    //         console.log('foi');
    //         console.log(response);
    //     } , function (error){
    //         console.log('erro');
    //         console.log(error);
    //     });
    // $http({
    //     method:'GET', 
    //     url:"http://18.228.37.157/reprografiaapi/professor/requisicao/anexo/15",
    //     data: {},
    // }).success(function (data, status, headers, config){
    //         console.log('foi');
    //         console.log(data);
    //     });
    $.ajax
    ({
      type: "GET",
      url: "http://18.228.37.157/reprografiaapi/professor/requisicao/anexo/15",
      dataType: 'json',
      async: false,
      headers: {
        "Authorization": "Bearer 3bf7a768062783751a1855990716a061"
      },
      complete: function (d){
        console.log(d);
      }
    });



    $scope.cancelar = function(id){

        var opcao = confirm("Tem certeza que deseja cancelar a requisição?\nEssa ação não poderá ser desfeita!");
        var observacao = prompt("Caso deseje, pode adicionar uma observação", "");
        if(opcao==true && observacao != null){

            if(observacao==""){
                observacao = "Professor cancelou";
            }

            var obj = {
                "requisicao": {
                    "id": parseInt(id)	
                },
                "status": {
                    "id": 5
                },
                "observacao": observacao
            };
            console.log(obj);
            $http({
                method:'POST', 
                url:'http://18.228.37.157/reprografiaapi/geral/requisicao/alterar',
                data: obj
            })
            .then(function (response){
                alert("Requisição cancelada com sucesso");
                carregarRequisicoes();
            } , function(error){
                console.log('erro');
                console.log(error);
                // alert("Sessão expirada");
                // logout();
            });

        }
        
              
    }

    $scope.enviar= function(id){

        var opcao = confirm("Tem certeza que deseja enviar a requisição?\nEssa ação não poderá ser desfeita!");
        var observacao = prompt("Caso deseje, pode adicionar uma observação", "");
        if(opcao==true && observacao != null){

            if(observacao==""){
                observacao = "Professor enviou para avaliação";
            }

            var obj = {
                "requisicao": {
                    "id":id	
                },
                "status": {
                    "id": 2
                },
                "observacao": observacao
            };
            
            $http({
                method:'POST', 
                url:'http://18.228.37.157/reprografiaapi/geral/requisicao/alterar',
                data: obj
            })
            .then(function (response){
                alert("Requisição enviada para avaliação com sucesso");
                carregarRequisicoes();
            } , function(error){
                console.log('erro');
                console.log(error);
                // alert("Sessão expirada");
                // logout();
            });

        }
              
    }


})