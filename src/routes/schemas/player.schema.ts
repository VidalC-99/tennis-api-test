export const getPlayersSchema = {
  querystring: {
    type: 'object',
    properties: {
      country: {
        type: 'string',
        minLength: 3,
        maxLength: 3
      }
    }
  }
} as const;

export const createPlayerSchema = {
  body: {
    type: 'object',
    required: [
      'firstname',
      'lastname',
      'shortname',
      'sex',
      'country',
      'picture',
      'data'
    ],
    additionalProperties: false,
    properties: {
      firstname: {
        type: 'string',
        minLength: 1
      },
      lastname: {
        type: 'string',
        minLength: 1
      },
      shortname: {
        type: 'string',
        minLength: 1
      },
      sex: {
        type: 'string',
        enum: ['M', 'F']
      },
      country: {
        type: 'object',
        required: ['picture', 'code'],
        additionalProperties: false,
        properties: {
          picture: {
            type: 'string'
          },
          code: {
            type: 'string',
            minLength: 3,
            maxLength: 3
          }
        }
      },
      picture: {
        type: 'string'
      },
      data: {
        type: 'object',
        required: [
          'rank',
          'points',
          'weight',
          'height',
          'age',
          'last'
        ],
        additionalProperties: false,
        properties: {
          rank: {
            type: 'integer',
            minimum: 1
          },
          points: {
            type: 'integer',
            minimum: 0
          },
          weight: {
            type: 'integer',
            minimum: 0
          },
          height: {
            type: 'integer',
            minimum: 0
          },
          age: {
            type: 'integer',
            minimum: 0
          },
          last: {
            type: 'array',
            items: {
              type: 'integer',
              enum: [0, 1]
            }
          }
        }
      }
    }
  }
} as const;