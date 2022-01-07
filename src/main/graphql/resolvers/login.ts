import { adaptResolver } from '../../adapters'
import { makeLoginController } from '../../factories/controllers/login/login/login-controller-factory'
import { makeSignUpController } from '../../factories/controllers/login/signup/signup-controller-factory'

export default {
  Query: {
    login: async (parent: any, args: any) =>
      await adaptResolver(makeLoginController(), args)
  },
  Mutation: {
    signUp: async (parent: any, args: any) =>
      await adaptResolver(makeSignUpController(), args)
  }
}
