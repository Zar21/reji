var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GithubStrategy = require('passport-github').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var keys = require('../credentials/credentials.json');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // console.log(`id: ${id}`);
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(error => {
      console.log(`Error: ${error}`);
    });
});

passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]'
}, function(email, password, done) {
  User.findOne({email: email}).then(function(user){
    if(!user || !user.validPassword(password)){
      return done(null, false, {errors: {'email or password': 'is invalid'}});
    }

    return done(null, user);
  }).catch(done);
}));

passport.use(new GithubStrategy({
  clientID: keys.GITHUB_CLIENT_ID,
  clientSecret: keys.GITHUB_CLIENT_SECRET,
  callbackURL: keys.GITHUB_CALLBACK,
  scope: 'user:email',
  passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.find({social:profile.id.toString()}, function(err, user) {
      //console.log(profile);
      //console.log(user);
        if (err)
          return done(err);
        // if the user is found then log them in
        if (user[0]) {
            return done(null, user[0]);
        } else {
          if(profile.emails == null){
            return done("The email is private");
          }else{
            var user = new User({
                social: profile.id,
                username: profile.username,
                email: profile.emails[0].value,
                image: profile.photos[0].value,
            });
            user.save(function(err) {
                if(err){
                  console.log(err);
                    return done(null, user);
                }
                console.log("User added");
                return done(null, user);
            });
          }
      }
    });
  }
));

passport.use(new GoogleStrategy({
  clientID:     keys.GOOGLE_CLIENT_ID,
  clientSecret: keys.GOOGLE_SECRET_ID,
  callbackURL: "http://localhost:3001/api/auth/google/callback",
  scope: "profile email",
  passReqToCallback   : true
},
function(request, accessToken, refreshToken, profile, done) {
  User.find({social:profile.id.toString()}, function(err, user) {
      if (err)
        return done(err);
      // if the user is found then log them in
      if (user[0]) {
          return done(null, user[0]);
      } else {
        if(profile.emails == null){
          return done("The email is private");
        }else{
          console.log(profile);
          var user = new User({
              social: profile.id,
              username: profile.emails[0].value.split('@')[0],
              email: profile.emails[0].value,
              image: profile.picture,
          });
          user.save(function(err) {
              if(err){
                console.log(err);
                  return done(null, user);
              }
              console.log("User added");
              return done(null, user);
          });
        }
      }
    });
  }
));