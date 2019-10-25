class ProfileAdventuresCtrl {
    constructor(profile, $state, $rootScope, $scope) {
        'ngInject';
        // The profile for this page, resolved by UI Router
        this.profile = profile;
        this._$scope = $scope;
        this.profileState = $state.current.name.replace('app.profile.', '');

        // Both favorites and author articles require the 'all' type
        this.listConfig = { type: 'all' };
        if (this.profileState === 'favoriteAdventures') {
            this.listConfig.filters = {
                limit: 4,
                offset: 0,
                favoriteAdventures: this.profile.username
            };
            // Set page title
            $rootScope.setPageTitle(`Adventures favorited by ${this.profile.username}`);
        }
    }
}

export default ProfileAdventuresCtrl;