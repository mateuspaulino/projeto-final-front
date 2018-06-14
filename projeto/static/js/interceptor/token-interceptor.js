app.factory("tokenInterceptor", function($q, $location){
	
	return {
		
		'request': function(config){
			
			config.headers.Authorization = 'Bearer ' + localStorage.getItem("userToken");  
		
			return config;
		},
		
		  'responseError': function (rejection){
	    	
	    	if(rejection.status==401 || rejection.status==501 || rejection.codigo==401 || rejection.codigo==501){
                // window.location.href = './login.html';
	    	}
	    	return response;
	    }
	
	
	};
	
});