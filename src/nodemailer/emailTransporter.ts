const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

function sendEmail(to, subject, template, context) {
    // create reusable transporter object using the default SMTP transport

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pmsmaven@gmail.com',
            pass: 'pdzkxwrcmllyksqq',
        },
    });
    // point to the template folder
    const handlebarOptions = {
        viewEngine: {
            partialsDir: path.resolve(__dirname, '../views/'),
            defaultLayout: false,
        },
        viewPath: path.resolve(__dirname, '../views/'),
    };

    // use a template file with nodemailer
    transporter.use('compile', hbs(handlebarOptions));

    // const mailOptions = {
    //     from: '"david" <david.rb.pmsmaven@gmail.com>', // sender address
    //     to: 'davidmatovu88@gmail.com', // list of receivers
    //     subject: 'New Reservation!',
    //     template: 'email', // the name of the template file i.e email.handlebars
    //     context: {
    //         name: 'David', // replace {{name}} with David
    //         company: 'My Company', // replace {{company}} with My Company
    //     },
    // };

    let templateName;
    if (template === 'reservationEmail') {
        templateName = 'reservationEmail';
    } else if (template === 'confirmationEmail') {
        templateName = 'confirmationEmail';
    } else {
        throw new Error('Invalid email template specified');
    }
    const mailOptions = {
        from: '"david" <david.rb.pmsmaven@gmail.com>',
        to: to,
        subject: subject,
        template: templateName,
        context: context,
    };
    // trigger the sending of the E-mail
    transporter.sendMail(mailOptions, function (error: any, info: any) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}

// Call the function to send the welcome email
module.exports = sendEmail; // Export the sendEmail function
