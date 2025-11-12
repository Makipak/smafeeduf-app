// file: screens/main/DeviceListScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { MainStackParamList } from '../../navigation/mainnavigator'; // Impor tipe Stack Anda

const { width } = Dimensions.get('window');

// Definisikan tipe props untuk rute ini
// Menerima pondId dan pondName dari navigasi
type DeviceListScreenProps = StackScreenProps<MainStackParamList, 'DeviceList'>; 

interface Device {
  id: number;
  name: string;
  isActive: boolean;
}

const DUMMY_DEVICES: Device[] = [
  // Contoh perangkat, isActive: false sesuai dengan "Feeder 1" di gambar
  { id: 1, name: 'Feeder 1', isActive: false }, 
  { id: 2, name: 'Pompa Udara', isActive: true }, 
  { id: 3, name: 'Sensor pH', isActive: true }, 
];

const DeviceListScreen: React.FC<DeviceListScreenProps> = ({ route, navigation }) => {
  // Ambil data yang dilewatkan dari PondListScreen
  const { pondId, pondName } = route.params; 
  const [devices, setDevices] = useState<Device[]>(DUMMY_DEVICES);

  useEffect(() => {
    // Log atau set judul header jika Anda menggunakan header bawaan React Navigation
    console.log(`Menampilkan perangkat untuk Kolam: ${pondName} (ID: ${pondId})`);
  }, [pondId, pondName]);
  
  const handleAddDevice = () => {
    console.log("Menavigasi ke Tambah Perangkat untuk Kolam:", pondName);
    // Logika penambahan perangkat baru
  };

  const renderDeviceCard = (device: Device) => (
    <TouchableOpacity 
      key={device.id} 
      style={styles.card}
      onPress={() => console.log('Buka detail perangkat', device.name)}
      activeOpacity={0.7}
    >
      <View>
        <Text style={styles.cardTitle}>{device.name}</Text>
        <Text style={[styles.cardSubtitle, device.isActive ? styles.activeText : styles.inactiveText]}>
          {device.isActive ? 'Aktif' : 'Tidak Aktif'}
        </Text>
      </View>
      <TouchableOpacity 
        onPress={(e) => {
          e.stopPropagation(); // Mencegah klik card saat mengklik opsi
          console.log('Opsi Perangkat', device.name);
        }}
      >
        <MaterialCommunityIcons name="dots-vertical" size={24} color="#000" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* HEADER HIJAU GELAP */}
      <View style={styles.headerContainer}>
        {/* Tambahkan tombol kembali jika diperlukan (tidak terlihat di gambar, tapi baik untuk UX) */}
        {/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity> */}
        <Text style={styles.headerTitle}>Daftar Perangkat</Text>
        {/* Menampilkan nama kolam yang dikunjungi sebagai subtitle */}
        <Text style={styles.headerSubtitle}>{pondName || 'Kolam Detail'}</Text> 
      </View>

      {/* BODY KONTEN */}
      <View style={styles.bodyContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {devices.map(renderDeviceCard)}
          
          {devices.length === 0 && (
            <Text style={styles.noDeviceText}>Tidak ada perangkat terdaftar.</Text>
          )}
        </ScrollView>
      </View>
      
      {/* FLOATING ACTION BUTTON (+) */}
      <TouchableOpacity 
        style={styles.fab} 
        onPress={handleAddDevice}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons name="plus" size={30} color="#fff" />
      </TouchableOpacity>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  
  // === HEADER STYLES ===
  headerContainer: {
    backgroundColor: '#005930', 
    paddingTop: 10,
    paddingBottom: 40,
    alignItems: 'center',
    width: '100%',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    // Di layar Daftar Perangkat, subtitle ini bisa dihilangkan jika tidak dibutuhkan
    display: 'none', 
  },
  
  // === BODY & CARD STYLES ===
  bodyContainer: {
    flex: 1,
    width: '100%',
    marginTop: -30, 
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#fff', 
    overflow: 'hidden',
  },
  scrollContent: {
    paddingHorizontal: width * 0.05,
    paddingTop: 20,
    paddingBottom: 100, 
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, 
    borderLeftWidth: 5, 
    borderLeftColor: '#DDB443', // Warna Kuning
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  activeText: {
    color: '#10c916', // Status Aktif (Hijau)
  },
  inactiveText: {
    color: '#FF6347', // Status Tidak Aktif (Merah/Oranye)
  },
  noDeviceText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#999',
  },
  
  // === FLOATING ACTION BUTTON STYLES ===
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 80, 
    backgroundColor: '#DDB443', 
    borderRadius: 28,
    elevation: 8,
  },
});

export default DeviceListScreen;