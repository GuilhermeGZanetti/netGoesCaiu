require('dotenv/config');


const path=require("path");
const http=require("http");
const express=require('express');
const socketio=require('socket.io');
const { TwitterApi } = require('twitter-api-v2');

// // OAuth 1.0a (User context)
// const userClient = new TwitterApi({
//     appKey: process.env.API_KEY,
//     appSecret: process.env.API_KEY_SECRET,
//     accessToken: process.env.ACCESS_TOKEN,
//     accessSecret: process.env.ACCESS_TOKEN_SECRET,
// });


const app=express();
const server=http.createServer(app);
const io= socketio(server);


const port=process.env.PORT || 4000;
const publicDirectoryPath=path.join(__dirname,"/public");

app.use(express.static(publicDirectoryPath));



io.on("connection",(client)=>{
    var safelyClosed = false;
    console.log('New websocket connection ');

    client.on('messageFromClient', msg => {
        console.log(msg);
        safelyClosed = true;
    });
    
    client.on('disconnect', () => {
        console.log("Disconnected");
        if(!safelyClosed){
            let date_ob = new Date();
            // current date
            let date = ("0" + date_ob.getDate()).slice(-2);
            let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            let year = date_ob.getFullYear();
            let hours = ("0" + date_ob.getHours()).slice(-2);
            let minutes = ("0" + date_ob.getMinutes()).slice(-2);
            let seconds = ("0" + date_ob.getSeconds()).slice(-2);
            // prints date & time in YYYY-MM-DD HH:MM:SS format
            console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
            //userClient.v1.tweet('A internet do Goes Caiu...     ' + year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
    
            console.log('Internet caiu!');
        }
    });
})


server.listen(port,()=>{
    console.log(`Server is up on port ${port}!`);
}) 