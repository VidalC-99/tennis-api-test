import { errorResponseSchema } from './common.schema.js';

const countrySchema = {
  type: 'object',
  required: ['picture', 'code'],
  additionalProperties: false,
  description: 'Country the player competes for.',
  properties: {
    picture: {
      type: 'string',
      description: 'URL of the country flag.',
      examples: ['https://example.com/switzerland.png']
    },
    code: {
      type: 'string',
      minLength: 3,
      maxLength: 3,
      description: 'Three letter country code.',
      examples: ['SUI']
    }
  }
} as const;

const playerDataSchema = {
  type: 'object',
  required: ['rank', 'points', 'weight', 'height', 'age', 'last'],
  additionalProperties: false,
  description: 'Sporting and physical data of the player.',
  properties: {
    rank: {
      type: 'integer',
      minimum: 1,
      description: 'Current world ranking, 1 being the best.',
      examples: [3]
    },
    points: {
      type: 'integer',
      minimum: 0,
      description: 'Points earned on the circuit.',
      examples: [2500]
    },
    weight: {
      type: 'integer',
      minimum: 0,
      description: 'Weight in grams.',
      examples: [85000]
    },
    height: {
      type: 'integer',
      minimum: 0,
      description: 'Height in centimeters.',
      examples: [185]
    },
    age: {
      type: 'integer',
      minimum: 0,
      description: 'Age in years.',
      examples: [37]
    },
    last: {
      type: 'array',
      description:
        'Results of the last matches, most recent last. 1 is a win, 0 is a loss.',
      items: {
        type: 'integer',
        enum: [0, 1]
      },
      examples: [[1, 1, 1, 1, 0]]
    }
  }
} as const;

const playerInputProperties = {
  firstname: {
    type: 'string',
    minLength: 1,
    description: 'Given name of the player.',
    examples: ['Roger']
  },
  lastname: {
    type: 'string',
    minLength: 1,
    description: 'Family name of the player.',
    examples: ['Federer']
  },
  shortname: {
    type: 'string',
    minLength: 1,
    description: 'Abbreviated name used on scoreboards.',
    examples: ['R.FED']
  },
  sex: {
    type: 'string',
    enum: ['M', 'F'],
    description: 'Circuit the player competes on.',
    examples: ['M']
  },
  country: countrySchema,
  picture: {
    type: 'string',
    description: 'URL of the player picture.',
    examples: ['https://example.com/federer.png']
  },
  data: playerDataSchema
} as const;

const playerInputRequired = [
  'firstname',
  'lastname',
  'shortname',
  'sex',
  'country',
  'picture',
  'data'
] as const;

export const playerSchema = {
  $id: 'Player',
  type: 'object',
  title: 'Player',
  description: 'A tennis player and their current statistics.',
  required: ['id', ...playerInputRequired],
  additionalProperties: false,
  properties: {
    id: {
      type: 'integer',
      description: 'Unique identifier of the player.',
      examples: [17]
    },
    ...playerInputProperties
  }
} as const;

export const playerStatsSchema = {
  $id: 'PlayerStats',
  type: 'object',
  title: 'PlayerStats',
  description: 'Aggregated statistics computed over every player.',
  required: ['bestCountry', 'averageIMC', 'medianHeight'],
  additionalProperties: false,
  properties: {
    bestCountry: {
      type: 'object',
      description: 'Country with the highest win ratio across its players.',
      required: ['code', 'winRatio'],
      additionalProperties: false,
      properties: {
        code: {
          type: 'string',
          minLength: 3,
          maxLength: 3,
          examples: ['SRB']
        },
        winRatio: {
          type: 'number',
          minimum: 0,
          maximum: 1,
          description: 'Ratio of won matches over played matches.',
          examples: [1]
        }
      }
    },
    averageIMC: {
      type: 'number',
      description: 'Average body mass index of every player.',
      examples: [23.36]
    },
    medianHeight: {
      type: 'number',
      description: 'Median height in centimeters of every player.',
      examples: [185]
    }
  }
} as const;

export const getPlayersSchema = {
  tags: ['Players'],
  summary: 'List players',
  description:
    'Returns every player sorted by rank, from the best to the worst. Optionally filtered by country.',
  querystring: {
    type: 'object',
    properties: {
      country: {
        type: 'string',
        minLength: 3,
        maxLength: 3,
        description: 'Three letter country code used to filter the players.',
        examples: ['SUI']
      }
    }
  },
  response: {
    200: {
      description: 'The players, sorted by rank.',
      type: 'array',
      items: { $ref: 'Player#' }
    },
    400: {
      description: 'The query string is invalid.',
      ...errorResponseSchema
    }
  }
} as const;

export const getPlayerByIdSchema = {
  tags: ['Players'],
  summary: 'Get a player',
  description: 'Returns a single player from its unique identifier.',
  params: {
    type: 'object',
    required: ['id'],
    additionalProperties: false,
    properties: {
      id: {
        type: 'integer',
        minimum: 1,
        description: 'Unique identifier of the player.',
        examples: [17]
      }
    }
  },
  response: {
    200: {
      description: 'The requested player.',
      $ref: 'Player#'
    },
    400: {
      description: 'The identifier is not a valid integer.',
      ...errorResponseSchema
    },
    404: {
      description: 'No player matches this identifier.',
      ...errorResponseSchema
    }
  }
} as const;

export const getPlayerStatsSchema = {
  tags: ['Players'],
  summary: 'Get global statistics',
  description:
    'Returns the country with the best win ratio, the average body mass index and the median height of every player.',
  response: {
    200: {
      description: 'The computed statistics.',
      $ref: 'PlayerStats#'
    },
    500: {
      description: 'Statistics cannot be computed, there is no player.',
      ...errorResponseSchema
    }
  }
} as const;

export const createPlayerSchema = {
  tags: ['Players'],
  summary: 'Create a player',
  description:
    'Adds a player to the collection. The identifier is generated by the API.',
  body: {
    type: 'object',
    title: 'CreatePlayerInput',
    description: 'The player to create, without its identifier.',
    required: [...playerInputRequired],
    additionalProperties: false,
    properties: playerInputProperties
  },
  response: {
    201: {
      description: 'The created player, with its generated identifier.',
      $ref: 'Player#'
    },
    400: {
      description:
        'The body is missing a required property, or carries an unknown one.',
      ...errorResponseSchema
    }
  }
} as const;
