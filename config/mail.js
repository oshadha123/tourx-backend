var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var handlebars = require('handlebars');
var fs = require('fs');

var readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
           callback(err); 
           throw err;
            
        }
        else {
            callback(null, html);
        }
    });
};

smtpTransport = nodemailer.createTransport(smtpTransport({
    host: mailConfig.host,
    secure: mailConfig.secure,
    port: mailConfig.port,
    auth: {
        user: mailConfig.auth.user,
        pass: mailConfig.auth.pass
    }
}));

readHTMLFile(__dirname + 'app/public/pages/emailWithPDF.html', function(err, html) {
    var template = handlebars.compile(html);
    var replacements = {
         username: "John Doe"
    };
    var htmlToSend = template(replacements);
    var mailOptions = {
        from: 'my@email.com',
        to : 'some@email.com',
        subject : 'test subject',
        html : htmlToSend
     };
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
            callback(error);
        }
    });
});