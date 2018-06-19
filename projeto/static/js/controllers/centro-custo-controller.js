app.controller("centroCustoController", function($scope, $http){

    // Initialize Datepicker
    $('.input-datepicker, .input-daterange').datepicker({
        // weekStart: 1,
        format: 'dd/mm/yyyy',
        locale: 'pt-br'
    });
    
    $scope.custo = {};

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
        $scope.custo.dataInicio = $("#dataInicio").val();
        $scope.custo.dataFim = $("#dataFim").val();

        //Convertendo em novas datas 
        var dtUmComp = new Date($scope.custo.dataInicio.replace(/(\d{2})\/(\d{2})\/(\d{4})/,'$2/$1/$3')); 
        var dtDoisComp = new Date($scope.custo.dataFim.replace(/(\d{2})\/(\d{2})\/(\d{4})/,'$2/$1/$3')); 
        //Exemplo de comparação de datas 
        if(dtUmComp > dtDoisComp){
            alert('A data de início não pode ser após a data de término')
        }else{
            $http({
                method:'POST', 
                url:'http://18.228.37.157/reprografiaapi/gerente/centrodecusto/cadastrar',
                data: $scope.custo
            })
            .then(function (response){
                alert("custo cadastrado com sucesso");
                $scope.custo = {};
                carregarCusto();
            } , function(){
                alert("Periodo já existente ou sessão expirada");
            });
        }

        // console.log(JSON.stringify($scope.custo));
        // if($scope.custo.ativo==="true"){
        //     $scope.custo.ativo = true;
        // }else{
        //     $scope.custo.ativo = false;
        // }
        // $scope.custo.tipoPessoa = "normal";
        // $scope.custo.perfil.id = parseInt( $scope.custo.perfil.id);
        
              
    }


})