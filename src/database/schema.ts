// src/database/schema.ts
// Skema dan inisialisasi database SQLite untuk perangkat dan relasinya

import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('smafeeduf.db');

export const initDatabase = () => {
  db.transaction(tx => {
    // Tabel users
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        name TEXT,
        phone TEXT,
        address TEXT,
        password_hash TEXT
      );`
    );
    // Tabel ponds
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS ponds (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        name TEXT,
        FOREIGN KEY(user_id) REFERENCES users(id)
      );`
    );
    // Tabel devices
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS devices (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pond_id INTEGER,
        name TEXT,
        serial_number TEXT,
        status TEXT,
        FOREIGN KEY(pond_id) REFERENCES ponds(id)
      );`
    );
    // Tabel device_monitoring
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS device_monitoring (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        device_id INTEGER,
        timestamp TEXT,
        ph REAL,
        feed_duration INTEGER,
        FOREIGN KEY(device_id) REFERENCES devices(id)
      );`
    );
    // Tabel device_schedule
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS device_schedule (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        device_id INTEGER,
        feed_time TEXT,
        created_at TEXT,
        FOREIGN KEY(device_id) REFERENCES devices(id)
      );`
    );
  });
};

export default db;
