import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'
import { HashComparer } from '../../protocols/criptography/hash-comparer'
import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  private readonly loadAcountByEmailRepository: LoadAccountByEmailRepository
  private readonly hashComparer: HashComparer
  constructor (loadAcoountByEmailRepository: LoadAccountByEmailRepository, hashComparer: HashComparer) {
    this.loadAcountByEmailRepository = loadAcoountByEmailRepository
    this.hashComparer = hashComparer
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAcountByEmailRepository.load(authentication.email)
    if (account) {
      await this.hashComparer.compare(authentication.password, account.password)
    }
    return null
  }
}
