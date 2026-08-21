import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import bcrypt from "bcryptjs";

const dataDir = path.join(__dirname, "..", "..", "data");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = process.env.DB_PATH || path.join(dataDir, "database.sqlite");

export const db = new Database(dbPath);

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS etudiants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    prenom TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    age INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  );
`);

const etudiantsCount = db
  .prepare("SELECT COUNT(*) as count FROM etudiants")
  .get() as { count: number };

if (etudiantsCount.count === 0) {
  const insert = db.prepare(
    "INSERT INTO etudiants (nom, prenom, email, age) VALUES (?, ?, ?, ?)"
  );
  insert.run("Rakoto", "Jean", "jean.rakoto@mail.com", 20);
  insert.run("Rasoa", "Marie", "marie.rasoa@mail.com", 22);
}

const usersCount = db
  .prepare("SELECT COUNT(*) as count FROM users")
  .get() as { count: number };

if (usersCount.count === 0) {
  const insertUser = db.prepare(
    "INSERT INTO users (username, password) VALUES (?, ?)"
  );
  insertUser.run("admin", bcrypt.hashSync("admin123", 10));
}
