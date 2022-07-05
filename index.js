// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", (reqw, res) => {
    res.json({
			unix: +new Date().getTime(),
			utc: new Date().toGMTString(),
		})
})

app.get("/api/:timestamp", (req, res) => {
  console.log(req.params.timestamp)
  const { timestamp } = req.params
  const date = new Date(timestamp)

  if (/^[0-9]+$/.test(timestamp)) {
    res.json({
			unix: +timestamp,
			utc: new Date(+timestamp).toGMTString()
		})
  }
  else if (date instanceof Date && !isNaN(date)) {
    // console.log('Date(timestamp):', date)
  // else if (/^[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]$/.test(timestamp)) {
    res.json({
			unix: +(new Date(timestamp).getTime()),
			utc: new Date(timestamp).toGMTString()
		})
  }
  else {
    res.json({ error: 'Invalid Date' })
  }
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
