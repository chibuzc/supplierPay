require("../models/beneficiary");
const passport = require('passport')




module.exports = app => {

    app.get(
        "/auth/google",
        passport.authenticate("google", {
          scope: ["profile", "email"]
        })
      );
      

    
      app.get(
        "/auth/google/callback",
        passport.authenticate("google"),
        (req, res) => {
          res.redirect("/");
        }
      );
      
      app.get("/api/current_user", (req, res) => {
        console.log("current user",req.user);
        res.send(req.user);
      });
      
      app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/");
      });
      
}