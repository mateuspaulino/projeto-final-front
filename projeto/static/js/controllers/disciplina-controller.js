app.controller("disciplinaController", function($scope, $http){
    $scope.disciplina = {};

    carregarDisciplinas= function (){		
        $http({method:'GET', url:'http://18.228.37.157/reprografiaapi/suporte/disciplina/listar'})
        .then(function (response){
            console.log(response.data);
            // TablesDatatables.init();
        } , function (response){
        });
    };
    carregarDisciplinas();

    $scope.cadastrar= function(){
        
        console.log($scope.disciplina);
        console.log(JSON.stringify($scope.disciplina));
        if($scope.disciplina.ativo==="true"){
            $scope.disciplina.ativo = true;
        }else{
            $scope.disciplina.ativo = false;
        }
        // $scope.disciplina.tipoPessoa = "normal";
        // $scope.disciplina.perfil.id = parseInt( $scope.disciplina.perfil.id);
        $http({
            method:'POST', 
            url:'http://18.228.37.157/reprografiaapi/suporte/disciplina/cadastrar',
            data: $scope.disciplina
        })
        .then(function (response){
            alert("Disciplina cadastrada com sucesso");
            $scope.disciplina = {};
            carregarDisciplinas();
        } , function(){
            alert("Disciplina já existente ou sessão expirada");
        });
              
    }


})