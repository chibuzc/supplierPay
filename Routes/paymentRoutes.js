require("../models/beneficiary");
const axios = require("axios");
const { PAYSTACK_PUBLIC_KEY, PAYSTACK_SECRET_KEY } = require("../config/keys");
const crypto = require("crypto");
const Beneficiary = require("../models/beneficiary");

module.exports = app => {
  app.get("/api/paystack/banks", async (req, res) => {
    req.headers["Authorization"] = PAYSTACK_SECRET_KEY;
    try {
      const result = await axios.get({
        method: "get",
        url: URL,
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
        }
      });
      // console.log(result.data.data)
      //remember to put status check for error handling
      res.send(result.data.data);
    } catch (error) {
      const { message, status } = error.response;
      console.log("response", message);
      console.log("status", status);
      res.status(status).send({ error: "Something went wrong" });
    }
  });

  app.post("/api/paystack/verifyAccount", async (req, res) => {
    const accountNumber = req.body.accountNumber;
    const bankCode = req.body.bankCode;

    const URL = `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`;

    try {
      const verification = await axios({
        method: "get",
        url: URL,
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
        }
      });

      console.log(`result`, verification.data.data);
      res.send(verification.data.data);
    } catch (error) {
      console.log(error);
    }
  });

  app.post("/api/paystack/transferReciept", async (req, res) => {
    console.log(`saveBeneficiary body body`, req.body);
    let data = {
      account_number: req.body.accountNumber,
      bank_code: req.body.bankCode
    };
    let config = {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
      }
    };
    try {
      console.log(`data`, data);
      const reciept = await axios.post(
        "https://api.paystack.co/transferrecipient",
        data,
        config
      );

      console.log(`reciept`, reciept.data);

      //remember to mosularize this and decide later if you want to save bene into db first
      //before sending data to the front-end
      console.log(`here`, req.body.accountName);
      if (req.body.saveBeneficiary) {
        const existingBeneficiary = await Beneficiary.findOne({
          transferReciept: reciept.data.data.recipient_code
        });
        if (!existingBeneficiary) {
          const beneficiary = new Beneficiary({
            name: req.body.accountName,
            transferReciept: reciept.data.data.recipient_code
          });
          console.log("bene", beneficiary);
          await beneficiary.save();
          console.log("done here");
          res.send(reciept.data);
        }
        res.send(reciept.data);
      }
      res.send(reciept.data);
    } catch (e) {
      console.log(`error`, e);
    }
  });

  app.post("/api/paystack/initializeTransfer", async (req, res) => {
    console.log(req.body);
    let config = {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
      }
    };
    let data = {
      source: "balance",
      reason: req.body.description,
      amount: req.body.amount,
      recipient: req.body.transferReciept.recipient_code
    };
    console.log(`data beign sent`, data);
    try {
      const payment = await axios.post(
        "https://api.paystack.co/transfer",
        data,
        config
      );
      console.log(`payment.data `, payment.data);
      res.send(payment.data);
    } catch (error) {
      console.log(error);
    }
  });

  app.post("/api/paystack/bulk_transfer", async (req, res) => {
    console.log(`boldy for bulk`, req.body);
    let config = {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
      }
    };

    const transactionDetails = req.body.map(t => {
      return {
        amount: t.amount,
        recipient: t.transferReciept.recipient_code
      };
    });

    console.log(`transaction Details `, transactionDetails);

    let data = {
      source: "balance",
      reason: req.body.description,
      transfers: transactionDetails
    };

    try {
      const payment = await axios.post(
        "https://api.paystack.co/transfer",
        data,
        config
      );
      console.log(`bulk payment.data `, payment.data);
      res.send(payment.data);
    } catch (error) {
      console.log(error);
    }
  });

  app.get("/api/test", async (req, res) => {
    const URL = `https://api.paystack.co/bank/resolve?account_number=0719765463&bank_code=044`;
    console.log(URL);
    try {
      const verification = await axios({
        method: "get",
        url: URL,
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
        }
      });
      console.log("headerss", req.headers);
      console.log(`result`, verification);
    } catch (error) {
      console.log(error);
    }
  });

  app.post("/api/paystack/testEndpoint", function(req, res) {
    //validate event
    var hash = crypto
      .createHmac("sha512", `Bearer ${PAYSTACK_SECRET_KEY}`)
      .update(JSON.stringify(req.body))
      .digest("hex");
    if (hash == req.headers["x-paystack-signature"]) {
      // Retrieve the request's body
      var event = req.body;
      console.log(`event`, event);
      // Go to the DB, find this tansaction, and update it to paid
    }
    res.send(200);
  });
};
