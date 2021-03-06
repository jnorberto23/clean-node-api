import { SurveyResultMongoRepository } from '@/infra/db/mongodb/survey-result/survey-result-mongo-repository'
import { DbLoadSurveyResult } from '../../../../../data/usecases/survey-result/load-survey-result/db-load-survey-result'
import { LoadSurveyResult } from '../../../../../domain/usecases/surveyResult/load-survey-result'
import { SurveyMongoRepository } from '../../../../../infra/db/mongodb/survey/survey-mongo-repository'

export const makeDbLoadSurveyResult = (): LoadSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  const surveyMongoRepository = new SurveyMongoRepository()
  const dbLoadSurveyResult = new DbLoadSurveyResult(surveyResultMongoRepository, surveyMongoRepository)
  return dbLoadSurveyResult
}
