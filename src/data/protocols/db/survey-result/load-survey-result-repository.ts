export interface LoadSurveyResultRepository{
  loadBySurveyId: (surveyId: string, accountId?: string) => Promise<any>
}
