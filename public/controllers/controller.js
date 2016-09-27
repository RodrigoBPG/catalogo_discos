var myApp = angular.module('myApp', ['ngRoute'])

//roteamento das paginas do website
.config( ['$routeProvider', function($routeProvider) {
		$routeProvider
			//caminho padrao de endereco da aplicacao, encaminha para a pagina pricipal index.html
			.when('/', {
				templateUrl : 'views/index.html',
			})
			
			//caso o usuario digite qualquer caminho aleatorio na barra de endereco ele sera redirecionado para home
			.otherwise({
				redirectTo: '/'
			});
	}]);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
	
  var refresh = function() { //atualiza pagina para listar os discos e limpar os campos de preenchimento
    $http.get('/listadiscos').success(function(response) {
      $scope.listadiscos = response;
      $scope.disco = ""; //limpa os campos de texto
    });
  };

refresh(); //atualiza e mostra os discos

  $scope.adddisco = function() { //adicionando um novo disco ao catalago
    $http.post('/listadiscos', $scope.disco).success(function(response) {
    refresh();
  });
  };

  $scope.remove = function(id) { //removendo um disco do catalogo
    console.log(id);
    $http.delete('/listadiscos/' + id).success(function(response) {
      refresh();
    });
  };

  $scope.edit = function(id) { //editando um disco do catalgogo
    $http.get('/listadiscos/' + id).success(function(response) {
      $scope.disco = response;
    });
  };

  $scope.update = function() { //atualizando as alteracoes feitas em um disco
    console.log("Controller: Updating:"+ $scope.disco._id);
    $http.put('/listadiscos/' + $scope.disco._id, $scope.disco).success(function(response) {
      refresh();
    });
  };

}]);﻿
