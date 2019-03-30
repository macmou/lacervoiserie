var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');

// Configuration
let dev_db_url = 'mongodb://Macmou:Boiteacom17!@ds123029.mlab.com:23029/cervoiserie';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

// Models
var Villles = mongoose.model('Villles', {
    id: String,
    ville: String,
    avatar: String,
    image: String,
    favoris: String
});
var Pays = mongoose.model('Pays', {
    pays: String,
    plu: String,
    favoris: String
});
var Bieres = mongoose.model('Bieres', {
    nom: String,
    marque: String,
    volume: Number,
    degret: String,
    favoris: String,
    plu: String,
    description: String,
    image: String,
    rating: String,
    pays: String
});
var Commentaires = mongoose.model('Commentaires', {
    ladescription: String,
    lenote: String,
    auteur: String,
    pseudo: String,
    letype: String,
    laref: String
});

var Users = mongoose.model('Users', {
    email: String,
    pseudo: String
});

var Events = mongoose.model('Events', {
    date: String,
    auteur: String,
    title: String,
    description: String,
    nbr_like: Number
});

var Scores = mongoose.model('Scores', {
    user: String,
    nom: String,
    score: Number
});



    // Get events
    app.get('/api/events', function(req, res) {
 
        // use mongoose to get all reviews in the database
        Events.find(function(err, events) {
 
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
 
            res.json(events); // return all reviews in JSON format
        });
    });
 


// listen (start app with node server.js) ======================================
let port = 8080;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
