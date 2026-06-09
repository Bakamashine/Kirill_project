import { app } from "electron";
import knex, { Knex } from "knex";
import path from "node:path";
import fs from "node:fs";

let db: Knex | null = null;

const migrations: { name: string; up: (db: Knex) => Promise<void>; down: (db: Knex) => Promise<void> }[] = [
  {
    name: "001_create_users_table",
    async up(knex) {
      const exists = await knex.schema.hasTable("users");
      if (!exists) {
        await knex.schema.createTable("users", (table) => {
          table.increments("id").primary();
          table.string("username").notNullable().unique();
          table.string("email").notNullable().unique();
          table.string("password_hash").notNullable();
          table.timestamps(true, true);
        });
      }
    },
    async down(knex) {
      await knex.schema.dropTableIfExists("users");
    },
  },
];

async function runMigrations(knexInstance: Knex): Promise<void> {
  const hasMigrationsTable = await knexInstance.schema.hasTable("_migrations");
  if (!hasMigrationsTable) {
    await knexInstance.schema.createTable("_migrations", (table) => {
      table.string("name").primary();
      table.timestamp("created_at").defaultTo(knexInstance.fn.now());
    });
  }

  const applied = await knexInstance("_migrations").select("name").orderBy("name");
  const appliedNames = new Set(applied.map((r: { name: string }) => r.name));

  for (const m of migrations) {
    if (!appliedNames.has(m.name)) {
      await m.up(knexInstance);
      await knexInstance("_migrations").insert({ name: m.name });
      console.log(`Migration applied: ${m.name}`);
    }
  }
}

export async function getDatabase(): Promise<Knex> {
  if (db) return db;

  const dbDir = path.join(app.getPath("userData"), "database");
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  db = knex({
    client: "better-sqlite3",
    connection: {
      filename: path.join(dbDir, "database.db"),
    },
    useNullAsDefault: true,
  });

  await runMigrations(db);
  return db;
}

export async function closeDatabase(): Promise<void> {
  if (db) {
    await db.destroy();
    db = null;
  }
}
