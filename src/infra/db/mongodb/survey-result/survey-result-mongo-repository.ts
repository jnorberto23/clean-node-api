import { SaveSurveyResultRepository, SurveyResultModel } from '../../../../data/usecases/survey-result/save-survey-result/db-save-survey-result-protocols'
import { MongoHelper } from '../helpers/mongo-helpers'

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  async save (data: any): Promise<SurveyResultModel> {
    const surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    const res: any = await surveyResultCollection.findOneAndUpdate({
      surveyId: data.surveyId,
      accountId: data.accountId
    }, {
      $set: {
        answer: data.answer,
        date: data.date
      }
    }, {
      upsert: true
    })
    if (res.value) {
      return res.value && MongoHelper.map(res.value, res.value._id)
    } else {
      const survey: any = await surveyResultCollection.findOne({ _id: res.lastErrorObject.upserted })
      return survey && MongoHelper.map(survey, survey._id)
    }
  }
}
