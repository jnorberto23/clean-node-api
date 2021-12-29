import { InvalidParamError } from '../../presentation/errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('field', 'fieldToCompareName')
}
describe('RequiredField Validation', () => {
  test('should return a InvalidParamError if a validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_value', fieldToCompareName: 'wrong_value' })
    expect(error).toEqual(new InvalidParamError('fieldToCompareName'))
  })
  test('should not return if a validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_value', fieldToCompareName: 'any_value' })
    expect(error).toBeFalsy()
  })
})
