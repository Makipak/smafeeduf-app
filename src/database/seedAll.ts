// src/database/seedAll.ts
// Script untuk mengisi users, ponds, dan devices secara berurutan agar data dummy siap digunakan

import db from './schema';

export const seedAll = () => {
  db.transaction(tx => {
    // 1. Tambah user dummy
    tx.executeSql(
      'INSERT INTO users (email, name, phone, address, password_hash) VALUES (?, ?, ?, ?, ?);',
      ['dummy@mail.com', 'Penambak Dummy', '08123456789', 'Alamat Dummy', 'dummyhash'],
      (_, result) => {
        const userId = result.insertId;
        // 2. Tambah kolam dummy
        tx.executeSql(
          'INSERT INTO ponds (user_id, name) VALUES (?, ?);',
          [userId, 'Kolam A'],
          (_, result2) => {
            const pondId = result2.insertId;
            // 3. Tambah perangkat dummy
            tx.executeSql(
              'INSERT INTO devices (pond_id, name, serial_number, status) VALUES (?, ?, ?, ?);',
              [pondId, 'Feeder 1', 'SN-001', 'active']
            );
            tx.executeSql(
              'INSERT INTO devices (pond_id, name, serial_number, status) VALUES (?, ?, ?, ?);',
              [pondId, 'Feeder 2', 'SN-002', 'inactive']
            );
          }
        );
      }
    );
  });
};
