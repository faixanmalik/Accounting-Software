const nodemailer = require('nodemailer')


export default async function handler(req, res) {

    if (req.method == 'POST'){
        const user = req.body;
        const email = req.body.email;

        const transporter = nodemailer.createTransport({
            host:'smtp.gmail.com',
            port: 465,
            secure: true,
            service: 'gmail',
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD,
            },
          });

          let mailData = {
            from: `${email}`,
            to: process.env.EMAIL,  
            subject: `Message From ${user.name}`,
            text: user.message
          };

          transporter.sendMail(mailData, function (err,info){
            if (!err) {
                return res.status(200).json({ success: true, message: "Message Sent!"})
              }
              if (err) {
                  return res.status(400).json({ success: false, message: "Some Error Occured!"})
              }
          })
        



    }
  }