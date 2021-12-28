import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'
import { LoadAcountByEmailRepository } from '../../protocols/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  private readonly loadAcountByEmailRepository: LoadAcountByEmailRepository
  constructor (loadAcoountByEmailRepository: LoadAcountByEmailRepository) {
    this.loadAcountByEmailRepository = loadAcoountByEmailRepository
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    await this.loadAcountByEmailRepository.load(authentication.email)
    return null
  }
}
