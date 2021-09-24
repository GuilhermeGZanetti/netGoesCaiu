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
            // prints date & time in YYYY-MM-DD HH:MM:SS format
            console.log(date_ob.toLocaleString('en-GB',  { timeZone: 'America/Sao_Paulo' }));
            userClient.v1.tweet('A internet do Goes Caiu...                    ' + date_ob.toLocaleString('en-GB',  { timeZone: 'America/Sao_Paulo' }));
    
            console.log('Internet caiu!');
        }
    });
})


server.listen(port,()=>{
    console.log(`Server is up on port ${port}!`);
}) 