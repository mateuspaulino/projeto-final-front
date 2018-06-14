app.controller("professorDisciplinaController", function($scope, $http){

    // TablesDatatables.init();

    $scope.usuarios=[];

    var professores = [];

    carregarUsuarios= function (){		
        $http({method:'GET', url:'http://18.228.37.157/reprografiaapi/suporte/pessoa/listar'})
        .then(function (response){

            var geral = response.data;
            geral.map(function(d, i) {
                if(d.perfil.nome==="Perfil Professor"){
                    professores.push(d);
                }
            });
            $scope.usuarios=professores;

        } , function (response){
            alert("Sessão expirada");
            logout();
        });
    };
    carregarUsuarios();

})