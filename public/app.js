-$(document).ready(function () {

    // Create/login function
    const login = function() {
        const user= {
            username: $("#username").val(),
            password: $("#password").val()
        }
        $.post("/api/user", user, function(res) {
            //jwt token will come on res--not implemented yet
            // check if res is error, then proceed with below
            sessionStorage.setItem("StickyUserId", res._id);
            sessionStorage.setItem("StickyJWT", "temp");
            render();
        });
    }

    const sendMessage = function() {
        //can also check here additionally to limit length, etc as well as server
        // check if empty textarea
        const message = {
            title: $("#message-title").val(),
            body: $("#message-body").val(),
            sender: sessionStorage.getItem("StickyUserId"),
            receiver: $("#receiver").val()
        }
        $.post("/api/message", message, function(res) {
            //if the response is error, explain why
        });
    }

    const retrieveUsers = function() {
        $.get("/api/user", function(res) {
            const userArea = $("#user-display");
            userArea.empty();
            const users = $("<div>");
            res.forEach(function(e){
                users.append(`<div class="border border-success">${e.username}</div>`);
            });
            userArea.append(users);
        });
    }

    const retrieveMessages = function() {
        const messageArea = $("#message-display");
        messageArea.empty();///might not be necessary
        $.get("/api/message", function(res) {
            /*
            if (res.length === 0) {
                //throw "No messages exist yet";
            } else {
                */
                const messages = $("<div>");
                res.forEach(function(e) {
                    console.log(e)
                    messages.append(`<div class="border border-success">Title: ${e.title}<br/>Body: ${e.body}</div>`);
                });
                messageArea.append(messages);
                $("#userpage").removeClass("d-none");
                $("#loginpage").addClass("d-none");
            
        });
    }
    
    const render = function() {
        //sessionStorage.setItem("StickyJWT", "asdf");//implementing JWT later
        retrieveUsers();
        let JWT = sessionStorage.getItem("StickyJWT");
        if (JWT) { // browser has JWT token
            try { 
                retrieveMessages();
            } catch(err) { // JWT is expired, so need login
                console.log(err);//no messagies exist yet
                $("#userpage").addClass("d-none");
                $("#messageArea").empty();
                $("#loginpage").removeClass("d-none")
            }
        }
    }
    
    render();
    $("#send-message").click(sendMessage);
    $("#login").click(login);
})
