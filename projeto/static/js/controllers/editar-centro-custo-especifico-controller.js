app.controller("editarCentroCustoEspecificoController", function($scope, $routeParams, $http, $location){
    $scope.custo = {};

    var idCentro = $routeParams.centroId;

     // Initialize Datepicker
     $('.input-datepicker, .input-daterange').datepicker({
        // weekStart: 1,
        format: 'dd/mm/yyyy',
        locale: 'pt-br'
    });

    carregarCentros= function (){		
        $http({method:'GET', url:'http://18.228.37.157/reprografiaapi/gerente/centrodecusto/listar'})
        .then(function (response){
            var centros = response.data;
            //filtra pelo usuário da url
            var filtro = centros.filter(function( centro ) {
                return centro.id == idCentro;
            })
            $scope.custo = filtro[0];
            console.log($scope.custo);
        } , function (response){
            alert("Sessão expirada");
            logout();
        });
    };
    carregarCentros();

    $scope.alterar= function(){
        
        // delete $scope.disciplina.naoSalvo;
        // console.table($scope.disciplina);

        $scope.custo.dataInicio = $("#dataInicio").val();
        $scope.custo.dataFim = $("#dataFim").val();

        $http({
            method:'POST', 
            url:'http://18.228.37.157/reprografiaapi/gerente/centrodecusto/alterar',
            data: $scope.custo
        })
        .then(function (response){
            alert("Centro de custo alterado com sucesso");
            // $scope.disciplina = {};
            // redirecionar para a lista
            $location.path("/editar-centro-custo");
        } , function(){
            alert("Sessão expirada");
            logout();
        });
              
    }


})