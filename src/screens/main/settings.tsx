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
  };
  
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