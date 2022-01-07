import { LoadSurveyResult } from '../../../../domain/usecases/surveyResult/load-survey-result'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  forbidden,
  InvalidParamError,
  LoadSurveyById,
  serverError,
  ok
} from './load-survey-result-protocols-controller'

export class LoadSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById,
    private readonly loadSurveyResult: LoadSurveyResult
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const survey = await this.loadSurveyById.loadById(surveyId)
      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'))
      }
      const surveyResult = await this.loadSurveyResult.load(surveyId)
      return ok(surveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}
