import { LoadSurveyById } from '../save-survey-result/save-survey-result-protocols-controller'
import { Controller, HttpRequest, HttpResponse } from './load-survey-result-protocols-controller'

export class LoadSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadSurveyById.loadById(httpRequest.params.surveyId)
    return await Promise.resolve(null)
  }
}
