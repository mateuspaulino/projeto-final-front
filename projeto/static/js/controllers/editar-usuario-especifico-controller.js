app.controller("editarUsuarioEspecificoController", function($scope, $routeParams, $http, $location){
    $scope.usuario = {};

    var idUsuario = $routeParams.usuarioId;

    carregarClientes= function (){		
        $http({method:'GET', url:'http://18.228.37.157/reprografiaapi/suporte/pessoa/listar'})
        .then(function (response){
            var usuarios = response.data;
            //filtra pelo usuário da url
            var filtro = usuarios.filter(function( usuario ) {
                return usuario.id == idUsuario;
            })
            $scope.usuario = filtro[0];
            // console.log($scope.usuario);
        } , function (response){
            alert("Sessão expirada");
            logout();
        });
    };
    carregarClientes();

    $scope.tipos = {};
    $scope.tipoSelecionado = {};

    $http({method:'GET', url:'http://18.228.37.157/reprografiaapi/suporte/perfil/listar'})
    .then(function (response){
        $scope.tipos = response.data;
        // console.log(response.data);
    } , function (response){
        // console.log(response);
    });

    $scope.alterar= function(){
        
        if($scope.usuario.ativo==="true"){
            $scope.usuario.ativo = true;
        }else{
            $scope.usuario.ativo = false;
        }
        $scope.usuario.tipoPessoa = "normal";
        $scope.usuario.perfil.id = parseInt($scope.tipoSelecionado);

        delete $scope.usuario.perfil.nome;
        delete $scope.usuario.perfil.descricao;
        delete $scope.usuario.salvo;
        delete $scope.usuario.naoSalvo;
        console.table($scope.usuario);

        $http({
            method:'POST', 
            url:'http://18.228.37.157/reprografiaapi/suporte/pessoa/alterar',
            data: $scope.usuario
        })
        .then(function (response){
            alert("Usuário alterado com sucesso");
            // $scope.usuario = {};
            // redirecionar para a lista
            $location.path("/editar-usuario");
        } , function(){
            alert("Sessão expirada");
            logout();
        });
              
    }


})