app.controller("editarUsuarioController", function($scope, $http){

    // TablesDatatables.init();

    $scope.usuarios=[];

    carregarUsuarios= function (){		
        $http({method:'GET', url:'http://18.228.37.157/reprografiaapi/suporte/pessoa/listar'})
        .then(function (response){
            $scope.usuarios=response.data;
            console.log(response.data);
            // TablesDatatables.init();
        } , function (response){
            alert("Sessão expirada");
            logout();
        });
    };
    carregarUsuarios();

    $scope.desativar= function(id){
        
        $http({
            method:'GET', 
            url:'http://18.228.37.157/reprografiaapi/suporte/pessoa/'+id+'/inativar',
            // data: id
        })
        .then(function (response){
            alert("Pessoa desativada com sucesso");
            carregarUsuarios();
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
            carregarUsuarios();
        } , function(){
            alert("Sessão expirada");
            logout();
        });
              
    }


})