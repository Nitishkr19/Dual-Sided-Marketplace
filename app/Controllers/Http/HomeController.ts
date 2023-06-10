import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
export default class HomeController {
    public async index({view}:HttpContextContract){
        const posts =await Post.query().preload('user')
        return view.render('user/home', { posts })
    }

    public async index2({view}:HttpContextContract){
        const posts =await Post.query().preload('user')
        return view.render('maker/home', { posts })
    }
}

