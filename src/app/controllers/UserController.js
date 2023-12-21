/*
store => Cadastrar / Adicionar
index => Listar vários
show => Listar apenas UM
update => Atualizar
delete => Deletar
*/
import { v4 } from 'uuid'
import * as Yup from 'yup'


import User from '../models/User'

class UserController {
  async store(request, response) {
  
    try{
    
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      phone: Yup.string().required().min(15),
      password: Yup.string().required().min(6),
      admin: Yup.boolean(),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { name, phone, password, admin } = request.body

    const userExists = await User.findOne({
      where: { phone },
    })

    if (userExists) {
      return response.status(409).json({ error: 'Este telefone já possui um cadastro!' })
    }

    const user = await User.create({
      
        id: v4(),
        name,
        phone,
        password,
        admin,
    })

    return response.status(201).json({ id: user.id, name, phone, admin })
  }catch(err){

  }
}
}

export default new UserController()