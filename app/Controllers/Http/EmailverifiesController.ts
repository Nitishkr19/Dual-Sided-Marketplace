import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Maker from 'App/Models/Maker'
import { DateTime } from 'luxon'

export default class EmailverifiesController {
    public async index({ response, auth}: HttpContextContract) {
        auth.user?.sendVerificationEmail()
          return response.redirect().back()
    }    

    public async confirm({ response, request, params}: HttpContextContract) {
        if(request.hasValidSignature()){
            const user =await User.findByOrFail('email',params.email)
            user.email_verified_at = DateTime.local()
            user.save()
        
            return response.redirect('/')
        }
        
        else{
            return 'invalid url'
        }
    }
    
    public async indexmaker({ response, auth}: HttpContextContract) {
        auth.use('maker').user?.sendVerificationEmail()
          return response.redirect().back()
    }    

    public async confirmmaker({ response, request, params}: HttpContextContract) {
        if(request.hasValidSignature()){
            const maker =await Maker.findByOrFail('email',params.email)
            maker.email_verified_at = DateTime.local()
            maker.save()
        
            return response.redirect('/')
        }
        
        else{
            return 'invalid url'
        }
    }
}
