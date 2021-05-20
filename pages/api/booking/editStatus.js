import Booking from '../../../db/booking'
import { getToken } from 'next-auth/jwt'

const editStatusHandler = async (req, res) => {
  const token = await getToken({ req, secret: process.env.SECRET })
  if (!token) {
    res.status(401).send({ error: 'Must be logged-in user to access data.' })
    return
  }

  if (req.method === 'POST') {
    const { id, status } = req.body

    if (id && status) {
      try {
        var booking = await Booking.findOne({ _id: id })
        booking.status = status
        await booking.save()
        res.status(201).send(booking)
      } catch (error) {
        res.status(401).send({ error: 'Error updating booking status.' })
      }
    } else {
      res.status(422).send({ error: 'Status must be non-empty.' })
    }
  } else {
    res.status(422).send({ error: 'Request method not supported.' })
  }
}

export default editStatusHandler
