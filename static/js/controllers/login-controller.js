app.controller("loginController", function($scope, $location){

    //limpaToken
    localStorage.clear();

    $scope.usuario={};
	
	$scope.token="";
	
	$scope.autenticar= function(){
        localStorage.setItem("userToken", "aquivaiotoken");
		// $http.post("/autenticar", $scope.usuario).then(function(response){
		// 	console.log("Sucesso " + response);
		// 	$scope.token = response.data.token;
		// 	localStorage.setItem("userToken", response.data.token);
			
		// } , function(response){
		// 	console.log("Falha " + response);
        // });
        window.location.href = './';
		console.log("Chamou Autenticar " + $scope.usuario.nome + " " + $scope.usuario.senha )
	}

})