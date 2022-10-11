const withAuth = (req, res, next) => {
    //redirect if user is nog logged in
    if (!req.session.loggedIn) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  module.exports = withAuth;