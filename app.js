const express = require('express');
const app = express();

// Set the directory for static files
app.use(express.static('public'));

// Set the directory where your HTML files are located
app.set('views', __dirname + '/views');

// Set the view engine to render HTML files
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get("/", function(req, res) {
    // Render the page.html file
    res.render("page");
});

app.listen(3000, function() {
    console.log('Server is running on port 3000');
});

