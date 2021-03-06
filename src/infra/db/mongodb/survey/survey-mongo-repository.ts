import { AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'
import { SurveyModel } from '@/domain/models/survey'
import { AddSurveyParams } from '@/domain/usecases/survey/add-survey'
import { ObjectId } from 'mongodb'
import { LoadSurveyByIdRepository } from '../../../../data/usecases/survey/load-survey-by-id/db-load-survey-protocols'
import { MongoHelper } from '../helpers/mongo-helpers'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository {
  async add (surveyData: AddSurveyParams): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('surveys')
    const result = await accountCollection.insertOne(surveyData)
    return MongoHelper.map(surveyData, result.insertedId)
  }

  async loadAll (): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const surveys: any = await surveyCollection.find().toArray()
    surveys.forEach(survey => {
      survey.id = survey._id
    })
    return surveys
  }

  async loadById (id: any): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const survey: any = surveyCollection.findOne({ _id: new ObjectId(id) })
    return survey
  }
}
