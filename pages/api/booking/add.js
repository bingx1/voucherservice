import Booking from '../../../db/booking'
// import { getToken } from 'next-auth/jwt'

const addBookingHandler = async (req, res) => {
  // const token = await getToken({ req, secret: process.env.SECRET })
  // if (!token || !token.isAdmin) {
  //   res.status(401).send({ error: 'Admin access only' })
  //   return
  // }
  if (req.method === 'POST') {
    const { customer, serviceType, deliveryMethod, dateTime, message } = req.body
    if (customer && serviceType && deliveryMethod && dateTime) {
      try {
        var booking = new Booking({
          customer,
          serviceType,
          deliveryMethod,
          dateTime,
          message
        })
        await booking.save()
        res.status(201).send(booking)
      } catch (error) {
        res.status(401).send({ error: 'This booking already exists' })
      }
    } else {
      res.status(422).send({ error: 'Field must be filled' })
    }
  } else {
    res.status(422).send({ error: 'Request method not supported' })
  }
}

export default addBookingHandler
