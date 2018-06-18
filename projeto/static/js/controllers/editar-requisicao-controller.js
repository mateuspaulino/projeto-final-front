app.controller("editarRequisicaoController", function($scope, $http){

    // TablesDatatables.init();

    $scope.usuarios=[];

    var idUsuario = localStorage.getItem("idUsuario");

    carregarRequisicoes= function (){		
        $http({method:'GET', url:'http://18.228.37.157/reprografiaapi/professor/requisicao/listar'})
        .then(function (response){

            //requisicoes do professor
            var filtroRequisicoes = response.data.filter(function( obj ) {
                return obj.professorDisciplina.professor.id == idUsuario;
            })
            $scope.requisicoes = filtroRequisicoes;
            // console.log(filtroRequisicoes);
            // TablesDatatables.init();
        } , function (response){
            alert("Sessão expirada");
            logout();
        });
    };
    carregarRequisicoes();

    $scope.desativar= function(id){
        
        $http({
            method:'GET', 
            url:'http://18.228.37.157/reprografiaapi/suporte/pessoa/'+id+'/inativar',
            // data: id
        })
        .then(function (response){
            alert("Pessoa desativada com sucesso");
            carregarRequisicoes();
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
            carregarRequisicoes();
        } , function(){
            alert("Sessão expirada");
            logout();
        });
              
    }


})