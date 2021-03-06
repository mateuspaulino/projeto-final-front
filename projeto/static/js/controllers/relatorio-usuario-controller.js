app.controller("relatorioUsuarioController", function($scope, $http){

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

    $scope.usuarios = {};
    $http({method:'GET', url:'http://18.228.37.157/reprografiaapi/suporte/professor/listar'})
    .then(function (response){
        $scope.usuarios = response.data;
        console.log(response.data);
    } , function (response){
        console.log(response);
    });


    $scope.professorSelecionado = "";

    $scope.custoMensal = {};

    $scope.gerarRelatorio = function(professorSelecionado){
        if(professorSelecionado!==""){
            professorSelecionado = parseInt(professorSelecionado);
            //gera relatorio
            $http({
                method:'GET', url:"http://18.228.37.157/reprografiaapi/gerente/relatorio/custoporprofessor?idProfessor="+professorSelecionado,
            })
            .then(function (response){
                console.log(response.data);
                $scope.relatorioProfessor = response.data;
            } , function (error){
                console.log('erro');
                console.log(error);
                $scope.relatorioProfessor = {};
                alert("Nenhum resultado para esse professor");
            });
        }else{
            alert("Selecione um professor");
        }

    }

})