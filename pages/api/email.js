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
    
    const type = await service.findOne({ _id: serviceType})

    const type_name = type.name

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
      html: `<div><strong> New voucher booking </strong></div>
      <p>A new voucher booking has been received from ${first_name} ${last_name}. 
      Please visit the admin dashboard to accept the booking.</p>
      <div>Date: ${dateTime}</div> 
      <div>Service type: ${type_name}</div>
      <div>Location: ${deliveryMethod}<br></div>
      <div><br><b>Client contact details</b></div>
      <div>Name: ${first_name} ${last_name}</div>
      <div>Phone number: ${phone_number}</div>
      <div>Email address: ${sender_email}</div>
      <div>${message}</div>
      <p>Sent from: ${sender_email}</p>`
    }  
    
    transporter.sendMail(mailData, function (err, info) {
      if(err)
        console.log(err)
      else
        console.log(info)
    })  
    
    res.status(200).send("Success");
  }