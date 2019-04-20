import consola from 'consola';
import Knex from 'knex';
import {
  Model,
  knexSnakeCaseMappers,
} from 'objection';

import knexConfig from '../../../../knexfile';

const bootstrapKnexModels = () => {
  const knex = Knex(
    {
      ...knexConfig[process.env.NODE_ENV || 'development'],
      ...knexSnakeCaseMappers(),
    },
  );
  Model.knex(knex);

  consola.info('Knex/Objection.js models bootstraped!');
};

export default bootstrapKnexModels;
