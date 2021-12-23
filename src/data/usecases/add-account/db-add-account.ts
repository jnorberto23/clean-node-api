import { AddAccount, AddAccountModel } from '../../../domain/usecases/add-account'
import { AccountModel } from '../../../domain/models/account'
import { Encrypter } from '../../protocols/encrypter'
import { Promise } from 'mongoose'

export class DbAddAccount implements AddAccount {
  private readonly encrypter
  constructor (encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    this.encrypter.encrypt(account.password)
    return new Promise(resolve => resolve(null))
  }
}
