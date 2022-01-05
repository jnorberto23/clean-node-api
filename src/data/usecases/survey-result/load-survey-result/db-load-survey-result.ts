import { SurveyResultModel } from '@/domain/models/survey-result'
import { LoadSurveyResult } from '@/domain/usecases/surveyResult/load-survey-result'
import { LoadSurveyResultRepository } from '../../../protocols/db/survey-result/save-survey-result-repository copy'

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor (private readonly loadSurveyResultRepository: LoadSurveyResultRepository) { }
  async load (surveyId: string): Promise<SurveyResultModel> {
    await this.loadSurveyResultRepository.loadBySurveyId(surveyId)
    return null
  }
}
