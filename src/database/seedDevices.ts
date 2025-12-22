// src/database/seedDevices.ts
// Script untuk mengisi tabel devices dengan data dummy pengembangan

import db from './schema';

export const seedDevices = (pondId: number) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO devices (pond_id, name, serial_number, status) VALUES (?, ?, ?, ?);',
      [pondId, 'Feeder 1', 'SN-001', 'active']
    );
    tx.executeSql(
      'INSERT INTO devices (pond_id, name, serial_number, status) VALUES (?, ?, ?, ?);',
      [pondId, 'Feeder 2', 'SN-002', 'inactive']
    );
  });
};
