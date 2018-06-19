app.controller("relatorioCustoController", function($scope, $http){

    // TablesDatatables.init();

    $scope.usuarios=[];

    var idUsuario = localStorage.getItem("idUsuario");

    carregarRequisicoes= function (){		
        $http({method:'GET', url:'http://18.228.37.157/reprografiaapi/geral/requisicao/listar/porstatus?idStatus=6'})
        .then(function (response){

            $scope.requisicoes = response.data;
            // console.log(response.data);
            
            //observacao
            $.each($scope.requisicoes, function(i,d){
                $.each(d.historico, function(indx, hist){
                    $scope.requisicoes[i].observacao = hist.observacao;
                })
            })
            // TablesDatatables.init();
        } , function (response){
            alert("Nenhuma requisição!");
            // logout();
        });
    };
    carregarRequisicoes();

    // carregarRequisicoes= function (){		
    //     $http({method:'GET', url:'http://18.228.37.157/reprografiaapi/geral/requisicao/listar/porstatus?idStatus=6'})
    //     .then(function (response){

    //         $scope.requisicoes = response.data;
    //         // console.log(response.data);
            
    //         //observacao
    //         $.each($scope.requisicoes, function(i,d){
    //             $.each(d.historico, function(indx, hist){
    //                 $scope.requisicoes[i].observacao = hist.observacao;
    //             })
    //         })
    //         // TablesDatatables.init();
    //     } , function (response){
    //         alert("Nenhuma requisição!");
    //         // logout();
    //     });
    // };
    // carregarRequisicoes();

    

    // $http({
    //     method:'GET', url:"http://18.228.37.157/reprografiaapi/geral/requisicao/obter?id=14",
    // })
    // .then(function (response){
    //    console.log(response);

    // } , function (error){
    //     console.log('erro');
    //     console.log(error);
    // });

    // $scope.baixar = function(id, nomeArq){

        // $http({
        //     method:'GET', url:"http://18.228.37.157/reprografiaapi/professor/requisicao/anexo/"+id,
        //     responseType: "arraybuffer"
        // })
        // .then(function (data, status, headers, config){
        //     baixaArquivo(data, nomeArq);
    
        // } , function (error){
        //     console.log('erro');
        //     console.log(error);
        // });

    // }

    // Initialize Datepicker
    $('.input-datepicker, .input-daterange').datepicker({
        // weekStart: 1,
        format: 'dd/mm/yyyy',
        locale: 'pt-br'
    });

    $scope.dataSelecionada = "";

    $scope.custoMensal = {};

    $scope.gerarRelatorio = function(){
        var dataElm = $("#dataSelecionada").val();
        if(dataElm!==""){
            if(validaData(dataElm)){
                //gera relatorio
                $http({
                    method:'GET', url:"http://18.228.37.157/reprografiaapi/gerente/relatorio/custopormes?data="+dataElm,
                })
                .then(function (response){
                    console.log(response.data);
                    $scope.custoMensal = response.data;
                } , function (error){
                    console.log('erro');
                    console.log(error);
                    $scope.custoMensal = {};
                    alert("Nenhum resultado para esse mês");
                });
                //mostra resultado
            }
        }else{
            alert("O campo data é obrigatório");
            //zera o scope da tabela
            $scope.custoMensal = {};
        }

    }

    function validaData(stringData) {
        /******** VALIDA DATA NO FORMATO DD/MM/AAAA *******/

        var regExpCaracter = /[^\d]/;     //Expressão regular para procurar caracter não-numérico.
        var regExpEspaco = /^\s+|\s+$/g;  //Expressão regular para retirar espaços em branco.

        if(stringData.length != 10)
        {
            alert('Data fora do padrão DD/MM/AAAA');
            return false;
        }

        splitData = stringData.split('/');

        if(splitData.length != 3)
        {
            alert('Data fora do padrão DD/MM/AAAA');
            return false;
        }

        /* Retira os espaços em branco do início e fim de cada string. */
        splitData[0] = splitData[0].replace(regExpEspaco, '');
        splitData[1] = splitData[1].replace(regExpEspaco, '');
        splitData[2] = splitData[2].replace(regExpEspaco, '');

        if ((splitData[0].length != 2) || (splitData[1].length != 2) || (splitData[2].length != 4))
        {
            alert('Data fora do padrão DD/MM/AAAA');
            return false;
        }

        /* Procura por caracter não-numérico. EX.: o "x" em "28/09/2x11" */
        if (regExpCaracter.test(splitData[0]) || regExpCaracter.test(splitData[1]) || regExpCaracter.test(splitData[2]))
        {
            alert('Caracter inválido encontrado!');
            return false;
        }

        dia = parseInt(splitData[0],10);
        mes = parseInt(splitData[1],10)-1; //O JavaScript representa o mês de 0 a 11 (0->janeiro, 1->fevereiro... 11->dezembro)
        ano = parseInt(splitData[2],10);

        var novaData = new Date(ano, mes, dia);

        /* O JavaScript aceita criar datas com, por exemplo, mês=14, porém a cada 12 meses mais um ano é acrescentado à data
                final e o restante representa o mês. O mesmo ocorre para os dias, sendo maior que o número de dias do mês em
                questão o JavaScript o converterá para meses/anos.
                Por exemplo, a data 28/14/2011 (que seria o comando "new Date(2011,13,28)", pois o mês é representado de 0 a 11)
                o JavaScript converterá para 28/02/2012.
                Dessa forma, se o dia, mês ou ano da data resultante do comando "new Date()" for diferente do dia, mês e ano da
                data que está sendo testada esta data é inválida. */
        if ((novaData.getDate() != dia) || (novaData.getMonth() != mes) || (novaData.getFullYear() != ano))
        {
            alert('Data Inválida!');
            return false;
        }
        else
        {
            return true;
        }
    }


})