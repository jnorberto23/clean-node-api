import { mockSurveyModel, mockSurveyResultModel } from '../../../../domain/test'
import { DbLoadSurveyResult } from './db-load-survey-result'
import { SurveyResultModel, LoadSurveyByIdRepository, SurveyModel, LoadSurveyResultRepository } from './db-save-survey-result-protocols'

type SutTypes = {
  sut: DbLoadSurveyResult
  loadSurveyResultRepositorySpy: LoadSurveyResultRepository
  loadSurveyByIdRepositorySpy: LoadSurveyByIdRepository
}

const makeSurveyModel = mockSurveyModel()
const makeSurveyResultModel = { ...mockSurveyResultModel(), surveyId: makeSurveyModel.id }

const makeLoadSurveyResultRepositorySpy = (): LoadSurveyResultRepository => {
  class LoadSurveyResultRepositorySpy implements LoadSurveyResultRepository {
    async loadBySurveyId (surveyId: string): Promise<SurveyResultModel> {
      return makeSurveyResultModel
    }
  }

  return new LoadSurveyResultRepositorySpy()
}

const makeLoadSurveyByIdRepositorySpy = (): LoadSurveyByIdRepository => {
  class LoadSurveyResultRepositorySpy implements LoadSurveyByIdRepository {
    async loadById (id: string): Promise<SurveyModel> {
      return makeSurveyModel
    }
  }

  return new LoadSurveyResultRepositorySpy()
}

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositorySpy = makeLoadSurveyResultRepositorySpy()
  const loadSurveyByIdRepositorySpy = makeLoadSurveyByIdRepositorySpy()
  const sut = new DbLoadSurveyResult(loadSurveyResultRepositorySpy, loadSurveyByIdRepositorySpy)

  return {
    sut,
    loadSurveyResultRepositorySpy,
    loadSurveyByIdRepositorySpy
  }
}

describe('DbLoadSurveyResult UseCase', () => {
  test('Should call LoadSurveyResultRepository with correct values', async () => {
    const { sut, loadSurveyResultRepositorySpy } = makeSut()
    const loadSpy = jest.spyOn(loadSurveyResultRepositorySpy, 'loadBySurveyId')
    await sut.load(makeSurveyResultModel.surveyId)
    expect(loadSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should throw if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositorySpy } = makeSut()
    jest.spyOn(loadSurveyResultRepositorySpy, 'loadBySurveyId').mockRejectedValueOnce(new Error())
    const promise = sut.load('makeSurveyResultModel.surveyId')
    await expect(promise).rejects.toThrow()
  })

  test('Should call LoadSurveyByIdRepository if LoadSurveyResultRepository returns null', async () => {
    const { sut, loadSurveyResultRepositorySpy, loadSurveyByIdRepositorySpy } = makeSut()
    jest.spyOn(loadSurveyResultRepositorySpy, 'loadBySurveyId').mockResolvedValueOnce(null)
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositorySpy, 'loadById')
    await sut.load(makeSurveyResultModel.surveyId)
    expect(loadByIdSpy).toHaveBeenCalledWith(makeSurveyResultModel.surveyId)
  })

  test('Should return SurveyResultModel on success', async () => {
    const { sut } = makeSut()
    const surveyResult = await sut.load(makeSurveyResultModel.surveyId)
    expect(surveyResult).toEqual(makeSurveyResultModel)
  })
})
