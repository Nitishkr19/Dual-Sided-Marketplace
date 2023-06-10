import Route from '@ioc:Adonis/Core/Route'


Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

Route.get('/user/home','HomeController.index')

Route.on('/user/signup').render('auth/user/signup').middleware('guest')

Route.on('/user/login').render('auth/user/login').middleware('guest')


Route.post('/user/signup','AuthController.signup')

Route.post('/user/login','AuthController.login')

Route.post('/user/logout','AuthController.logout')



Route.on('/maker/signup').render('auth/maker/signup').middleware('guest')

Route.on('/maker/login').render('auth/maker/login').middleware('guest')

Route.get('/maker/home','HomeController.index2')


Route.post('/maker/signup','AuthMakerController.signup')

Route.post('/maker/login','AuthMakerController.login')

Route.post('/maker/logout','AuthMakerController.logout')



Route.post('/verify-email','EmailverifiesController.index').middleware('auth')

Route.get('/verify-email/:email','EmailverifiesController.confirm').as('verifyEmail')


Route.post('/maker/verify-email','EmailverifiesController.indexmaker').middleware('auth')

Route.get('/maker/verify-email/:email','EmailverifiesController.confirmmaker').as('verifyEmailMaker')


Route.get('/accounts/edit','ProfilesController.edit').middleware('auth')

Route.post('/update','ProfilesController.update').middleware('auth')

Route.get('/posts/create', 'PostsController.create').middleware('auth')

Route.post('/posts/create', 'PostsController.store').middleware('auth')

Route.get('/:username','ProfilesController.gindex')
Route.get('/user/:username','ProfilesController.index').middleware('auth')
Route.get('/maker/:username','ProfilesController.indexmaker').middleware('auth')