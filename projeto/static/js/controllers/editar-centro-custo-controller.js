app.controller("editarCentroCustoController", function($scope, $http){

    // TablesDatatables.init();

    $scope.centros=[];

    carregarCentros= function (){		
        $http({method:'GET', url:'http://18.228.37.157/reprografiaapi/gerente/centrodecusto/listar'})
        .then(function (response){
            $scope.centros=response.data;
            console.log(response.data);
            // TablesDatatables.init();
        } , function (response){
            alert("Sessão expirada");
            logout();
        });
    };
    carregarCentros();


})