export const addSurveyParamsSchema = {
  type: 'object',
  properties: {
    question: {
      type: 'string'
    },
    answers: {
      type: 'array',
      items: {
        $ref: '#/schemas/surveyAnswer'
      }
    },
    didAnswer: {
      type: 'boolean'
    }
  },
  required: ['id', 'question', 'answers', 'date', 'didAnswer']
}
