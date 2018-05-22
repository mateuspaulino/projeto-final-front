app.controller("loginController", function($scope, $location, $http){

    //limpaToken
    localStorage.clear();

    $scope.usuario={};
	
	$scope.token="";
	
	$scope.autenticar= function(){

      console.log("Chamou Autenticar " + $scope.usuario.nome + " " + $scope.usuario.senha )


        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://18.228.37.157/reprografiaapi/seguranca/logar",
            "method": "POST",
            "headers": {
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": "Basic Og==",
              "Cache-Control": "no-cache",
              "Postman-Token": "80007493-6b3d-480a-a055-5155b4f8789e"
            },
            "data": {
              "client_id": "exemploaplicativocliente",
              "client_secret": "9834ba657bb2c60b5bb53de6f4201905",
              "grant_type": "password",
              "username": "suporte",
              "password": "123456"
            }
          }
          
          $.ajax(settings).done(function (response) {
            console.log(response);
          });
          
          // testes storade
          localStorage.setItem("userToken", "aquivaiotoken");
          localStorage.setItem("tipoUsuario", "suporte");
          // window.location.href = './';
          // end testes

        //    var req = {
        //     "async": true,
        //     "crossDomain": true,
        //     "url": "http://18.228.37.157/reprografiaapi/seguranca/logar",
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/x-www-form-urlencoded",
        //         "Authorization": "Basic Og==",
        //         "Cache-Control": "no-cache",
        //         "Postman-Token": "9c49d909-cb08-4623-ba36-d97e322d4652"
        //     },
        //     "data": {
        //         "client_id": "exemploaplicativocliente",
        //         "client_secret": "9834ba657bb2c60b5bb53de6f4201905",
        //         "grant_type": "password",
        //         "username": "suporte",
        //         "password": "123456"
        //     }
        // }
           
        // $http(req).then(function(response){
        //     console.log("Sucesso " + response);
        // }, function(response){
        //     console.log(response);
        // });
	}

})