import Service from '../../db/service'
import User from '../../db/user'
import { getToken } from 'next-auth/jwt'

export default async function (req, res) {
  if (req.method == 'POST') {
    try {
      // console.log('Process a request to send an email from API')
      let nodemailer = require('nodemailer')
      const transporter = nodemailer.createTransport({
        port: 465,
        host: 'smtp.gmail.com',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        },
        secure: true
      })

      const { id, customer, serviceType, deliveryMethod, dateTime, status } = req.body

      var { message } = req.body

      const token = await getToken({ req, secret: process.env.SECRET })

      const user = await User.findOne({ _id: customer })

      const type = await Service.findOne({ _id: serviceType })

      const type_name = type.name

      const sender_email = user.email

      const phone_number = user.contact

      const first_name = user.firstName

      const last_name = user.lastName

      // console.log(user)

      var mailData

      message = message ? message : '-'

      if (!token.isAdmin) {
        if (status === 'PENDING') {
          mailData = {
            from: process.env.EMAIL,
            to: process.env.ADMIN_EMAIL,
            subject: `New voucher booking by ${first_name} ${last_name} (Booking ID: ${id})`,
            text: message + ' | Sent from: ' + sender_email,
            html: `<div><strong> New voucher booking </strong></div>
      <p>A new voucher booking has been received from ${first_name} ${last_name}. 
      Please visit the admin dashboard to accept the booking.</p>
      <div>Date: ${dateTime}</div> 
      <div>Service type: ${type_name}</div>
      <div>Location: ${deliveryMethod}<br></div>
      <div>Message: ${message}</div>
      <div><br><b>Client contact details</b></div>
      <div>Name: ${first_name} ${last_name}</div>
      <div>Phone number: ${phone_number}</div>
      <div>Email address: ${sender_email}</div>
      <p>Sent from: ${sender_email}</p>`
          }
        } else if (status === 'CANCELLED') {
          mailData = {
            from: process.env.EMAIL,
            to: process.env.ADMIN_EMAIL,
            subject: `Cancellation of voucher booking by ${first_name} ${last_name} (Booking ID: ${id})`,
            text: message + ' | Sent from: ' + sender_email,
            html: `<div><strong> Cancellation of voucher booking </strong></div>
      <p>A voucher booking has been cancelled by ${first_name} ${last_name}.</p>
      <div>Date: ${dateTime}</div> 
      <div>Service type: ${type_name}</div>
      <div>Location: ${deliveryMethod}<br></div>
      <div>Cancellation Message: ${message}</div>
      <div><br><b>Client contact details</b></div>
      <div>Name: ${first_name} ${last_name}</div>
      <div>Phone number: ${phone_number}</div>
      <div>Email address: ${sender_email}</div>
      <p>Sent from: ${sender_email}</p>`
          }
        }
      } else {
        if (status === 'ACCEPTED') {
          mailData = {
            from: process.env.EMAIL,
            to: sender_email,
            subject: `Voucher booking confirmed (Booking ID: ${id})`,
            text: message + ' | Sent from: ' + process.env.EMAIL,
            html: `<div><strong> New voucher booking </strong></div>
      <p>Your voucher booking has been confirmed by the administrator.  
      Please see below for booking details.</p>
      <div>Date: ${dateTime}</div> 
      <div>Service type: ${type_name}</div>
      <div>Location: ${deliveryMethod}<br></div>
      <div>Message: ${message}</div>
      <div><br><b>Client contact details</b></div>
      <div>Name: ${first_name} ${last_name}</div>
      <div>Phone number: ${phone_number}</div>
      <div>Email address: ${sender_email}</div>
      <p>Sent from: ${process.env.EMAIL}</p>`
          }
        }
      }

      transporter.sendMail(mailData, function (err, info) {
        if (err) console.log(err)
        else console.log(info)
      })

      res.status(200).send('Success')
    } catch (error) {
      console.log(error)
      res.status(422).send({ error: 'Error while processing email.' })
    }
  } else {
    res.status(422).send({ error: 'Request method not supported.' })
  }
}
