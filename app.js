const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const session = require('express-session');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.use(express.static('public'));

app.engine('hbs', exphbs.engine({
    extname: '.hbs',
    helpers: {
        formatNumber: function (value) {
            if (value != null) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            } else {
                return '';
            }
        }
    }    
}));

app.set('view engine', 'hbs');

const pool=mysql.createPool({
    //env file me hai
    connectionLimit:100,
    host: 'localhost',
    user : 'root',
    password : 'Ved@1357',
    database: 'project'

});

app.use(session({
    secret: 'your secret key',
    resave: false,
    saveUninitialized: true
  }));


//Connect to DB
pool.getConnection((err, Connection) =>{
    if(err) throw err; //not connected
    console.log('Connected as ID' + Connection.threadId);
});

// app.get('', (req, res) =>{
//     res.render('home')
// });

const routes = require('./server/routes/user');
app.use('/', routes);

app.listen(port, () => console.log('Listening on port ${port}'));