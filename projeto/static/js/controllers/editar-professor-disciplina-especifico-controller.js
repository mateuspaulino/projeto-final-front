app.controller("editarProfessorDisciplinaEspecificoController", function($scope, $routeParams, $http, $location){
    $scope.usuario = {};
    $scope.disciplinasUsuario = {};

    var idUsuario = $routeParams.usuarioId;

    var associar = $("#associar");
    var desassociar = $("#desassociar");
    var disciplinasDisponiveis = $("#disciplinasDisponiveis");
    var minhasDisciplinas = $("#minhasDisciplinas");

    var disciplinasUsuario = {};

    $scope.todasAssociacoes = {};


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

                    var objAssociacao = {
                        disciplina: {
                            id: parseInt(d.val())
                        },
                        professor: {
                            id: parseInt(idUsuario)
                        }
                    };

                    console.log(objAssociacao);
                    console.log(JSON.stringify(objAssociacao));

                    $http({
                        method:'POST', 
                        url:'http://18.228.37.157/reprografiaapi/suporte/professordisciplina/associar',
                        data: objAssociacao
                    })
                    .then(function (response){
                        alert("Alteração concluída com sucesso");
                        // $scope.usuario = {};
                        // redirecionar para a lista
                    } , function(){
                        // alert("Sessão expirada");
                        // logout();
                    });
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
            // console.log(d);
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

                    var filtroProfessorAssociacoes= $scope.todasAssociacoes.filter(function( obj ) {
                        return obj.professor.id == idUsuario;
                    })
                    var filtroDisciplinaDesassociar = filtroProfessorAssociacoes.filter(function( obj ) {
                        return obj.disciplina.id == parseInt(d.val());
                    })
                    // console.log('dos profesor');
                    // console.log(filtroDisciplinaDesassociar[0].id);

                    var idProfessorDisciplina = filtroDisciplinaDesassociar[0].id;

                    var objAssociacao = {
                        id: idProfessorDisciplina,
                        disciplina: {
                            id: parseInt(d.val())
                        },
                        professor: {
                            id: parseInt(idUsuario)
                        }
                    };
                    
   
                    // {
                    //     "id":2,
                    //     "disciplina":{
                    //         "id":2
                    //     },
                    //     "professor":{
                    //         "id":"2"
                    //     }
                    // }

                    console.log(JSON.stringify(objAssociacao));

                    $http({
                        method:'POST', 
                        url:'http://18.228.37.157/reprografiaapi/suporte/professordisciplina/desassociar',
                        data: objAssociacao
                    })
                    .then(function (response){
                        alert("Alteração concluída com sucesso");
                        // $scope.usuario = {};
                        // redirecionar para a lista
                    } , function(error){
                        alert("Você não pode desassociar uma disciplina que já faz parte de uma requisição");
                        console.log('erro');
                        console.log(error);
                        // alert("Sessão expirada");
                        // logout();
                    });

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
            if(!$scope.usuario.disciplinas){
                $scope.usuario.disciplinas = [];
            }
            disciplinasUsuario= $scope.usuario.disciplinas;
            $scope.disciplinasUsuario = $scope.usuario.disciplinas;
            // console.log(disciplinasUsuario);
            carregarDisciplina(disciplinasUsuario);
            // console.log(disciplinasUsuario);
        } , function (response){
            // alert("Sessão expirada");
            // logout();
        });

        $http({method:'GET', url:'http://18.228.37.157/reprografiaapi/suporte/professordisciplina/listar'})
        .then(function (response){
            var disciplinasProfessores = response.data;
            $scope.todasAssociacoes  = response.data;
            console.log(disciplinasProfessores);
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
            //se tiver disicplinas
            if(disciplinasUsuario) {
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
            }else{
                //usuario nao tem nenhuma disciplina
                //mostra todas
                $scope.disciplinas = response.data;
            }

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

    $scope.alterar= function(){
        
        // delete $scope.usuario.perfil.nome;
        // delete $scope.usuario.perfil.descricao;
        // delete $scope.usuario.salvo;
        // delete $scope.usuario.naoSalvo;
        // console.table($scope.usuario);

        //monta objeto disciplina-professor
        // var objDisciplinasProfessorFinal = [];
        // $.each($scope.usuario.disciplinas, function(i,d){
        //     console.log(d);
        //     objDisciplinasProfessorFinal.push({
        //         "disciplina":{
        //             id:d.id
        //         },
        //         "professor":{
        //             id:parseInt(idUsuario)
        //         }
        //     })
        // })
        // console.log(JSON.stringify(objDisciplinasProfessorFinal));

        // $http({
        //     method:'POST', 
        //     url:'http://18.228.37.157/reprografiaapi/suporte/professordisciplina/associar',
        //     data: objDisciplinasProfessorFinal
        // })
        // .then(function (response){
        //     alert("Alteração concluída com sucesso");
        //     // $scope.usuario = {};
        //     // redirecionar para a lista
        // } , function(){
        //     alert("Sessão expirada");
        //     logout();
        // });
              
    }


})