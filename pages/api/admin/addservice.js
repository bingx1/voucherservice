import '../../../db/connection'
import Service from '../../../db/service'

const addServiceHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { name } = req.body
    if (name) {
      try {
        var service = await Service.create({ name: name })
        res.status(201).send(service)
      } catch (error) {
        if (error.code == 11000) {
          res.status(401).send({ error: 'This service already exists' })
        }
      }
    } else {
      res.status(422).send({ error: 'Field must be filled' })
    }
  } else {
    res.status(422).send({ error: 'Request method not supported' })
  }
}

export default addServiceHandler
