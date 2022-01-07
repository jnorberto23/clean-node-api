import { LogErrorRepository } from '@/data/protocols/db/log/log-error-repository'
import { ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { mockLogErrorRepository } from '@/data/test'
import { LogControllerDecorator } from './log-controller-decorator'
import { SignUpController } from '../../presentation/controllers/login/signup/signup-controller'

type SutTypes ={
  sut: LogControllerDecorator
  controllerSpy: Controller
  logErrorRepositorySpy: LogErrorRepository
}

const mockServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

const mockRequest = (): SignUpController.Request => ({
  name: 'any_name',
  email: 'any_email@email.com',
  password: 'any_password',
  passwordConfirmation: 'any_password'
})

const makeController = (): Controller => {
  class ControllerSpy implements Controller {
    httpResponse = ok('any_id')
    request: any
    async handle (request: any): Promise<HttpResponse> {
      this.request = request
      return this.httpResponse
    }
  }
  return new ControllerSpy()
}

const makeSut = (): SutTypes => {
  const controllerSpy = makeController()
  const logErrorRepositorySpy = mockLogErrorRepository()
  const sut = new LogControllerDecorator(controllerSpy, logErrorRepositorySpy)

  return {
    sut,
    controllerSpy,
    logErrorRepositorySpy
  }
}
describe('LogController Decorator', () => {
  test('should call controller handle ', async () => {
    const { sut, controllerSpy } = makeSut()
    const handleSpy = jest.spyOn(controllerSpy, 'handle')
    await sut.handle(mockRequest())
    expect(handleSpy).toHaveBeenCalledWith(mockRequest())
  })

  test('should call LogErrorRepository with correct error if controlelr returns a server error', async () => {
    const { sut, controllerSpy, logErrorRepositorySpy } = makeSut()
    const logSpy = jest.spyOn(logErrorRepositorySpy, 'logError')
    jest.spyOn(controllerSpy, 'handle').mockReturnValueOnce(Promise.resolve(mockServerError()))
    await sut.handle(mockRequest())
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
