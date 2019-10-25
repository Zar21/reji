function ProfileConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.profile', {
    abstract: true,
    url: '/@:username',
    controller: 'ProfileCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'profile/profile.html',
    resolve: {
      profile: function(Profile, $state, $stateParams) {
        return Profile.get($stateParams.username).then(
          (profile) => profile,
          (err) => $state.go('app.home')
        )
      }
    }

  })

  .state('app.profile.main', {
    url:'',
    controller: 'ProfileArticlesCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'profile/profile-articles.html',
    title: 'Profile'
  })
  .state('app.profile.favorites', {
    url:'/favorites',
    controller: 'ProfileArticlesCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'profile/profile-articles.html',
    title: 'Favorites'
  })
  .state('app.profile.favoriteAdventures', {
    url:'/favoriteAdventures',
    controller: 'ProfileAdventuresCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'profile/profile-adventures.html',
    title: 'Favorite adventures'
  });
};

export default ProfileConfig;
