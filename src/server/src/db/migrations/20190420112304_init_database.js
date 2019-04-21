exports.up = knex => (
  knex
    .schema

    // TAGS
    .createTable('tags', (table) => {
      table.timestamps(true, true);
      table
        .increments('id')
        .primary();

      table
        .string('name')
        .unique()
        .notNullable();
    })

    // Reactions
    .createTable('reactions', (table) => {
      table.timestamps();
      table
        .increments('id')
        .primary();

      table
        .string('icon')
        .notNullable();

      table
        .string('name')
        .unique()
        .notNullable();

      table
        .float('vote_weight')
        .notNullable()
        .defaultTo(1.0);
    })

    // USERS
    .createTable('users', (table) => {
      table.timestamps(true, true);

      table
        .integer('permission_level')
        .notNullable()
        .defaultTo(0);

      table
        .text('jwt_refresh_token')
        .defaultTo(null);

      table
        .increments('id')
        .primary();
    })

    // EXTERNAL DESCRIPTORS
    // Date fetched from website if user paste URL
    .createTable('external_websites_meta_descriptors', (table) => {
      table.timestamps(true, true);
      table
        .increments('id')
        .primary();

      table
        .text('website_url', 'text')
        .notNullable();

      table.text('meta_title');
      table.text('meta_description');
      table.text('meta_keywords');

      table.text('og_image');
    })

    // ARTICLES
    .createTable('articles', (table) => {
      table.timestamps(true, true);
      table
        .increments('id')
        .primary();

      table.string('cover_image', 500);

      table.string('cover_title', 250);

      table.string('lead', 500);

      table
        .string('title', 500)
        .notNullable();

      table
        .text('content', 'longtext')
        .notNullable();

      table
        .integer('user_id')
        .unsigned()
        .index()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE'); // if parrent is deleted

      table
        .integer('external_descriptor_id')
        .unsigned()
        .index()
        .notNullable()
        .references('id')
        .inTable('external_websites_meta_descriptors');
    })

    // Articles Tags
    .createTable('article_tags', (table) => {
      table.timestamps();

      table
        .integer('article_id')
        .unsigned()
        .references('id')
        .inTable('articles')
        .onDelete('CASCADE');

      table
        .integer('tag_id')
        .unsigned()
        .references('id')
        .inTable('tags')
        .onDelete('CASCADE');

      table.unique(['article_id', 'tag_id']);
    })

    // Article Reactions
    .createTable('article_users_reactions', (table) => {
      table.timestamps(true, true);

      table
        .integer('article_id')
        .unsigned()
        .references('id')
        .inTable('articles')
        .onDelete('CASCADE');

      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');

      table
        .integer('reaction_id')
        .unsigned()
        .references('id')
        .inTable('reactions')
        .onDelete('CASCADE');

      table.unique(['article_id', 'user_id']);
    })

    // Article Users Votes
    .createTable('article_users_votes', (table) => {
      table.timestamps(true, true);

      table
        .integer('article_id')
        .unsigned()
        .references('id')
        .inTable('articles')
        .onDelete('CASCADE');

      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');

      table
        .float('vote_weight')
        .notNullable()
        .defaultTo(1.0);

      table.unique(['article_id', 'user_id']);
    })

    // Article Users Visits
    .createTable('article_users_visits', (table) => {
      table.timestamps(true, true);

      table
        .integer('article_id')
        .unsigned()
        .references('id')
        .inTable('articles')
        .onDelete('CASCADE');

      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');

      table.unique(['article_id', 'user_id']);
    })
);

exports.down = knex => (
  knex
    .schema
    .dropTableIfExists('article_users_reactions')
    .dropTableIfExists('article_tags')
    .dropTableIfExists('article_users_visits')
    .dropTableIfExists('article_users_votes')
    .dropTableIfExists('articles')
    .dropTableIfExists('external_websites_meta_descriptors')
    .dropTableIfExists('users')
    .dropTableIfExists('tags')
    .dropTableIfExists('reactions')
);
