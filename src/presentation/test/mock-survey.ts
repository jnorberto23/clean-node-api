import { SurveyModel } from '@/domain/models/survey'
import { AddSurvey, AddSurveyParams } from '@/domain/usecases/survey/add-survey'
import { LoadSurveys } from '@/domain/usecases/survey/load-surveys'
import { mockSurveyModels, mockSurveyResultModel } from '@/domain/test'
import { SaveSurveyResult, SaveSurveyResultParams, SurveyResultModel } from '../controllers/survey-result/save-survey-result/save-survey-result-protocols-controller'
import { LoadSurveyResult } from '../../domain/usecases/surveyResult/load-survey-result'

export const mockAddSurvey = (): AddSurvey => {
  class AddSurveySpy implements AddSurvey {
    async add (data?: AddSurveyParams): Promise<void> {
      return await Promise.resolve()
    }
  }
  return new AddSurveySpy()
}
export const makeLoadSurveys = (): LoadSurveys => {
  class LoadSurveysSpy implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return await Promise.resolve(mockSurveyModels())
    }
  }
  return new LoadSurveysSpy()
}
export const mockSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultSpy implements SaveSurveyResult {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return await Promise.resolve(mockSurveyResultModel())
    }
  }
  return new SaveSurveyResultSpy()
}

export const mockLoadSurveyResult = (): LoadSurveyResult => {
  class LoadSurveyResultSpy implements LoadSurveyResult {
    async load (surveyId: string): Promise<SurveyResultModel> {
      return await Promise.resolve(mockSurveyResultModel())
    }
  }
  return new LoadSurveyResultSpy()
}
