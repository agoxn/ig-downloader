const Express = require('express');
const app = Express();
const port = process.env.PORT || 3000;
const http = require("http");
const https = require("https");

http.globalAgent.maxSockets = Infinity;
https.globalAgent.maxSockets = Infinity;
process.setMaxListeners(Infinity);

const username = ''; // your temp instagram username for session cookie
const password = ''; // your password for session coookie

const cookiee = 'csrftoken=jn7tIZqFI2ueyq7qo6YvokT7Q27x8qI2; rur=PRN; ds_user_id=54242656232; sessionid=54242656232%3AsfYEsWn3kcJs6t%3A20%3AAYf9FSkk_jnGF5PNB7Fa2Y-Mhi1l0F1ztJfnS2wEZQ';
/* How To Get Cookie 
Deploy Your App On Server The Visit Bellow Link

https://yourdomain.com/session

*/

const { igApi ,getCookie } = require("insta-fetcher");
// This Code Use insta-fetcher I respect The owner

let ig = new igApi(cookiee);


app.get("/api", async(req, res) => {
  const url = req.query.url
  if(url == '' || url == null){
    return res.status(400).send({
      success: false,
      message: "Query Can't Be Empty!",
      creator: "igoxn"
    });
  }
    ig.fetchPost(url).then((data) => {
  console.log(data);
  res.status(200).json({data})
});

})
app.get("/session", async(req, res) => {
    // this rout for get session id Make In Private for your Account Safety Chnage Rout Adresssss
(async () => {
  try {
    const cookie = await getCookie(username, password);
    res.status(200).json({cookie})
  } catch (error) {
    res.status(400).json({error})
  }
})();
})

app.get("/", (req, res) => {
    res.setHeader("Cache-Control", "public,max-age=0");
    res.status(200).json({
        domain: 'https://www.igoxn.com'
    })
})


app.listen(port, function(){
    console.log("Your App Running on", port);
});
