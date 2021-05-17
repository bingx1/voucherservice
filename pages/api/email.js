import service from '../../db/service';
import User from '../../db/user'

export default async function (req, res) {
    let nodemailer = require('nodemailer')
    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
      secure: true,
    });
    
    const { customer, serviceType, deliveryMethod, dateTime, message } = req.body

    const user = await User.findOne({ _id: customer })
    
    // const type = await 
    const sender_email = user.email

    const phone_number = user.contact

    const first_name = user.firstName

    const last_name = user.lastName
    
    console.log(user);

    const mailData = {
      from: process.env.EMAIL,
      to: !user.isAdmin ? "kyruuk@gmail.com" : sender_email,
      subject: `New Voucher booking from ${first_name} ${last_name}`,
      text: message + " | Sent from: " + sender_email,
      html: `<div>Date: ${dateTime}</div> <div>Service type: ${serviceType}</div><div>${message}</div><p>Sent from: ${sender_email}</p>`
    }  
    
    transporter.sendMail(mailData, function (err, info) {
      if(err)
        console.log(err)
      else
        console.log(info)
    })  
    
    res.status(200).send("Success");
  }