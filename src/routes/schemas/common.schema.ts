export const errorResponseSchema = {
  type: 'object',
  required: ['error', 'message'],
  properties: {
    error: {
      type: 'string',
      description: 'Machine readable error code.',
      examples: ['PLAYER_NOT_FOUND']
    },
    message: {
      type: 'string',
      description: 'Human readable explanation of the failure.',
      examples: ['Player with id 999 was not found']
    }
  }
} as const;

export const healthSchema = {
  tags: ['Health'],
  summary: 'Liveness probe',
  description:
    'Returns the current status of the application. Used by orchestrators to know whether the service is up.',
  response: {
    200: {
      description: 'The application is up and running.',
      type: 'object',
      required: ['status'],
      properties: {
        status: {
          type: 'string',
          examples: ['ok']
        }
      }
    }
  }
} as const;
