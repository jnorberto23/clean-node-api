import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { LoadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token-repository'
import { UpdateAccessTokenRepository } from '@/data/protocols/db/account/update-access-token-repository'
import { AccountModel } from '@/domain/models/account'
import { AddAccountParams } from '@/domain/usecases/account/add-account'
import { MongoHelper } from '../helpers/mongo-helpers'

export class AccountMongoRepository implements
AddAccountRepository,
LoadAccountByEmailRepository,
UpdateAccessTokenRepository,
LoadAccountByTokenRepository {
  async add (accountData: AddAccountParams): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    return MongoHelper.map(accountData, result.insertedId)
  }

  async loadByEmail (email: string): Promise<any> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      email
    })
    return account && MongoHelper.map(account, account._id)
  }

  async updateAccessToken (id: any, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')

    await accountCollection.findOneAndUpdate(
      { _id: id },
      { $set: { accessToken: token } }
    )
  }

  async loadByToken (token: string, role?: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      accessToken: token,
      $or: [{
        role
      }, {
        role: 'admin'
      }]
    })
    return account && MongoHelper.map(account, account._id)
  }
}
