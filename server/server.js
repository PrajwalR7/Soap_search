const { urlencoded } = require('body-parser')
const express = require('express')
const app = express()
const port = 5000
var cors = require('cors');
// var clients = require('twilio')(process.env.account_sid, process.env.auth_token)
// var io = require('socket.io').listen(server)
// var speakeasy = require('speakeasy');
let se;
app.use(express.json())
app.use(urlencoded({extended:true}))
app.use(cors());

// app.set('view engine', 'jade');
// app.set('views','views');
const puppeteer = require('puppeteer');

(async function main() {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const [page] = await browser.pages();

    await page.goto(`https://soap2day.ac/`);

    console.log(page.url());
    console.log(typeof page.url());

    await browser.close();
  } catch (err) {
    console.error(err);
  }
})();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    res.header("User-Agent",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:90.0) Gecko/20100101 Firefox/90.0");
      res.header("Vary","Origin")
    // res.header("Access-Control-Allow-Origin", "https://soap2day.ac")
    next();
  });

//MongoDB
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://webbew:mongodbwebbew@api.51jhh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices"); 
})

MongoClient.connect(uri, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
  })

app.get('/:search', async (req, res) => {
    se=req.params.search;
    //res.redirect('https://soap2day.ac/search/keyword/'+se);
    res.send({"url":'https://soap2day.ac/search/keyword/'+se});
  })

app.post('/stored',function(req,res){
  console.log(req.body);
  MongoClient.connect(uri, (err, client) => {
    var db =client.db('soap_search')
    db.collection('users').insertOne(req.body,(err,data)=>{
    if(err) return conole.log(err);
    res.send('saved to db'+data)
  })
  })
  
})

// app.get('/',function(req,res){
//   res.render('index.jade')
// });
 
// function createUser(phone_number, code, socket) {
//   users.save(phone_number, {code: code, verified: false}, function (saverr) {
//     if (saverr) { throw saverr; }
//     clients.sendSms({
//         to: phone_number,
//         from: process.env.twilio_number,
//         body: 'Your verification code is: ' + code
//     }, function(twilioerr, responseData) {
//       if (twilioerr) { 
//         users.remove(phone_number, function(remerr) {if (remerr) { throw remerr; }});
//         socket.emit('update', {message: "Invalid phone number!"});
//       } else {
//         socket.emit('code_generated');
//       }
//     });
//   });
// }

// function checkVerified(socket, verified, number) {
//   if (verified == true) {
//     socket.emit('reset');
//     socket.emit('update', {message: "You have already verified " + number + "!"});
//     return true;
//   }
//   return false;
// }

// io.sockets.on('connection', function(socket) {
//   console.log('socket.io connected');
//   socket.on('register', function(data) {
//     var code = speakeasy.totp({key: 'abc123'});
//     users.get(data.phone_number, function (geterr, doc, key) {
//       if (geterr) {
//         createUser(data.phone_number, code, socket);
//       }
//       else if (checkVerified(socket, doc.verified, data.phone_number) == false) {
//         socket.emit('update', {message: "You have already requested a verification code for that number!"});
//         socket.emit('code_generated');
//       }
//     });

//   });

//   socket.on('verify', function(data) {
//     users.get(data.phone_number, function (geterr, doc, key) {
//       if (geterr) {
//         socket.emit('reset');
//         socket.emit('update', {message: "You have not requested a verification code for " + data.phone_number + " yet!"});
//       }
//       else if (checkVerified(socket, doc.verified, data.phone_number) == false && doc.code == parseInt(data.code)) {
//         socket.emit('verified');
//         socket.emit('update', {message: "You have successfully verified " + data.phone_number + "!"});
//         users.save(data.phone_number, {code: parseInt(data.code), verified: true}, function (saverr) { if (saverr) { throw saverr; }});
//       }
//       else {
//         socket.emit('update', {message: "Invalid verification code!"});
//       }
//     });

//   });
// });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });