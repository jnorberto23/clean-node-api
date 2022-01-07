import { AccountModel, AddAccount, AddAccountParams } from '@/presentation/controllers/login/signup/signup-protocols-controller'
import { mockAccountModel } from '@/domain/test'
import { Authentication, AuthenticationParams } from '@/domain/usecases/account/authentication'
import { LoadAccountByToken } from '@/presentation/middlewares/auth-protocols-middleware'

export const mockAddAccount = (): AddAccount => {
  class AddAccountSpy implements AddAccount {
    async add (account: AddAccountParams): Promise<AccountModel> {
      return await Promise.resolve(mockAccountModel())
    }
  }
  return new AddAccountSpy()
}

export const mockAuthentication = (): Authentication => {
  class AuthenticationSpy implements Authentication {
    async auth (authentication: AuthenticationParams): Promise<string> {
      return await Promise.resolve('any_token')
    }
  }
  return new AuthenticationSpy()
}

export const mockLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenSpy implements LoadAccountByToken {
    async load (accessToken: string, role?: string): Promise<AccountModel> {
      return await Promise.resolve(mockAccountModel())
    }
  }
  return new LoadAccountByTokenSpy()
}

export class LoadAccountByTokenSpy implements LoadAccountByToken {
  accessToken: string
  role: string
  result = {
    id: 'any_id'
  }

  async load (accessToken: string, role?: string): Promise<any> {
    this.accessToken = accessToken
    this.role = role
    return this.result
  }
}
