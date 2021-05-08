import '../../../db/connection'
import service from '../../../db/service'



const addserviceHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { newservice } = req.body
    if (newservice ) {
      try {
        var name = await services.create({ newservice })
        res.status(201).send(services)
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

export default addserviceHandler
