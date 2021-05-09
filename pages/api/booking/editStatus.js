import Booking from '../../../db/booking'
import { getToken } from 'next-auth/jwt'

const editStatusHandler = async (req, res) => {
  const token = await getToken({ req, secret: process.env.SECRET })
  if (!token || !token.isAdmin) {
    res.status(401).send({error: 'Admin access only'})
    return
  }
  if (req.method === 'POST') {
    const { id, status } = req.body
    if (status) {
      try {
        var booking = await Booking.findById(id)
        booking.status = status
        await booking.save()
      } catch (error) {
        res.status(401).send({ error: 'Error updating booking status' })
      }
    } else {
      res.status(422).send({ error: 'Status must be non-empty' })
    }
  } else {
    res.status(422).send({ error: 'Request method not supported' })
  }
}

export default addServiceHandler
