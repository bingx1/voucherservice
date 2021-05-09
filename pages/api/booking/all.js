import Booking from '../../../db/booking'
import { getToken } from 'next-auth/jwt'

const getAllBookingsHandler = async (req, res) => {
  const token = await getToken({ req, secret: process.env.SECRET })
  if (!token || !token.isAdmin) {
    res.status(401).send({error: 'Admin access only'})
    return
  }
  if (req.method === 'GET') {
    try {
      var bookings = await Booking.find({})
      res.status(201).send(bookings)
    } catch (error) {
      res.status(401).send({ error: 'Error retrieving all bookings' })
    }
  } else {
    res.status(422).send({ error: 'Request method not supported' })
  }
}

export default getAllBookingsHandler
