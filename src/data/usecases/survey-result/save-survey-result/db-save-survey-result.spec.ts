import { SaveSurveyResultRepository } from './db-save-survey-result-protocols'
import { DbSaveSurveyResult } from './db-save-survey-result'
import { mockSurveyResultModel, mockSurveyResultParams, throwError } from '@/domain/test'
import MockDate from 'mockdate'
import { mockLoadSurveyResultRepository, mockSaveSurveyResultRepository } from '../../../test'
import { LoadSurveyResultRepository } from '../load-survey-result/db-save-survey-result-protocols'

type SutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepository()
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub, loadSurveyResultRepositoryStub)
  return {
    sut,
    saveSurveyResultRepositoryStub,
    loadSurveyResultRepositoryStub
  }
}

describe('DbSaveSurveyResult Usecase', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
  })
  afterAll(async () => {
    MockDate.reset()
  })
  test('should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')
    const surveyResultData = mockSurveyResultParams()
    await sut.save(surveyResultData)
    expect(saveSpy).toHaveBeenCalledWith(surveyResultData)
  })
  test('Should throw if LoadSurveysRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockImplementationOnce(throwError)
    const promise = sut.save(mockSurveyResultParams())
    await expect(promise).rejects.toThrow()
  })
  test('should call LoadSurveyResultRepository with correct values', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    const loadBySurveyIdSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
    const surveyResultData = mockSurveyResultParams()
    await sut.save(surveyResultData)
    expect(loadBySurveyIdSpy).toHaveBeenCalledWith(surveyResultData.surveyId)
  })
  test('should return SurveyResult on success', async () => {
    const { sut } = makeSut()
    const surveyResultData = await sut.save(mockSurveyResultParams())
    expect(surveyResultData).toEqual(mockSurveyResultModel())
  })
})
