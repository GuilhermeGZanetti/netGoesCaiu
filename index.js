require('dotenv/config');


const path=require("path");
const http=require("http");
const express=require('express');
const socketio=require('socket.io');
const { TwitterApi } = require('twitter-api-v2');

// OAuth 1.0a (User context)
const userClient = new TwitterApi({
    appKey: process.env.API_KEY,
    appSecret: process.env.API_KEY_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessSecret: process.env.ACCESS_TOKEN_SECRET,
});


const app=express();
const server=http.createServer(app);
const io=socketio(server);


const port=process.env.PORT || 3000;
const publicDirectoryPath=path.join(__dirname,"/public");

app.use(express.static(publicDirectoryPath));


var lastMessage=0;
var currentMessage=0;
const timeTolerance = 5000;


io.on("connection",(client)=>{
    Date.
    lastMessage = Date.now();
    console.log('New websocket connection ' + lastMessage);
    client.on('messageFromClient', msg => {
        currentMessage = Date.now();
        if(currentMessage - lastMessage > timeTolerance){
            console.log("Atraso!! " + currentMessage);
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
        }
        lastMessage = currentMessage;
        console.log(msg + " " + currentMessage);
    });
    client.on('disconnect', () => {
    console.log('New websocket disconnected');
});
})


server.listen(port,()=>{
    console.log(`Server is up on port ${port}!`);
}) 