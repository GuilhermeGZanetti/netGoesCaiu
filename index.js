const { env } = require("process");

var T = new Twit({
    consumer_key:         process.env.CONSUMER_KEY,
    consumer_secret:      process.env.CONSUMER_SECRET,
    access_token:         process.env.ACCESS_TOKEN,
    access_token_secret:  process.env.ACCESS_TOKEN_SECRET,
});

T.post(
    'statuses/update', 
    { status: 'hello world!' }, 
    function(err, data, response) {
        console.log(data)
});

console.log(process.env.CONSUMER_KEY);