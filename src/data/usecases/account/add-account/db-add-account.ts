import { AddAccount, AddAccountParams, AccountModel, Hasher, AddAccountRepository, LoadAccountByEmailRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add (accountData: AddAccountParams): Promise<AccountModel> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    if (!account) {
      accountData.role = 'user'
      const hashedPassword = await this.hasher.hash(accountData.password)
      const newAccount: any = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
      return newAccount
    }
    return null
  }
}
