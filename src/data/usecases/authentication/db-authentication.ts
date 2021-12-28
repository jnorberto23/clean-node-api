import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'
import { LoadAccountByEmailRepository } from '../../protocols/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  private readonly loadAcountByEmailRepository: LoadAccountByEmailRepository
  constructor (loadAcoountByEmailRepository: LoadAccountByEmailRepository) {
    this.loadAcountByEmailRepository = loadAcoountByEmailRepository
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    await this.loadAcountByEmailRepository.load(authentication.email)
    return null
  }
}
