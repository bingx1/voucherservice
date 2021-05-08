import '../../../db/connection'
import Service from '../../../db/service'

const addServiceHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { name } = req.body

    if (name) {
      try {
        var service = await Service.create({
          name
        })
        res.status(201).send(service)
      } catch (error) {
        res.status(401).send({ error: 'Error while adding service' })
      }
    } else {
      res.status(401).send({ error: 'Must specify service name' })
    }
  } else {
    res.status(422).send({ error: 'Request method not supported' })
  }
}

export default addServiceHandler
