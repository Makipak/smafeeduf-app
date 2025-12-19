import { useAuth } from '../../context/AuthContext';
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
    const { logout } = useAuth();
  const insets = useSafeAreaInsets();
  
  // Asumsi: Kita berada di Tab 'Setting', jadi header bawaan tab sudah ada.
  // Namun, karena gambar menunjukkan header custom, kita buat header tersebut.

  const handleLogout = () => {
    // Logika Logout: set auth ke false
    console.log("Tombol Logout ditekan. Melakukan proses keluar...");
    logout();
  }  

  // ...existing code...
  
  const handleEditProfile = () => {
    console.log("Tombol Edit Profile ditekan.");
    // Navigasi ke halaman edit profil (jika ada)
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Pengaturan</Text>
        <Text style={styles.headerSubtitle}>Kelola Akun & Preferensi</Text>
      </View>
      <View style={styles.bodyRounded}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Info Akun */}
          <View style={styles.sectionBox}>
            <Text style={styles.sectionTitle}>Akun</Text>
            <View style={styles.infoRow}><Text style={styles.infoLabel}>Nama:</Text><Text style={styles.infoValue}>{DUMMY_USER.name}</Text></View>
            <View style={styles.infoRow}><Text style={styles.infoLabel}>Email:</Text><Text style={styles.infoValue}>{DUMMY_USER.email}</Text></View>
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile} activeOpacity={0.8}>
              <Ionicons name="create-outline" size={18} color="#2C5C52" />
              <Text style={styles.editButtonText}>Edit Profil</Text>
            </TouchableOpacity>
          </View>

          {/* Preferensi */}
          <View style={styles.sectionBox}>
            <Text style={styles.sectionTitle}>Preferensi</Text>
            <View style={styles.infoRow}><Text style={styles.infoLabel}>Notifikasi:</Text><Text style={styles.infoValue}>Aktif</Text></View>
            <View style={styles.infoRow}><Text style={styles.infoLabel}>Bahasa:</Text><Text style={styles.infoValue}>Indonesia</Text></View>
          </View>

          {/* Tombol Logout */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

// === STYLING ===
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  headerContainer: {
    backgroundColor: '#2C5C52',
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
  },
  bodyRounded: {
    flex: 1,
    width: '100%',
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    paddingTop: 10,
  },
  scrollContent: {
    paddingHorizontal: width * 0.05,
    paddingTop: 20,
    paddingBottom: 40,
  },
  sectionBox: {
    backgroundColor: '#F7F7F7',
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C5C52',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  infoLabel: {
    fontWeight: '600',
    color: '#555',
  },
  infoValue: {
    color: '#222',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'flex-start',
    backgroundColor: '#EDEDED',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  editButtonText: {
    marginLeft: 6,
    color: '#2C5C52',
    fontWeight: 'bold',
    fontSize: 15,
  },
  logoutButton: {
    backgroundColor: '#DDB443',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 30,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SettingScreen;