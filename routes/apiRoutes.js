const User = require('../models/user');
const Message = require('../models/message');

module.exports = function(app) {
    // Sends all usernames to client
    app.get("/api/user", function(req, res) {
        User.find({}, "-password")
        .then(function (data) {
            console.log(data[1]);//array data
            res.json(data);
        })
        .catch(function (err) {
            res.json(err);
        });        
    });

    // Create a user
    app.post('/api/user', function (req, res) {
        //need to check if already existing user, then just login, not create if password match
        User.create(req.body)
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            res.json(err);
        });
    });
    ///////add checks

    // Sends all messages to client
    app.get("/api/message", function(req, res) {
        Message.find({})
        .then(function (data) {
            console.log(data[1]);//array data
            res.json(data);
        })
        .catch(function (err) {
            res.json(err);
        });  
    });

    // Create a message
    app.post("/api/message", function(req, res) {
        // check if receiver exists. 
        // by this point sender must exist(JWT auth) so no check needed.
        // sender === receiver is allowed
        const sender = req.body.sender;//jwt
        const receiver = req.body.receiver;

        User.find({_id: receiver})
        .then(function(data) {
            if (data.length !== 0) {
                Message.create(req.body)
                .then(function (messageData) {
                    res.json(messageData);
                })
                .catch(function (err) {
                    res.json({status: "error", message: "Invalid request data"});
                });
            } else {
                throw "Receiver does not exist"
            }   
        })
        .catch(function (err){
            res.json({status: "error", message: err});
        });
    });


}