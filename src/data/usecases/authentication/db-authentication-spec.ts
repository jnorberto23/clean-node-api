import { AccountModel } from '../../../domain/models/account'
import { AuthenticationModel } from '../../../domain/usecases/authentication'
import { LoadAcountByEmailRepository } from '../../protocols/load-account-by-email-repository'
import { DbAuthentication } from './db-authentication'

const makeFakeAccount = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@email.com',
  password: 'any_password'
})

const makeFakeAuthentication = (): AuthenticationModel => ({
  email: 'any_email@email.com',
  password: 'any_password'
})
const makeLoadAccountByEmailRepository = (): LoadAcountByEmailRepository => {
  class LoadAcountByEmailRepositoryStub implements LoadAcountByEmailRepository {
    async load (email: string): Promise<AccountModel> {
      return await new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new LoadAcountByEmailRepositoryStub()
}

interface SutTypes {
  sut: DbAuthentication
  loadAcountByEmailRepositoryStub: LoadAcountByEmailRepository
}
const makeSut = (): SutTypes => {
  const loadAcountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const sut = new DbAuthentication(loadAcountByEmailRepositoryStub)

  return {
    sut,
    loadAcountByEmailRepositoryStub
  }
}

describe('DbAuthentication Usecase', () => {
  test('Should call LoadAcoountByEmailRepository with correct email ', async () => {
    const { sut, loadAcountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAcountByEmailRepositoryStub, 'load')
    await sut.auth(makeFakeAuthentication())
    expect(loadSpy).toHaveBeenCalledWith('any_email@email.com')
  })
})
