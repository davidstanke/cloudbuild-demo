const path = require('path');
const express=require('express');
const pug=require('pug');
const content=require('./content');
const asciify=require('asciify-image')
const port=8080;

// initialization
var returnMode='web'; // return content via the CLI (mode 'get') or by publishing a web server (mode 'web')
var myArgs = process.argv.slice(2);

// in 'get' mode, the app will respond to invocations like 'node app.js get /' by returning the content of the '/' route
if(myArgs.length) {
    returnMode = myArgs[0];
    if(returnMode == 'get') {
        var requestRoute = myArgs.length>1 ? myArgs[1] : '/';
    }
}

if(returnMode == 'web') { // web mode
    var app=express();
    app.set('views', path.join(__dirname, 'views'));
    app.use(express.static(path.join(__dirname, "public")));
    app.set('view engine', 'pug');

    content.pages.forEach( (page) => {
        app.get(page.route, (req,res) => res.render('default',{
            greeting: page.greeting,
            banner: page.banner,
            bannerUrl: page.bannerUrl
        }))
    })

    var server=app.listen(8080, function() {});
} else if(returnMode == 'get') { // CLI mode
    var page = content.pages.find((page) => page.route === requestRoute)
    var bannerPath = path.join(__dirname,"public",page.banner)

    var options = {
        fit: 'box',
        width: 40,
        height:30
    }

    asciify(bannerPath,options)
        .then( (asciified) => {
            console.log(page.greeting);
            console.log(asciified);
        })
        .catch( (err) => console.error(err));
    
} else {
    throw "unknown application mode: " + returnMode;
}