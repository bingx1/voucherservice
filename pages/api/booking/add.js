import { getSession } from 'next-auth/client'
import { getToken } from 'next-auth/jwt'
import Booking from '../../../db/booking'
import User from '../../../db/user'

const addBookingHandler = async (req, res) => {
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

  var user = await User.findOne({ email: sessionEmail })

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
        console.log(req.body);
        console.log(customer);
        console.log(serviceType);
        console.log(deliveryMethod);
        console.log(dateTime);
        await booking.save()
        await user.bookings.push(booking._id)
        await user.save()

        res.status(201).send(booking)
      } catch (error) {
        res.status(401).send({ error: 'Error creating voucher booking' })
      }
    } else {
      res.status(422).send({ error: 'Field must be filled' })
    }
  } else {
    res.status(422).send({ error: 'Request method not supported' })
  }
}

export default addBookingHandler
