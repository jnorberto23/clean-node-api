import { AccountModel } from '../../../domain/models/account'
import { LoadAcountByEmailRepository } from '../../protocols/load-account-by-email-repository'
import { DbAuthentication } from './db-authentication'

describe('DbAuthentication Usecase', () => {
  test('Should call LoadAcoountByEmailRepository with correct email ', async () => {
    class LoadAcountByEmailRepositoryStub implements LoadAcountByEmailRepository {
      async load (email: string): Promise<AccountModel> {
        const account: AccountModel = {
          id: 'any_id',
          name: 'any_name',
          email: 'any_email@email.com',
          password: 'any_password'
        }
        return await new Promise(resolve => resolve(account))
      }
    }
    const loadAcoountByEmailRepositoryStub = new LoadAcountByEmailRepositoryStub()
    const sut = new DbAuthentication(loadAcoountByEmailRepositoryStub)
    const loadSpy = jest.spyOn(loadAcoountByEmailRepositoryStub, 'load')
    await sut.auth({
      email: 'any_email@email.com',
      password: 'any_password'
    })
    expect(loadSpy).toHaveBeenCalledWith('any_email@email.com')
  })
})
