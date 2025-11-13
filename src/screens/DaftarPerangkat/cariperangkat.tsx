import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert, // Digunakan untuk menampilkan notifikasi "Nyalakan Bluetooth"
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Untuk ikon 'arrow-back'
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mendapatkan lebar layar untuk styling responsif
const { width } = Dimensions.get('window');

// --- PENTING: Penyesuaian Tipe Navigasi ---
// Asumsi: Kita menggunakan MainStackParamList seperti yang Anda definisikan sebelumnya.
// Karena layar ini mungkin dipanggil dari navigasi yang berbeda,
// kita bisa menggunakan tipe navigasi sederhana atau menyesuaikannya jika diperlukan.

// Anda bisa membuat sebuah StackParamList terpisah, atau menggunakan MainStackParamList
// yang sudah ada, jika rute ini ditambahkan ke dalamnya.
// Contoh menggunakan tipe dummy jika belum ditambahkan ke MainStackParamList:
type RootStackParamList = {
  CariPerangkat: undefined; // Rute untuk halaman ini
};
type CariPerangkatScreenProps = StackScreenProps<RootStackParamList, 'CariPerangkat'>;
// Ubah ke: StackScreenProps<MainStackParamList, 'CariPerangkat'> jika sudah terdaftar

const CariPerangkatScreen: React.FC<CariPerangkatScreenProps> = ({ navigation }) => {

  const handleCariPerangkat = () => {
    // 1. Logika di sini adalah hanya menampilkan Alert
    Alert.alert(
      "Bluetooth Mati",
      "Mohon nyalakan Bluetooth perangkat Anda untuk memulai pencarian.",
      [
        // Opsi (opsional, tapi disarankan)
        { text: "OK" }, 
        // Jika Anda ingin menambahkan opsi untuk langsung membuka Pengaturan Bluetooth (lebih kompleks, memerlukan pustaka)
      ]
    );
    console.log("Tombol Cari Perangkat ditekan. Menampilkan notif Bluetooth.");
    
    // Jika Anda memiliki implementasi BLE:
    // bleManager.enable().then(...)
  };

  const handleGoBack = () => {
    // Fungsi untuk kembali ke halaman sebelumnya
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* HEADER: Tombol Back dan Judul Sejajar */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={handleGoBack} 
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Daftar Perangkat</Text>
        {/* View kosong untuk memastikan judul berada di tengah */}
        <View style={styles.backButton} /> 
      </View>

      {/* KOTAK KOSONG: Area Tampilan Perangkat Bluetooth */}
      <View style={styles.bluetoothBox}>
        <Text style={styles.placeholderText}>
            Daftar Perangkat Bluetooth Terdekat
        </Text>
      </View>

      {/* BUTTON: Cari Perangkat */}
      <TouchableOpacity 
        style={styles.searchButton}
        onPress={handleCariPerangkat}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Cari Perangkat</Text>
      </TouchableOpacity>
      
    </SafeAreaView>
  );
};

// === STYLING ===
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 0, // Disesuaikan dengan SafeAreaView
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    // Jarak horizontal yang seragam
    paddingHorizontal: width * 0.05, 
    height: 60, // Tinggi header tetap
    borderBottomWidth: 0, // Hapus border jika tidak diperlukan
  },
  backButton: {
    // Lebar yang sama dengan View kosong di sebelah kanan
    width: 28, 
    height: 28,
  },
  title: {
    // Agar judul berada di tengah
    flex: 1, 
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  bluetoothBox: {
    // Area kotak hitam sesuai gambar
    width: width * 0.9, 
    height: width * 0.9, // Menjadikannya kotak (aspect ratio 1:1)
    backgroundColor: '#000',
    borderRadius: 15,
    marginVertical: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    // Memberi sedikit ruang vertikal
    flex: 1, 
    maxHeight: 400, // Batasan maksimum agar responsif di layar kecil/besar
  },
  placeholderText: {
    color: '#aaa',
    fontSize: 14,
    fontWeight: '300',
  },
  searchButton: {
    // Tombol hijau
    width: width * 0.9,
    backgroundColor: '#38b000', // Warna hijau yang cerah
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 30, // Jarak dari bawah
    // Memberikan shadow (Android dan iOS)
    shadowColor: '#38b000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CariPerangkatScreen;