// src/database/deviceService.ts
// Service untuk operasi CRUD perangkat pada database SQLite

import db from './schema';

export const getDevicesByPond = (pondId: number): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM devices WHERE pond_id = ?;',
        [pondId],
        (_, { rows }) => resolve(rows._array),
        (_, error) => { reject(error); return false; }
      );
    });
  });
};

export const addDevice = (pondId: number, name: string, serial_number: string, status: string = 'active'): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO devices (pond_id, name, serial_number, status) VALUES (?, ?, ?, ?);',
        [pondId, name, serial_number, status],
        () => resolve(),
        (_, error) => { reject(error); return false; }
      );
    });
  });
};

export const deleteDevice = (id: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM devices WHERE id = ?;',
        [id],
        () => resolve(),
        (_, error) => { reject(error); return false; }
      );
    });
  });
};
