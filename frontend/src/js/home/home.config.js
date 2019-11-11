function HomeConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.home', {
    url: '/',
    controller: 'HomeCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'home/home.html',
    title: 'Home',
    resolve: {
      data: function(Travels) {
        console.log("hey hey hey");
        return Travels.getHome(); 
      }
    }
  });

};

export default HomeConfig;
