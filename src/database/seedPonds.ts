// src/database/seedPonds.ts
// Script untuk mengisi tabel ponds dengan data dummy pengembangan

import db from './schema';

export const seedPonds = (userId: number) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO ponds (user_id, name) VALUES (?, ?);',
      [userId, 'Kolam A']
    );
    tx.executeSql(
      'INSERT INTO ponds (user_id, name) VALUES (?, ?);',
      [userId, 'Kolam B']
    );
  });
};
