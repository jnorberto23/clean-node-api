import { HttpRequest, Validation } from './add-survey-protocols-controller'
import { AddSurveyController } from './add-survey-controller'
const makeFakeRequest = (): HttpRequest => ({
  body: {
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }]
  }
})
interface SutTypes {
  sut: AddSurveyController
  validationStub: Validation
}
const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const sut = new AddSurveyController(validationStub)
  return {
    sut,
    validationStub
  }
}
const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input?: any): Error {
      return null
    }
  }
  return new ValidationStub()
}
describe('Add Survey Controller', () => {
  test('should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenLastCalledWith(httpRequest.body)
  })
})
