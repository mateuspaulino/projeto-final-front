app.factory('tokenInterceptor', function($q, $location){
    return {
        'request': function(config){
            config.header["Authorization"] = localStorage.getItem('userToken');
            return config;
        },
        'responseError': function(rejection){
            if(rejection.status==401 || rejection.status==500){
                $location.path('/login');
            }
            return $q.reject(rejection);
        }
    };
});