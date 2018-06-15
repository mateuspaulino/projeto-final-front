app.controller("centroCustoController", function($scope, $http){

    // Initialize Datepicker
    $('.input-datepicker, .input-daterange').datepicker({
        weekStart: 1,
        format: 'dd/mm/yyyy',
        locale: 'pt-br'
    });
    
    $scope.disciplina = {};

    carregarCusto= function (){		
        $http({method:'GET', url:'http://18.228.37.157/reprografiaapi/gerente/centrodecusto/listar'})
        .then(function (response){
            console.log(response.data);
            // TablesDatatables.init();
        } , function (response){
        });
    };
    carregarCusto();

    $scope.cadastrar= function(){
        // vou usar o que já tme no banco e depois faço o cadastro

        // console.log($scope.disciplina);
        // console.log(JSON.stringify($scope.disciplina));
        // if($scope.disciplina.ativo==="true"){
        //     $scope.disciplina.ativo = true;
        // }else{
        //     $scope.disciplina.ativo = false;
        // }
        // // $scope.disciplina.tipoPessoa = "normal";
        // // $scope.disciplina.perfil.id = parseInt( $scope.disciplina.perfil.id);
        // $http({
        //     method:'POST', 
        //     url:'http://18.228.37.157/reprografiaapi/gerente/centrodecusto/listar',
        //     data: $scope.disciplina
        // })
        // .then(function (response){
        //     alert("Disciplina cadastrada com sucesso");
        //     $scope.disciplina = {};
        //     carregarDisciplinas();
        // } , function(){
        //     alert("Disciplina já existente ou sessão expirada");
        // });
              
    }


})