app.controller("editarProfessorDisciplinaEspecificoController", function($scope, $routeParams, $http, $location){
    $scope.usuario = {};
    $scope.disciplinasUsuario = {};

    var idUsuario = $routeParams.usuarioId;

    var associar = $("#associar");
    var desassociar = $("#desassociar");
    var disciplinasDisponiveis = $("#disciplinasDisponiveis");
    var minhasDisciplinas = $("#minhasDisciplinas");

    var disciplinasUsuario = {};


    associar.click(function() {
        //adiciona selecionados
        minhasDisciplinas.blur();
        disciplinasDisponiveis.blur();
        var selecionado = disciplinasDisponiveis.find('option:selected');
        $.each(selecionado,function(i,d){
            d = $(d);
            if(d.text()!==""){
                // $scope.usuario.disciplina
                $scope.$apply(function() {
                    $scope.usuario.disciplinas.push({
                        ativo: d.data('ativo'),
                        descricao: d.data('descricao'),
                        id: parseInt(d.val()),
                        segmento: d.data('segmento'),
                        serie: d.data('serie')
                    })

                    //remove do array de disciplinas disponíveis
                    // console.log($scope.disciplinas);
                    var index = $scope.disciplinas.map(function(e) { return e.id; }).indexOf(parseInt(d.val()));
                    // $scope.$apply(function() {
                        $scope.disciplinas.splice(index,1);
                    // });
                });
            }
        })

    });

    desassociar.click(function() {
        minhasDisciplinas.blur();
        disciplinasDisponiveis.blur();
        //adiciona selecionados
        var selecionado = minhasDisciplinas.find('option:selected');
        $.each(selecionado,function(i,d){
            console.log(d);
            d = $(d);
            if(d.text()!==""){
                // $scope.usuario.disciplina
                $scope.$apply(function() {
                    $scope.disciplinas.push({
                        ativo: d.data('ativo'),
                        descricao: d.data('descricao'),
                        id: parseInt(d.val()),
                        segmento: d.data('segmento'),
                        serie: d.data('serie')
                    })
                    //remove do array de minhas disciplinas
                    var index = $scope.usuario.disciplinas.map(function(e) { return e.id; }).indexOf(parseInt(d.val()));
                    $scope.usuario.disciplinas.splice(index,1);
                });
            }
        })
    });

    $scope.disciplinasUsuario=[];
    
    carregarClientes= function (){		
        $http({method:'GET', url:'http://18.228.37.157/reprografiaapi/suporte/pessoa/listar'})
        .then(function (response){
            var usuarios = response.data;
            //filtra pelo usuário da url
            var filtro = usuarios.filter(function( usuario ) {
                return usuario.id == idUsuario;
            })
            $scope.usuario = filtro[0];
            disciplinasUsuario= $scope.usuario.disciplinas;
            $scope.disciplinasUsuario = $scope.usuario.disciplinas;
            carregarDisciplina(disciplinasUsuario);
            // console.table(disciplinasUsuario);
        } , function (response){
            // alert("Sessão expirada");
            // logout();
        });
    };
    carregarClientes();

    $scope.disciplinas=[];



    carregarDisciplina = function (disciplinasUsuario){	
        var disciplinas = [];	
        $http({method:'GET', url:'http://18.228.37.157/reprografiaapi/suporte/disciplina/listar'})
        .then(function (response){
            // itera todas disciplinas
            // console.log(response);
            var achou = false;
            $.each(response.data,function(i,disciplinaGeral){
                // console.log(disciplinaGeral);
                //itera disciplinas do usuário pra ver se já foi associada, se foi não adiciona na lista
                $.each(disciplinasUsuario,function(i,disciplinaUsuario){
                    // console.log(disciplinaGeral.id +" "+disciplinaUsuario.id )
                    if(disciplinaGeral.id==disciplinaUsuario.id){
                        achou=true;
                    }
                })
                if(achou==false){
                    $scope.disciplinas.push(disciplinaGeral);
                }
                achou = false;
            })

            //monta caixas

            // console.log('disciplinas')
            // console.table($scope.disciplinas);
            
        } , function (response){
            // alert("Sessão expirada");
            // logout();
        });
    };
    


    $scope.tipos = {};
    $scope.tipoSelecionado = {};

    // $http({method:'GET', url:'http://18.228.37.157/reprografiaapi/suporte/perfil/listar'})
    // .then(function (response){
    //     $scope.tipos = response.data;
    //     // console.log(response.data);
    // } , function (response){
    //     // console.log(response);
    // });

    // $scope.alterar= function(){
        
    //     if($scope.usuario.ativo==="true"){
    //         $scope.usuario.ativo = true;
    //     }else{
    //         $scope.usuario.ativo = false;
    //     }
    //     $scope.usuario.tipoPessoa = "normal";
    //     $scope.usuario.perfil.id = parseInt($scope.tipoSelecionado);

    //     delete $scope.usuario.perfil.nome;
    //     delete $scope.usuario.perfil.descricao;
    //     delete $scope.usuario.salvo;
    //     delete $scope.usuario.naoSalvo;
    //     console.table($scope.usuario);

    //     $http({
    //         method:'POST', 
    //         url:'http://18.228.37.157/reprografiaapi/suporte/pessoa/alterar',
    //         data: $scope.usuario
    //     })
    //     .then(function (response){
    //         alert("Usuário alterado com sucesso");
    //         // $scope.usuario = {};
    //         // redirecionar para a lista
    //         $location.path("/editar-usuario");
    //     } , function(){
    //         alert("Sessão expirada");
    //         logout();
    //     });
              
    // }


})