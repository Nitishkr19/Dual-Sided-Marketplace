import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Maker from 'App/Models/Maker'


export default class AuthMakerController {
    public async signup({ request, response}: HttpContextContract) {
        const req = await request.validate({
            schema: schema.create({
                name: schema.string(),
                email: schema.string({}, [
                    rules.email()
                ]),
                username: schema.string({}),
                password: schema.string({}, [
                    rules.confirmed()
                ])
            }),
            messages: {
                required: '{{ field }} is required to sign up!',
            }

        })
        const maker = new Maker()
        maker.name = req.name
        maker.email = req.email
        maker.username = req.username
        maker.password=req.password
        await maker.save();

        maker?.sendVerificationEmail()


        return response.redirect('/maker/home')
    }


    public async login({ request,auth,response }: HttpContextContract){
        const req= await request.validate({
            schema:schema.create({
                email:schema.string({},[
                    rules.email()
                ]),
                password:schema.string({},[
                    rules.minLength(3)
                ])
        }),
        messages: {
            required: '{{ field }} is required to login',
            'password.minlength':'password must be atleast 3 character'
        }
    })

    const email =req.email
    const password=req.password
    const maker =await auth.use('maker').attempt(email,password)

    return response.redirect(`/maker/${maker.username}`);
    }


    public async logout({ auth , response }: HttpContextContract){
        await auth.use('maker').logout()
        return response.redirect('/')
    }
}
