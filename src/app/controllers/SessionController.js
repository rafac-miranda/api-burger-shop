import * as Yup from 'yup'
import auth from '../../config/auth'
import jwt from 'jsonwebtoken'
import User from '../models/User'

class SessionController {
   async store(request, response){
    try{

        const schema = Yup.object().shape({
            phone: Yup.string().required(),
            password: Yup.string().required(),
        })

        const userPhoneOrPasswordIncorrect = () => {
            return response
            .status(401)
            .json({error: 'Telefone ou senha incorretos!'})
        }

        if(!(await schema.isValid(request.body))) userPhoneOrPasswordIncorrect()
            

        const { phone, password } = request.body

        const user = await User.findOne({
            where: { phone },
        })

        if(!user) userPhoneOrPasswordIncorrect()
            

        if(!(await user.checkPassword(password))) userPhoneOrPasswordIncorrect()
            
        return response.json({
             id: user.id, 
             phone, 
             name: user.name, 
             admin: user.admin,
            token: jwt.sign({ id : user.id, name : user.name }, auth.secret, {
            expiresIn: auth.expiresIn,
            }),
            
        })
        return next()
    
    }catch(err){

    }
}
}

export default new SessionController()