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

    var now = new Date;
    var dia = now.getDay() - 1;
    var mes = now.getMonth();
    dia = dia < 10 ? "0"+dia : dia;
    mes = mes < 10 ? "0"+mes : mes;
    var dataHoje = dia+"/"+mes+"/"+now.getFullYear();
    document.getElementById("data_abertura").value = dataHoje;

    // "professorDisciplina": {"id":1} 
    $scope.disciplinasProfessor= {};
    $scope.disciplinaSelecionada = {};

    dadosUsuario = function (){
		token = localStorage.getItem("userToken");
		
		$http({method:'GET', url:'http://18.228.37.157/reprografiaapi/seguranca/usuario/logado'})
		.then(function (response){
                $scope.disciplinasProfessor=response.data.pessoa.disciplinas;
                console.log($scope.disciplinasProfessor);
            } , function (response){
                console.log(response);
                
        });
    };
    dadosUsuario();

    // $http({method:'GET', url:'http://18.228.37.157/reprografiaapi/professor/professordisciplina/listar'})
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

        $scope.requisicao.professorDisciplina = {id:1};

        var arquivo = $scope.arquivo;
        console.log('arquivo');
        console.log(arquivo);
        var fd = new FormData();
        fd.append('file', arquivo);
        // "professorDisciplina": {"id":1}

        // $scope.usuario.tipoPessoa = "normal";

        $http.post('http://18.228.37.157/reprografiaapi/professor/requisicao/cadastrar', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': 'application/json'},
            data: $scope.requisicao,
        })
        .then(function (response){
            // console.log('foi');
            // console.log(response);
        } , function (error){
            console.log('erro');
            console.log(error);
            // alert("Login já existente ou sessão expirada");
        });
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