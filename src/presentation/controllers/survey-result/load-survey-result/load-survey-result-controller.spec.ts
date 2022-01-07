import { LoadSurveyById, forbidden, InvalidParamError, serverError, ok } from './load-survey-result-protocols-controller'
import { LoadSurveyResultController } from './load-survey-result-controller'
import { mockLoadSurveyByIdRepository } from '@/data/test'
import { mockSurveyResultModel, throwError } from '../../../../domain/test'
import { LoadSurveyResult } from '../../../../domain/usecases/surveyResult/load-survey-result'
import { mockLoadSurveyResult } from '../../../test'

const mockRequest = (): LoadSurveyResultController.Request => ({
  accountId: 'any_id',
  surveyId: 'any_id'
})
type SutTypes = {
  sut: LoadSurveyResultController
  loadSurveyByIdSpy: LoadSurveyById
  loadSurveyResultSpy: LoadSurveyResult
}
const makeSut = (): SutTypes => {
  const loadSurveyByIdSpy = mockLoadSurveyByIdRepository()
  const loadSurveyResultSpy = mockLoadSurveyResult()
  const sut = new LoadSurveyResultController(loadSurveyByIdSpy, loadSurveyResultSpy)
  return { sut, loadSurveyByIdSpy, loadSurveyResultSpy }
}
describe('LoadSurveyResult Controller', () => {
  test('should call loadSurveyById with correct value', async () => {
    const { sut, loadSurveyByIdSpy } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdSpy, 'loadById')
    await sut.handle(mockRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })
  test('should returns 403 i loadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdSpy } = makeSut()
    jest.spyOn(loadSurveyByIdSpy, 'loadById').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })
  test('should return 500 if loadSurveyById throws', async () => {
    const { sut, loadSurveyByIdSpy } = makeSut()
    jest.spyOn(loadSurveyByIdSpy, 'loadById').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('should call loadSurveyResult with correct value', async () => {
    const { sut, loadSurveyResultSpy } = makeSut()
    const loadSpy = jest.spyOn(loadSurveyResultSpy, 'load')
    await sut.handle(mockRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_id')
  })
  test('should return 500 if loadSurveyById throws', async () => {
    const { sut, loadSurveyResultSpy } = makeSut()
    jest.spyOn(loadSurveyResultSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockSurveyResultModel()))
  })
})
