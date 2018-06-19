app.controller("editarRequisicaoController", function($scope, $http){

    // TablesDatatables.init();

    $scope.usuarios=[];

    var idUsuario = localStorage.getItem("idUsuario");

    var podeCancelar = true;

    carregarRequisicoes= function (){		
        $http({method:'GET', url:'http://18.228.37.157/reprografiaapi/professor/requisicao/listar'})
        .then(function (response){

            //requisicoes do professor
            // var filtroRequisicoes = response.data.filter(function( obj ) {
            //     return obj.professorDisciplina.professor.id == idUsuario;
            // })
            $scope.requisicoes = response.data;
            $.each($scope.requisicoes, function(i,d){
                $.each(d.historico, function(indx, hist){
                    $scope.requisicoes[i].observacao = hist.observacao;
                })
                if(d.andamentoVigente.status.descricao=='Em Impressão' || d.andamentoVigente.status.descricao=='Cancelada' || d.andamentoVigente.status.descricao=='Concluída'){
                    podeCancelar = false;
                }
                $scope.requisicoes[i].podeCancelar = podeCancelar;
            })
            console.log($scope.requisicoes);
            // TablesDatatables.init();
        } , function (response){
            alert("Nenhuma requisição aberta");
        });
    };
    carregarRequisicoes();

    $scope.baixar = function(id, nomeArq){

        $http({
            method:'GET', url:"http://18.228.37.157/reprografiaapi/professor/requisicao/anexo/"+id,
            responseType: "arraybuffer"
        })
        .then(function (data, status, headers, config){
            baixaArquivo(data, nomeArq);
    
        } , function (error){
            console.log('erro');
            console.log(error);
        });

    }

    // teste
    // $http({
    //     method:'GET', url:"http://18.228.37.157/reprografiaapi/professor/requisicao/anexo/15",
    //     responseType: "arraybuffer"
    // })
    // .then(function (data, status, headers, config){
    //     baixaArquivo(data, "mateus.png");

    // } , function (error){
    //     console.log('erro');
    //     console.log(error);
    // });

    //     $(document).ready(function() {
    //     });
        
    //     function saveFile (name, type, data) {
    //         if (data != null && navigator.msSaveBlob)
    //             return navigator.msSaveBlob(new Blob([data], { type: type }), name);
    //         var a = $("<a style='display: none;'/>");
    //         var url = window.URL.createObjectURL(new Blob([data], {type: type}));
    //             a.attr("href", url);
    //             a.attr("download", name);
    //             $("body").append(a);
    //             a[0].click();
    //         window.URL.revokeObjectURL(url);
    //         a.remove();
    //     }

        // function saveImage(img,arquivo) {
        //     var a = document.createElement("a");
        //     document.body.appendChild(a);
        //     a.style = "display: none";
        //             var blob = new Blob([img], {type: "image/png"}),
        //             url = window.URL.createObjectURL(blob);
        //         a.href = url;
        //         a.download = arquivo;
        //         a.click();
        //         window.URL.revokeObjectURL(url);
        // };
    // $http({
    //     method:'GET', 
    //     url:"http://18.228.37.157/reprografiaapi/professor/requisicao/anexo/15",
    //     data: {},
    // }).success(function (data, status, headers, config){
    //         console.log('foi');
    //         console.log(data);
    //     });
    // $.ajax
    // ({
    //   type: "GET",
    //   url: "http://18.228.37.157/reprografiaapi/professor/requisicao/anexo/16",
    //   dataType: 'json',
    //   async: false,
    //   headers: {
    //     "Authorization": "Bearer 8163c438cdd527047b9164d29a646585"
    //   },
    //   responseType: "arraybuffer",
    //   complete: function (d){
    //     var file = new Blob([response.data], {type : response.headers('content-type')});
	// 		                var fileURL   = URL.createObjectURL(file);
	// 		                var a         = document.createElement('a');
	// 		                a.href        = fileURL; 
	// 		                a.target      = '_blank';
	// 		                a.download    = scope.nomeArquivo360;
	// 		                document.body.appendChild(a);
							
	// 		                if (firefox != -1) {
	// 							a.click();
	// 							document.body.removeChild(a);
	// 						} else {
	// 							$timeout(function() {
	// 								a.click();
	// 								document.body.removeChild(a);
    //       console.log(d);
    //     // $('#baixar-arq').attr('href', `data:image/png;base64,${encodeURIComponent(d.responseText)}`);
        
    //   }
    // });



    $scope.cancelar = function(id){

        var opcao = confirm("Tem certeza que deseja cancelar a requisição?\nEssa ação não poderá ser desfeita!");
        var observacao = prompt("Caso deseje, pode adicionar uma observação", "");
        if(opcao==true && observacao != null){

            if(observacao==""){
                observacao = "Professor cancelou";
            }

            var obj = {
                "requisicao": {
                    "id": parseInt(id)	
                },
                "status": {
                    "id": 5
                },
                "observacao": observacao
            };
            console.log(obj);
            console.log(JSON.stringify(obj));
            $http({
                method:'POST', 
                url:'http://18.228.37.157/reprografiaapi/geral/requisicao/alterar',
                data: obj
            })
            .then(function (response){
                alert("Requisição cancelada com sucesso");
                carregarRequisicoes();
            } , function(error){
                console.log('erro');
                console.log(error);
                // alert("Sessão expirada");
                // logout();
            });

        }
        
              
    }

    $scope.enviar= function(id){

        var opcao = confirm("Tem certeza que deseja enviar a requisição?\nEssa ação não poderá ser desfeita!");
        var observacao = prompt("Caso deseje, pode adicionar uma observação", "");
        if(opcao==true && observacao != null){

            if(observacao==""){
                observacao = "Professor enviou para avaliação";
            }

            var obj = {
                "requisicao": {
                    "id":id	
                },
                "status": {
                    "id": 2
                },
                "observacao": observacao
            };
            
            $http({
                method:'POST', 
                url:'http://18.228.37.157/reprografiaapi/geral/requisicao/alterar',
                data: obj
            })
            .then(function (response){
                alert("Requisição enviada para avaliação com sucesso");
                carregarRequisicoes();
            } , function(error){
                console.log('erro');
                console.log(error);
                // alert("Sessão expirada");
                // logout();
            });

        }
              
    }


})