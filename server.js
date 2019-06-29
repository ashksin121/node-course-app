const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFileSync('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    })
    next();
});

// app.use((req, res, next) => {
//     res.render('maintainance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express</h1>');
    // res.send({
    //     name: 'Ashish',
    //     likes: [
    //         'Biking',
    //         'Cities'
    //     ]
    // })
    res.render('home.hbs', {
        pageTitle: 'Home page',
        // currentYear: new Date().getFullYear(),
        welcomeMessage: 'Aap aaye h iss bagiya mein ----- Phool khile h gulshan gulshan'
    }); 
})

app.get('/about', (req, res) => {
    // res.send('About page');
    res.render('about.hbs', {
        pageTitle: 'About page'
        // currentYear: new Date().getFullYear()
    });
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Error fulfilling request :('
    })
})

app.listen(port, () => {
    console.log(`Server is up in port ${port}`);
});