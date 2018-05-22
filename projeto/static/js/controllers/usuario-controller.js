app.controller("usuarioController", function($scope, $http){
    $scope.usuario = {};
    $scope.tipos = {};
    $http({method:'GET', url:'http://18.228.37.157/reprografiaapi/suporte/perfil/listar'})
    .then(function (response){
        $scope.tipos = response.data;
        // console.log(response.data);
    } , function (response){
        // console.log(response);
    });

    $scope.cadastrar= function(){
        
        console.log($scope.usuario);
        console.log(JSON.stringify($scope.usuario));
        if($scope.usuario.ativo==="true"){
            $scope.usuario.ativo = true;
        }else{
            $scope.usuario.ativo = false;
        }
        $scope.usuario.tipoPessoa = "normal";
        $scope.usuario.perfil.id = parseInt( $scope.usuario.perfil.id);
        $http({
            method:'POST', 
            url:'http://18.228.37.157/reprografiaapi/suporte/pessoa/cadastrar',
            data: $scope.usuario
        })
        .then(function (response){
            console.log(response);
        } , function (response){
            console.log(response);
        });
              
    }


})