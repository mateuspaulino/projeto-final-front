app.controller("editarDisciplinaController", function($scope, $http){

    // TablesDatatables.init();

    $scope.disciplinas=[];

    carregarDisciplina= function (){		
        $http({method:'GET', url:'http://18.228.37.157/reprografiaapi/suporte/disciplina/listar'})
        .then(function (response){
            $scope.disciplinas=response.data;
            console.log(response.data);
            // TablesDatatables.init();
        } , function (response){
            alert("Sessão expirada");
            logout();
        });
    };
    carregarDisciplina();

    $scope.desativar= function(id){
        
        $http({
            method:'GET', 
            url:'http://18.228.37.157/reprografiaapi/suporte/pessoa/'+id+'/inativar',
            // data: id
        })
        .then(function (response){
            alert("Pessoa desativada com sucesso");
            carregarDisciplina();
        } , function(){
            alert("Sessão expirada");
            logout();
        });
              
    }

    $scope.ativar= function(id){
        
        $http({
            method:'GET', 
            url:'http://18.228.37.157/reprografiaapi/suporte/pessoa/'+id+'/ativar',
            // data: id
        })
        .then(function (response){
            alert("Pessoa ativada com sucesso");
            carregarDisciplina();
        } , function(){
            alert("Sessão expirada");
            logout();
        });
              
    }


})