import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// Kita asumsikan MainStackParamList diimpor dari navigation/mainnavigator
import { MainStackParamList, MainTabParamList } from '../../navigation/mainnavigator'; 

const { width } = Dimensions.get('window');

// Tipe props (menggunakan CompositeScreenProps karena ini adalah Tab Screen)
type SettingScreenProps = StackScreenProps<MainTabParamList, 'Setting'>;

// Data Pengguna Dummy
const DUMMY_USER = {
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
};

const SettingScreen: React.FC<SettingScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  
  // Asumsi: Kita berada di Tab 'Setting', jadi header bawaan tab sudah ada.
  // Namun, karena gambar menunjukkan header custom, kita buat header tersebut.

  const handleLogout = () => {
    // Logika Logout Anda di sini
    console.log("Tombol Logout ditekan. Melakukan proses keluar...");
    
    // Contoh: Navigasi ke layar Login (perlu MainStackParamList diimpor)
    // navigation.navigate('AuthNavigator'); // Contoh jika AuthNavigator adalah rute di Root Stack
  };
  
  const handleEditProfile = () => {
    console.log("Tombol Edit Profile ditekan.");
    // Navigasi ke halaman edit profil (jika ada)
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER HIJAU GELAP (Sesuai Gambar) */}
      <View style={[styles.headerContainer, { paddingTop: 1 + insets.top }]}>
        {/* Ikon Edit di Kanan Atas */}
        <TouchableOpacity 
          style={styles.editButton} 
          onPress={handleEditProfile}
        >
          <Ionicons name="create-outline" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Ikon Avatar */}
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle-outline" size={80} color="#fff" />
        </View>

        {/* Nama Pengguna */}
        <Text style={styles.userName}>{DUMMY_USER.name}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* TOMBOL LOGOUT (Warna Emas/Kuning) */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

      </ScrollView>
      
      {/* Catatan: Bottom Tab Navigator dihandle oleh MainTabs Component */}
    </SafeAreaView>
  );
};

// === STYLING ===
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  
  headerContainer: {
    backgroundColor: '#2C5C52', // Hijau gelap
    width: '100%',
    paddingBottom: 10,
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  editButton: {
    position: 'absolute',
    top: 20, // Akan disesuaikan oleh insets.top
    right: 20,
    zIndex: 1,
    padding: 5,
  },
  avatarContainer: {
    marginTop: 1,
    // Kita gunakan ikon person-circle-outline sebagai avatar
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  
  scrollContent: {
    paddingHorizontal: width * 0.05,
    paddingTop: 30,
  },

  logoutButton: {
    backgroundColor: '#DDB443', // Warna Emas/Kuning
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#DDB443',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  placeholderText: {
      color: '#999',
      fontSize: 14,
  }
});

export default SettingScreen;