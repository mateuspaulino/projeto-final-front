app.controller("loginController", function($scope, $location, $http){

  //limpaToken
  localStorage.clear();

  $scope.usuario={};
  $scope.usuario.perfil={};
	
	$scope.autenticar= function(){

    var req = {
      "async": true,
      "crossDomain": true,
      "url": "http://18.228.37.157/reprografiaapi/seguranca/logar",
      method: "POST",
      headers: {
          "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        client_id: "reprografiapi",
        client_secret: "9834ba657bb2c60b5bb53de6f4201905",
        grant_type: "password",
        username: $scope.usuario.nome,
        password: $scope.usuario.senha
      }
    }

    $.ajax(req).done(function (response) {
      //se houver erro na resposta
      if(response.error){
        //mostra o erro que deu no login
        alert(response.error_description);
      }else{
        //salva o token e o tipo no storage, e depois redireciona
        localStorage.setItem("userToken", response.access_token);
        localStorage.setItem("tipoUsuario", response.perfil);
        localStorage.setItem("nomeUsuario", response.nome);
        console.log(response);
        setTimeout(function(){
          window.location.href = './';
        },200)
      }
    }).fail(function(response) {
      alert( "error" );
    })
       
    // $http(req).then(function(response){
    //     console.log(response);
    // }, function(response){
    //     console.log(response);
    // });
          
	}

})