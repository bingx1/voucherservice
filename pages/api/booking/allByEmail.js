import Booking from '../../../db/booking'
import Service from '../../../db/service'
import User from '../../../db/user'
import { getToken } from 'next-auth/jwt'
import { getSession } from 'next-auth/client'

const getAllBookingsByEmailHandler = async (req, res) => {
  const session = await getSession({ req })
  if (!session) {
    res.status(401).send({ message: 'Incorrect or outdated session' })
    return
  }

  const sessionEmail = session.user.email

  const token = await getToken({ req, secret: process.env.SECRET })

  if (!token || token.email !== sessionEmail) {
    res.status(401).send({ error: 'Must be logged-in user to access data' })
    return
  }

  if (req.method === 'GET') {
    try {
      var user = await User.findOne({ email: sessionEmail })
        .populate({
          path: 'bookings',
          model: 'bookings',
          populate: { path: 'serviceType', model: 'services' }
        })
        .populate({
          path: 'bookings',
          model: 'bookings',
          populate: { path: 'customer', model: 'users' }
        })

      var bookings = user.bookings

      res.status(201).send(bookings)
    } catch (error) {
      res.status(401).send({ error: 'Error retrieving all bookings' })
    }
  } else {
    res.status(422).send({ error: 'Request method not supported' })
  }
}

export default getAllBookingsByEmailHandler
