var QRCode = require('qrcode')

var merchant = require('../model/merchantModel');
var user = require('../model/userModel');
var balance = require('../model/balanceModel')

module.exports = {
    index: (req, res) => {
      res.json({"title" : "Proj"});
    },
    generateQR: (req, res) => {
      id = req.body.id;
      QRCode.toDataURL(req.body.id, function (err, url) {
        res.json({
          "success": 1,
          "data": url
        })
      })

    },
    sendcryptotoMerchant: (req, res) => {
       var merchantId = req.body.id;
       var amount = req.body.amount;

       var query = {id: merchantId},
       update = { $inc: {amount: amount}},
       options = { upsert: true, new: true, setDefaultsOnInsert: true };
       balance.findOneAndUpdate(query, update, options, function(err, result) {
          if(err) {
            console.log(err);
          }
          if(res) {
            if(err || result.length == 0) {
              res.json({"error": 1, "message": "wallet not updated"})
            }
            else {
              res.json({"success": 1, "message": "wallet updated"})
              
            }
          }
        });

    },
    sendcryptotoCashguy: (req, res) => {
      var address = req.body.address;
      var amount = req.body.amount;

      var merchantId = req.body.id;

      var query = {id: merchantId},
      update = { $inc: {amount: -amount}},
      options = { upsert: true, new: true, setDefaultsOnInsert: true };
      balance.findOneAndUpdate(query, update, options, function(err, result) {
         if(err) {
           console.log(err);
         }
         if(res) {
           if(err || result.length == 0) {
             res.json({"error": 1, "message": "wallet not updated"})
           }
           else {
             res.json({"success": 1, "message": "wallet updated"})
             
           }
         }
       });
    },
    possibleMerchants: (req, res) => {
      merchant
        .find()
        .select('-__v')
        .exec(function(err, data){
          res.json(data);
        })
    },
    registerMerchant: (req, res) => {
      var newMerchant =  merchant({
        id: req.body.id,
        name: req.body.name
      });
      newMerchant.save(function(err, data) {
        if (err) {
          console.log(err);
          res.json({
            "error": 1,
            "message": "Cannot create new user"
          });
        }
        else {
          res.json({
            "success": 1,
            "message": "Merchant Created",
            "merchantId": data
          })
        }
      });
    },
    registerUser: (req, res) => {
      var newUser =  user({
        id: req.body.id,
        name: req.body.name
      });
      newUser.save(function(err, data) {
        if (err) {
          console.log(err);
          res.json({
            "error": 1,
            "message": "Cannot create new user"
          });
        }
        else {
          res.json({
            "success": 1,
            "message": "User Created",
            "merchantId": data
          })
        }
      });
    }
  }
  