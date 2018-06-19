app.controller("relatorioDisciplinaController", function($scope, $http){

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

    $scope.disciplinas = {};
    $http({method:'GET', url:'http://18.228.37.157/reprografiaapi/suporte/disciplina/listar'})
    .then(function (response){
        $scope.disciplinas = response.data;
        console.log(response.data);
    } , function (response){
        console.log(response);
    });


    $scope.disciplinaSelecionada = "";

    $scope.custoMensal = {};

    $scope.gerarRelatorio = function(disciplinaSelecionada){
        if(disciplinaSelecionada!==""){
            disciplinaSelecionada = parseInt(disciplinaSelecionada);
            //gera relatorio
            console.log("http://18.228.37.157/reprografiaapi/diretor/relatorio/custopordisciplina?idDisciplina="+disciplinaSelecionada);
            $http({
                method:'GET', url:"http://18.228.37.157/reprografiaapi/diretor/relatorio/custopordisciplina?idDisciplina="+disciplinaSelecionada,
            })
            .then(function (response){
                console.log(response.data);
                $scope.relatorioDisciplinas = response.data;
            } , function (error){
                console.log('erro');
                console.log(error);
                $scope.relatorioDisciplinas = {};
                alert("Nenhum resultado para essa disciplina");
            });
        }else{
            alert("Selecione uma disciplina");
        }

    }

})