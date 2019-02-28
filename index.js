const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const { cookieSecret, DB } = require("./config/keys");

const Beneficiary = require("./models/beneficiary");
mongoose.Promise = global.Promise;

mongoose.connect(
  // "mongodb+srv://chibuzc:charlescc@supplerpay-6ab4d.mongodb.net/test?retryWrites=true",
  DB,
).then(() => {
  console.log("DB is up");
}).catch((e) =>{
  console.log(e)
});



const cors = require("cors");
const PORT = process.env.PORT || 5000;;

const cookieSession = require("cookie-session");
app.use(cors());

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [cookieSecret]
  })
);

app.use(passport.initialize());
app.use(passport.session());
require("./services/passport");

require("./Routes/authRoutes")(app);
require("./Routes/paymentRoutes")(app);


app.get("api/beneficiary/all", async (req, res) => {
  const beneficiaries = await Beneficiary.find({});
  console.log(`beneficiaries`, beneficiaries);
  res.send(beneficiaries);
});


// if we are in production
if (process.env.NODE_ENV === "production") {
  const path = require("path");
  // express will serve up our static assets such as index.html, main.js and css
  app.use(express.static("client/build"));

  //for any set of routes that are not defined within out app
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => console.log("server running"));
