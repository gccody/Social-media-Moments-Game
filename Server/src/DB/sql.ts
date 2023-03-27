import Database from 'better-sqlite3';
import { DBUser, User } from '../utils/types.js';
import { toNormalUser } from '../utils/utils.js';

export default class SQL {
  db = new Database('users.db')
  constructor() { 
    this.db.pragma('journal_mode = WAL;');
    this.createTable('users', `(
      username TEXT UNIQUE,
      uid TEXT UNIQUE,
      email TEXT UNIQUE,
      hashed TEXT,
      salt TEXT
    );`);
  }

  get(query: string) { return this.db.prepare(query).get() }
	all(query: string) { return this.db.prepare(query).all() }
	run(query: string) { return this.db.prepare(query).run() }

  createTable(name: string, values: string) { return this.run(`CREATE TABLE IF NOT EXISTS "${name}" ${values}`) }
	deleteTable(name: string) { return this.run(`DROP TABLE IF EXISTS "${name}"`) }

  users(uid?: string) {
    return {
      getByEmail: (email: string): DBUser => this.db.prepare('SELECT * FROM "users" WHERE email=?').get(email),
      getDb: (): DBUser => this.db.prepare('SELECT * FROM "users" WHERE uid=?').get(uid!),
      getNormal: (): User => toNormalUser(<DBUser>this.db.prepare('SELECT * FROM "users" WHERE uid=?').get(uid!)),
      create: (email: string, hashed_password: string, salt: string) => this.db.prepare('INSERT INTO "users" VALUES(?,?,?,?,?)').run(undefined, uid, email, hashed_password, salt),
      setUsername: (username: string) => this.db.prepare('UPDATE "users" SET username=? WHERE uid=? ').run(username, uid),
      delete: () => this.db.prepare('DELETE FROM "users" WHERE uid=?').run(uid),
      updatePassword: (hashed_password: string, salt: string) => this.db.prepare('UPDATE "users" SET hashed=? AND salt=? WHERE uid=?').run(hashed_password, salt, uid),
    }
  }
}