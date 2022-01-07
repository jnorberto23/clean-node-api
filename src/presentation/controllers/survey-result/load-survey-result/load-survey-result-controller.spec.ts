import { mockLoadSurveyByIdRepository } from '../../../../data/test'
import { LoadSurveyResultController } from './load-survey-result-controller'
import { HttpRequest } from './load-survey-result-protocols-controller'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_id'
  }
})
describe('LoadSurveyResult Controller', () => {
  test('should call loadSurveyById with correct value', async () => {
    const loadSurveyByIdStub = mockLoadSurveyByIdRepository()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
    const sut = new LoadSurveyResultController(loadSurveyByIdStub)
    await sut.handle(makeFakeRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })
})
