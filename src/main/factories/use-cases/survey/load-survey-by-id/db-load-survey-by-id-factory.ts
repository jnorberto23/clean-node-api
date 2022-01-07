import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-repository'
import { DbLoadSurveyById } from '@/data/usecases/survey/load-survey-by-id/db-load-survey-by-id'

export const makeDbLoadSurveyById = (): DbLoadSurveyById => {
  const loadSurveyByIdRepository = new SurveyMongoRepository()
  const dbLoadSurveyById = new DbLoadSurveyById(loadSurveyByIdRepository)
  return dbLoadSurveyById
}
