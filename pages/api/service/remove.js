import '../../../db/connection'
import Service from '../../../db/service'

const removeServiceHandler = async (req, res) => {
  if (req.method === 'DELETE') {
    const { name } = req.body
    console.log('removing a service:', name)
    if (name) {
      try {
        var service = await Service.deleteOne({ name })
        res.status(201).send(service)
      } catch (error) {
        res.status(401).send({ error: 'This service does not exist' })
      }
    } else {
      res.status(422).send({ error: 'Field must be filled' })
    }
  } else {
    res.status(422).send({ error: 'Request method not supported' })
  }
}

export default removeServiceHandler
