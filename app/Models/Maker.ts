import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'
import Mail from '@ioc:Adonis/Addons/Mail'
import Route from '@ioc:Adonis/Core/Route'
import Env from '@ioc:Adonis/Core/Env'

export default class Maker extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name:string

  @column()
  public email:string

  @column()
  public username:string

  @column()
  public avatar:string

  @column()
  public details:string

  @column()
  public password:string

  @column.dateTime()
  public email_verified_at:DateTime


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (maker: Maker) {
    if (maker.$dirty.password) {
      maker.password = await Hash.make(maker.password)
    }
  }

  public async sendVerificationEmail(){
    const url = Env.get('APP_URL') + Route.makeSignedUrl('verifyEmailMaker',{params:{email:this.email},expiresIn: '15m',})
    Mail.send((message) => {
      message
        .from('verify@MeydIT.com')
        .to(this.email)
        .subject('Please verify your email')
        .htmlView('emails/verify', { maker:this, url })
    }) 
  }
}
