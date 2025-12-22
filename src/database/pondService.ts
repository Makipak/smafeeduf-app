// src/database/pondService.ts
// Service untuk operasi CRUD kolam pada database SQLite

import db from './schema';

export const getPondsByUser = (userId: number): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT ponds.*, (SELECT COUNT(*) FROM devices WHERE devices.pond_id = ponds.id) as deviceCount FROM ponds WHERE user_id = ?;',
        [userId],
        (_, { rows }) => resolve(rows._array),
        (_, error) => { reject(error); return false; }
      );
    });
  });
};

export const addPond = (userId: number, name: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO ponds (user_id, name) VALUES (?, ?);',
        [userId, name],
        () => resolve(),
        (_, error) => { reject(error); return false; }
      );
    });
  });
};

export const deletePond = (id: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM ponds WHERE id = ?;',
        [id],
        () => resolve(),
        (_, error) => { reject(error); return false; }
      );
    });
  });
};
