import { AddAccountRepository, Hasher, LoadAccountByEmailRepository } from './db-add-account-protocols'
import { DbAddAccount } from './db-add-account'
import { mockAccountModel, mockAccountParams, throwError } from '@/domain/test'
import { mockHasher, mockAccountRepository, mockLoadAccountByEmailRepository } from '@/data/test'

type SutTypes = {
  sut: DbAddAccount
  hasherSpy: Hasher
  addAccountRepositorySpy: AddAccountRepository
  loadAcountByEmailRepositorySpy: LoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const addAccountRepositorySpy = mockAccountRepository()
  const loadAcountByEmailRepositorySpy = mockLoadAccountByEmailRepository()
  jest.spyOn(loadAcountByEmailRepositorySpy, 'loadByEmail').mockReturnValue(Promise.resolve(null))
  const hasherSpy = mockHasher()
  const sut = new DbAddAccount(hasherSpy, addAccountRepositorySpy, loadAcountByEmailRepositorySpy)
  return {
    sut,
    hasherSpy,
    addAccountRepositorySpy,
    loadAcountByEmailRepositorySpy
  }
}
describe('DbAddAccount Usecase', () => {
  test('Should call Hasher with correct password', async () => {
    const { sut, hasherSpy } = makeSut()
    const hashSpy = jest.spyOn(hasherSpy, 'hash')
    await sut.add(mockAccountParams())
    expect(hashSpy).toHaveBeenCalledWith('any_password')
  })

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherSpy } = makeSut()
    jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(throwError)
    const promise = sut.add(mockAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositorySpy, 'add')
    await sut.add(mockAccountParams())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    jest.spyOn(addAccountRepositorySpy, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.add(mockAccountParams())
    expect(account).toEqual(mockAccountModel())
  })

  test('Should return null if LoadAccountByEmailRepository not return null', async () => {
    const { sut, loadAcountByEmailRepositorySpy } = makeSut()
    jest.spyOn(loadAcountByEmailRepositorySpy, 'loadByEmail').mockReturnValueOnce(Promise.resolve(mockAccountModel()))
    const account = await sut.add(mockAccountParams())
    expect(account).toBe(null)
  })

  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAcountByEmailRepositorySpy } = makeSut()
    const loadSpy = jest.spyOn(loadAcountByEmailRepositorySpy, 'loadByEmail')
    await sut.add(mockAccountParams())
    expect(loadSpy).toHaveBeenCalledWith('any_email@email.com')
  })
})
