import { adaptResolver } from '../../adapters'
import { makeLoadSurveysController } from '../../factories/controllers/survey/load-surveys/load-surveys-controller-factory'

export default {
  Query: {
    surveys: async () =>
      await adaptResolver(makeLoadSurveysController())
  }
}
