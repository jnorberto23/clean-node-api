import { AccountModel } from '../../domain/models/account'

export interface LoadAcountByEmailRepository{
  load: (email: string) => Promise<AccountModel>
}
