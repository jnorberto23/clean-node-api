import { LoginController } from '@/presentation/controllers/login/login/login-controller'
import { Controller } from '@/presentation/protocols'
import { makeLogInValidation } from './login-validation-factory'
import { makeDbAuthentication } from '@/main/factories/use-cases/account/authentication/db-authentication-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'

export const makeLoginController = (): Controller => {
  const controller = new LoginController(
    makeDbAuthentication(),
    makeLogInValidation()
  )
  return makeLogControllerDecorator(controller)
}
