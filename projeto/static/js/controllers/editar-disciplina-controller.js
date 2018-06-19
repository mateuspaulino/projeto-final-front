app.controller("editarDisciplinaController", function($scope, $http){

    // TablesDatatables.init();

    $scope.disciplinas=[];
    $scope.disciplinas.listaProfessores = {};

    carregarDisciplina= function (){		
        $http({method:'GET', url:'http://18.228.37.157/reprografiaapi/suporte/disciplina/listar'})
        .then(function (response){
            $scope.disciplinas=response.data;
            // cria uma string com os professores da disciplina
            $.each($scope.disciplinas,function(i,d){
                var str = "";
                $.each($scope.disciplinas[i].professores,function(x,d){
                    
                    if(x >= 1){
                        str = str +" , "+ d.nome;
                    }else{
                        str = str +""+ d.nome;
                    }
                })
                if(str===""){
                    str = "Nenhum professor";
                }
                $scope.disciplinas[i].strProfessores = str;
            })
            
        } , function (response){
            alert("Sessão expirada");
            logout();
        });
    };
    carregarDisciplina();


    $scope.desativar= function(id){
        
        $http({
            method:'GET', 
            url:'http://18.228.37.157/reprografiaapi/suporte/disciplina/'+id+'/inativar',
            // data: id
        })
        .then(function (response){
            alert("Disciplina desativada com sucesso");
            carregarDisciplina();
        } , function(){
            alert("Sessão expirada");
            logout();
        });
              
    }

    $scope.ativar= function(id){
        
        $http({
            method:'GET', 
            url:'http://18.228.37.157/reprografiaapi/suporte/disciplina/'+id+'/ativar',
            // data: id
        })
        .then(function (response){
            alert("Disciplina ativada com sucesso");
            carregarDisciplina();
        } , function(){
            alert("Sessão expirada");
            logout();
        });
              
    }


})