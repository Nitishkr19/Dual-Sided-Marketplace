import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Maker from 'App/Models/Maker'
import Application from '@ioc:Adonis/Core/Application'

export default class ProfilesController {
    public async index({ view,params }: HttpContextContract){
        const username = params.username
        const user = await User.findBy('username',username)
        if(!user){
            return view.render('errors/not-found')
        }
        await user.load('posts')
        return view.render('user/profile',{ user })
    }

    public async gindex({ view }: HttpContextContract){
        return view.render('errors/not-found')
    }

    public async edit({ view }: HttpContextContract){
        return view.render('accounts/edit')
    }

    public async update({ auth, request, response }:HttpContextContract){
        const user = auth.user
        const avatar = request.file('avatar')
        if(avatar) {
            const imageName =new Date().getTime().toString() + `.${avatar.extname}`
            await avatar.move(Application.publicPath('images'),
            {
                name: imageName
            })
            user!.avatar = `images/${imageName}`
        }
        
        user!.details = request.input('details')

        await user?.save()
        return response.redirect().back()
    }


    public async indexmaker({ view,params }: HttpContextContract){
        const username = params.username
        const user = await Maker.findBy('username',username)
        if(!user){
            return view.render('errors/not-found')
        }
        return view.render('maker/profile',{ user })
    }

}
