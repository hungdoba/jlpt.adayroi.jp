import { pgTable, text, uuid, primaryKey } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
});

export const localStorage = pgTable(
  'local_storage',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    key: text('key').notNull(),
    value: text('value').notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.key] }),
  })
);
