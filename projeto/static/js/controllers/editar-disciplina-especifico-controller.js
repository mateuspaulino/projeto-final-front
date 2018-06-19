app.controller("editarDisciplinaEspecificoController", function($scope, $routeParams, $http, $location){
    $scope.disciplina = {};

    var idDisciplina = $routeParams.disciplinaId;

    carregarDisciplinas= function (){		
        $http({method:'GET', url:'http://18.228.37.157/reprografiaapi/suporte/disciplina/listar'})
        .then(function (response){
            var disciplinas = response.data;
            //filtra pelo usuário da url
            var filtro = disciplinas.filter(function( disciplina ) {
                return disciplina.id == idDisciplina;
            })
            $scope.disciplina = filtro[0];
            // console.log($scope.disciplina);
        } , function (response){
            alert("Sessão expirada");
            logout();
        });
    };
    carregarDisciplinas();

    $scope.alterar= function(){
        
        if($scope.disciplina.ativo==="true"){
            $scope.disciplina.ativo = true;
        }else{
            $scope.disciplina.ativo = false;
        }

        delete $scope.disciplina.professores;
        // delete $scope.disciplina.naoSalvo;
        // console.table($scope.disciplina);

        $http({
            method:'POST', 
            url:'http://18.228.37.157/reprografiaapi/suporte/disciplina/alterar',
            data: $scope.disciplina
        })
        .then(function (response){
            alert("Disciplina alterada com sucesso");
            // $scope.disciplina = {};
            // redirecionar para a lista
            $location.path("/editar-disciplina");
        } , function(){
            alert("Sessão expirada");
            logout();
        });
              
    }


})