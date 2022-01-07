import { LoadSurveysController } from './load-surveys-controller'
import { LoadSurveys } from './load-surveys-protocols-controller'
import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { mockSurveyModels, throwError } from '@/domain/test'
import MockDate from 'mockdate'
import { makeLoadSurveys } from '../../../test'

type SutTypes = {
  sut: LoadSurveysController
  loadSurveysSpy: LoadSurveys
}

const mockRequest = (): LoadSurveysController.Request => ({
  accountId: 'any_id'
})

const makeSut = (): SutTypes => {
  const loadSurveysSpy = makeLoadSurveys()
  const sut = new LoadSurveysController(loadSurveysSpy)
  return {
    sut,
    loadSurveysSpy
  }
}

describe('LoadSurveys Controller', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
  })
  afterAll(async () => {
    MockDate.reset()
  })
  test('Should call LoadSurveys', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysSpy, 'load')
    await sut.handle(mockRequest())
    expect(loadSpy).toHaveBeenCalled()
  })
  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockSurveyModels()))
  })

  test('Should return 204 on success', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    jest.spyOn(loadSurveysSpy, 'load').mockReturnValueOnce(Promise.resolve([]))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('should return 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    jest.spyOn(loadSurveysSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
