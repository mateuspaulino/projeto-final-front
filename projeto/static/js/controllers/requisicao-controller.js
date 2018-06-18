app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

app.controller("requisicaoController", function($scope, $http){
    
    $scope.requisicao = {};
    $scope.tipos = {};

    var idUsuario = localStorage.getItem("idUsuario");
    var nomeUsuario = localStorage.getItem("nomeUsuario");

    // var now = new Date();
    // var dia = Number(now.getDay()) - 1;
    // console.log(now.getDay());
    // var mes = now.getMonth();
    // dia = dia < 10 ? "0"+dia : dia;
    // mes = mes < 10 ? "0"+mes : mes;
    // var dataHoje = dia+"/"+mes+"/"+now.getFullYear();
    // document.getElementById("data_abertura").value = dataHoje;

    // "professorDisciplina": {"id":1} 
    $scope.disciplinasProfessor= {};
    $scope.disciplinaSelecionada = {};

    dadosUsuario = function (){
		token = localStorage.getItem("userToken");
		
		$http({method:'GET', url:'http://18.228.37.157/reprografiaapi/seguranca/usuario/logado'})
		.then(function (response){
                $scope.disciplinasProfessor=response.data.pessoa.disciplinas;
                // console.log($scope.disciplinasProfessor);
            } , function (response){
                console.log(response);
                
        });

    //     $http({method:'GET', url:'http://18.228.37.157/reprografiaapi/professor/requisicao/anexo/15'})
    // .then(function (response){
    //     var disciplinasProfessores = response.data;
    //     console.log('foi');
    //     console.log(disciplinasProfessores);
    //     // console.table(disciplinasUsuario);
    // } , function (error){
    //     console.log('nao foi');
    //     console.log(error)
    //     // alert("Sessão expirada");
    //     // logout();
    // });

    };
    dadosUsuario();

    $scope.associacaoProfessorDisciplina = {};

    $http({method:'GET', url:'http://18.228.37.157/reprografiaapi/professor/professordisciplina/listarporprofessor'})
    .then(function (response){
        var disciplinasProfessores = response.data;
        $scope.associacaoProfessorDisciplina = response.data;
        console.log(disciplinasProfessores);
        // console.table(disciplinasUsuario);
    } , function (response){
        // alert("Sessão expirada");
        // logout();
    });

    // $http({method:'GET', url:'http://18.228.37.157/reprografiaapi/professor/requisicao/anexo/15'})
    // .then(function (response){
    //     var disciplinasProfessores = response.data;
    //     console.log(disciplinasProfessores);
    //     // console.table(disciplinasUsuario);
    // } , function (response){
    //     // alert("Sessão expirada");
    //     // logout();
    // });

    // $http({method:'GET', url:'http://18.228.37.157/reprografiaapi/suporte/perfil/listar'})
    // .then(function (response){
    //     $scope.tipos = response.data;
    //     // console.log(response.data);
    // } , function (response){
    //     // console.log(response);
    // });
    
    $scope.arquivo = {};
    $scope.cadastrar= function(){
        
        // console.log($scope.requisicao);
        // console.log(JSON.stringify($scope.requisicao));
        $scope.requisicao.duplex = $scope.requisicao.duplex==="true"?true:false;
        $scope.requisicao.colorida = $scope.requisicao.colorida==="true"?true:false;
        $scope.requisicao.grampeada = $scope.requisicao.grampeada==="true"?true:false;

        //pega id professor disciplina

        var filtroProfessorAssociacoes= $scope.associacaoProfessorDisciplina.filter(function( obj ) {
            return obj.disciplina.id == $scope.disciplinaSelecionada;
        })
        // console.log('dos profesor');
        // console.log(filtroProfessorAssociacoes[0].id);

        $scope.requisicao.professorDisciplina = {id:filtroProfessorAssociacoes[0].id};

        var arquivo = $scope.arquivo;
        console.log('arquivo');
        console.log(arquivo);
        var fd = new FormData();
        fd.append('arquivo-part', arquivo);
        // "professorDisciplina": {"id":1}

        // fd.append('file',file);
        // fd.append('meta-part',angular.toJson($scope.requisicao));
        fd.append('meta-part',JSON.stringify($scope.requisicao));

        console.log($scope.requisicao);
        console.log(JSON.stringify($scope.requisicao));

        // $scope.usuario.tipoPessoa = "normal";
        

        $http({
            method : 'POST',
            url : 'http://18.228.37.157/reprografiaapi/professor/requisicao/cadastrar',
            headers : {
                'Content-Type' : undefined
            },
            transformRequest : function(data) {
                var formData = new FormData();
                formData.append('meta-part', new Blob([ angular.toJson($scope.requisicao) ], {
                    type : "application/json"
                }));
                formData.append("arquivo-part", arquivo);
                return formData;
            },
            data : {
                meta_part : $scope.requisicao,
                imagem_part : arquivo
            }
        }).then(function(response) {
            alert("Requisição criada com sucesso");
            $scope.requisicao = {};
        }, function(response) {
            alert(response);
            console.log('erro');
            console.log(response);
        });

        // $http.post('http://18.228.37.157/reprografiaapi/professor/requisicao/cadastrar', fd, {
        //     transformRequest: angular.identity,
        //     headers: {
        //         'Authorization': 'Bearer ' + localStorage.getItem("userToken"),
        //         // 'Content-Type': 'multipart/form-data'
        //         'Content-Type': undefined
        //     }
        //     // data: $scope.requisicao,
        // })
        // .then(function (response){
        //     console.log('foi');
        //     console.log(response);
        // } , function (error){
        //     console.log('erro');
        //     console.log(error);
        //     // alert("Login já existente ou sessão expirada");
        // });
        // .success(function(data){
        //     // vm.event.imageUrl = data.filesData[0].path;
        //     console.log('foi');
        //     console.log(data);
        // })
        // .error(function(){
        //     console.log('Error to call upload API.');
        // });


        // $http({
        //     method:'POST', 
        //     url:'http://18.228.37.157/reprografiaapi/suporte/pessoa/cadastrar',
        //     data: $scope.requisicao,
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
        // .then(function (response){
        //     alert("Usuário cadastrado com sucesso");
        //     $scope.usuario = {};
        // } , function(){
        //     // alert("Login já existente ou sessão expirada");
        // });
              
    }


})