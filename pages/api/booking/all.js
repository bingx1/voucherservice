import '../../../db/connection'
import Booking from '../../../db/booking'

const getAllBookingsHandler = async (req, res) => {
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
