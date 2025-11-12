// file: screens/auth/LoginScreen.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomInput from '../../components/custominput';
import CustomButton from '../../components/custombutton';

// IMPOR NAVIGASI 
import { StackNavigationProp } from '@react-navigation/stack';
// Pastikan Anda mengimpor RootStackParamList jika 'main' adalah bagian dari root navigator Anda.
// ASUMSI: Aplikasi utama Anda menggunakan nama rute 'main' pada navigator utamanya.
import { AuthStackParamList } from '../../navigation/authnavigator'; 

// --- START PERBAIKAN TIPE NAVIGASI ---
// Anda perlu menambahkan tipe untuk 'main' yang diasumsikan sebagai rute di Root Navigator Anda.
// Biasanya, ketika navigasi keluar dari Auth Stack, Anda akan menggunakan 'Root Stack'
// atau tipe gabungan yang mencakup rute 'main' (navigator utama aplikasi).

// Perluas AuthStackParamList dengan rute 'main' yang akan menggantikan seluruh stack
// Jika Anda memiliki 'RootStackParamList', lebih baik impor dan gunakan itu.
// Untuk tujuan perbaikan cepat ini, kita tambahkan 'main' sebagai rute yang tidak terdefinisi (undefined)
// yang akan diakses melalui `navigation.replace`.
// JIKA Anda menggunakan Navigation Container dengan Root Stack, pastikan Anda 
// mendefinisikannya dengan benar di file tipe navigasi Anda.

// Di sini, kita akan membuat tipe sementara yang memungkinkan navigasi ke 'main'.
// CATATAN: Dalam aplikasi nyata, 'main' harus didefinisikan dalam RootStackParamList Anda.
type ExtendedAuthStackParamList = AuthStackParamList & {
    main: undefined; // Asumsi 'main' adalah nama rute untuk Main/Home Navigator Anda
};

// Definisikan Tipe Props Navigasi
type LoginScreenNavigationProp = StackNavigationProp<ExtendedAuthStackParamList, 'Login'>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}
// --- END PERBAIKAN TIPE NAVIGASI ---

const { width } = Dimensions.get('window');

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = () => {
    // Di sini seharusnya ada logika otentikasi
    console.log('Login successful. Navigating to Main App...');
    
    // PERBAIKAN UTAMA:
    // Gunakan `navigation.replace('main')` untuk mengganti seluruh Auth Stack
    // dengan Main Stack. Ini akan menghapus riwayat login sehingga pengguna 
    // tidak dapat kembali ke layar login dengan tombol kembali.
    navigation.replace('main'); // 'main' adalah nama rute navigator utama Anda

    // CATATAN: Jika Anda menggunakan `navigation.navigate('main')`, 
    // pastikan 'main' sudah didefinisikan sebagai bagian dari Root Stack 
    // yang dapat dijangkau oleh Auth Stack. `replace` lebih disukai di sini.
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {/* Header Logo dan Nama Aplikasi (Diasumsikan sudah ada) */}
        <Image source={require('../../../assets/uf.png')} style={styles.logo}
        />
        <View style={styles.appNameContainer}>
            <Text style={styles.appNamePrimary}>SMAFEED-</Text>
            <Text style={styles.appNameU}>U</Text>
            <Text style={styles.appNameF}>F</Text>
        </View>

        <View style={styles.formContainer}>
          <CustomInput
            iconName="mail"
            placeholder="Alamat Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setMail}
          />

          <CustomInput
            iconName="lock"
            placeholder="Password"
            isPassword={true}
            value={password}
            onChangeText={setPassword}
            passwordVisible={passwordVisible}
            onToggleVisibility={() => setPasswordVisible(!passwordVisible)}
          />

          {/* LINK LUPA PASSWORD */}
          <TouchableOpacity 
            style={styles.forgotPasswordButton}
            onPress={() => navigation.navigate('ForgotPassword')} // NAVIGASI KE FORGOT PASSWORD
          >
            <Text style={styles.forgotPasswordText}>Lupa Password?</Text>
          </TouchableOpacity>
          
          <CustomButton 
            title="Masuk" 
            onPress={handleLogin} // Memanggil fungsi handleLogin yang telah diperbaiki
            style={{ marginTop: 30 }} 
          />
          
          {/* TOMBOL DAFTAR */}
          <CustomButton 
            title="Daftar" 
            variant="outline" 
            onPress={() => navigation.navigate('Register')} // NAVIGASI KE REGISTER
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// ... (Gaya/Styles Anda)
const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#fff' },
    container: { flexGrow: 1, alignItems: 'center', paddingTop: 50, paddingBottom: 20 },
    appNameContainer: {
    flexDirection: 'row', // Agar teks berada dalam satu baris
    marginBottom: 40,
},
appNamePrimary: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: '#000', // Warna untuk SMAFEED
},
appNameU: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: '#10c916', // Warna untuk -UF
},
appNameF: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: '#DDB443', // Warna untuk -UF
},
    logo: {
        width: 60, // Sesuaikan ukuran
        height: 60,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    formContainer: { width: width, alignItems: 'center' },
    forgotPasswordButton: { alignSelf: 'flex-end', marginRight: width * 0.05, marginBottom: 20 },
    forgotPasswordText: { color: '#1E88E5', fontSize: 14, fontWeight: '600' },
});

export default LoginScreen;