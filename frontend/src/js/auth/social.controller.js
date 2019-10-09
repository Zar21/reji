class SocialCtrl {
    constructor(User, $state, $scope) {
      'ngInject';
  
      this._User = User;
      this._$state = $state;
      this._$scope = $scope;
      //this._toaster = toastr;
  
      this.title = $state.current.title;
      this.authType = $state.current.name.replace('app.', '');
      this._User.attemptAuth(this.authType, null).then(
        (res) => {
          //this._toaster.showToastr('success','Successfully Logged In');
          //if(res.data.user.type == "admin"){
            //this._$state.go('app.adminpanel');
          //}else {
            console.log("works")
            location.reload();
            this._$state.go('app.home');
          //}
        },
        (err) => {
          //this._toaster.showToastr('error','Error trying to login');
          console.log("fails")
          this._$state.go('app.home');
        }
      )
    }
  }
  export default SocialCtrl;