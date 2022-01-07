import { EmailValidator } from '@/presentation/protocols/email-validator'
import { mockEmailValidator } from '../test'
import { EmailValidation } from './email-validation'
type SutTypes = {
  sut: EmailValidation
  emailValidatorSpy: EmailValidator
}
const makeSut = (): SutTypes => {
  const emailValidatorSpy = mockEmailValidator()
  const sut = new EmailValidation('email', emailValidatorSpy)
  return {
    sut,
    emailValidatorSpy
  }
}

describe('Signup Controller', () => {
  test('Should call EmailValidator with correct mail', () => {
    const { sut, emailValidatorSpy } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorSpy, 'isValid')
    sut.validate({ email: 'any_email@email.com' })
    expect(isValidSpy).toHaveBeenCalledWith('any_email@email.com')
  })
  test('Should return 500 if email validator throws', () => {
    const { sut, emailValidatorSpy } = makeSut()
    jest.spyOn(emailValidatorSpy, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    expect(sut.validate).toThrow()
  })
})
