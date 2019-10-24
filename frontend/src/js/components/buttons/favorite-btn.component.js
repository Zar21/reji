class FavoriteBtnCtrl {
  constructor(User, Articles, Adventures, $state) {
    'ngInject';
    this._User = User;
    this._Articles = Articles;
    this._Adventures = Adventures;
    this._$state = $state;
  }

  submitAdventure() {
    this.submit(this._Adventures, this.adventure);
  }

  submitArticle() {
    this.submit(this._Articles, this.article);
  }

  submit(itemService, item) {
    this.isSubmitting = true;

    if (!this._User.current) {
      this._$state.go('app.register');
      return;
    }

    if (item.favorited) {
      itemService.unfavorite(item.slug).then(
        () => {
          this.isSubmitting = false;
          item.favorited = false;
          item.favoritesCount--;
        }
      )

    } else {
      itemService.favorite(item.slug).then(
        () => {
          this.isSubmitting = false;
          item.favorited = true;
          item.favoritesCount++;
        }
      )
    }

  }

}

let FavoriteBtn= {
  bindings: {
    article: '=',
    adventure: '='
  },
  transclude: true,
  controller: FavoriteBtnCtrl,
  templateUrl: 'components/buttons/favorite-btn.html'
};

export default FavoriteBtn;
