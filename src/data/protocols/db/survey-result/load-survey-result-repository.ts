import { SaveSurveyResultParams } from '@/domain/usecases/surveyResult/save-survey-result'

export interface SaveSurveyResultRepository{
  save: (data: SaveSurveyResultParams) => Promise<void>
}
