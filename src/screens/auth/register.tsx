// file: screens/auth/RegisterScreen.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomInput from '../../components/custominput';
import CustomButton from '../../components/custombutton';

// IMPOR NAVIGASI
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/authnavigator'; 

// Definisikan Tipe Props Navigasi
type RegisterScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Register'>;

interface RegisterScreenProps {
  navigation: RegisterScreenNavigationProp;
}

const { width } = Dimensions.get('window');

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => { // Menerima props 'navigation'
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleRegister = () => {
    console.log('Registration complete.');
    // Setelah daftar, mungkin navigasi kembali ke Login atau langsung ke Main App
    // navigation.navigate('Login'); 
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {/* Header (Diasumsikan sudah ada) */}
        <View style={styles.appNameContainer}>
            <Text style={styles.appNamePrimary}>SMAFEED-</Text>
            <Text style={styles.appNameU}>U</Text>
            <Text style={styles.appNameF}>F</Text>
        </View>

        <View style={styles.formContainer}>
          {/* ... (Semua CustomInput lainnya) */}
          <CustomInput iconName="mail" placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} />
          <CustomInput iconName="user" placeholder="Nama" value={name} onChangeText={setName} />
          <CustomInput iconName="phone" placeholder="Nomor Handphone" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
          <CustomInput iconName="home" placeholder="Alamat" value={address} onChangeText={setAddress} />
          <CustomInput iconName="lock" placeholder="Password" isPassword={true} value={password} onChangeText={setPassword} passwordVisible={passwordVisible} onToggleVisibility={() => setPasswordVisible(!passwordVisible)} />
          <CustomInput iconName="lock" placeholder="Konfirmasi Password" isPassword={true} value={confirmPassword} onChangeText={setConfirmPassword} passwordVisible={confirmPasswordVisible} onToggleVisibility={() => setConfirmPasswordVisible(!confirmPasswordVisible)} />
          
          <CustomButton 
            title="Daftar" 
            onPress={handleRegister} 
            style={{ marginTop: 20 }} 
          />
          
          {/* TOMBOL MASUK (KEMBALI KE LOGIN) */}
          <CustomButton 
            title="Masuk" 
            variant="outline" 
            onPress={() => navigation.navigate('Login')} // NAVIGASI KEMBALI KE LOGIN
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
        flexDirection: 'row',
        marginBottom: 40, // Jarak dari header ke form
    },
    appNamePrimary: { 
        fontSize: 32, 
        fontWeight: 'bold', 
        color: '#000', // Warna untuk SMAFEED
    },
    appNameU: { 
        fontSize: 32, 
        fontWeight: 'bold', 
        color: '#10c916', // Warna untuk -U
    },
    appNameF: { 
        fontSize: 32, 
        fontWeight: 'bold', 
        color: '#DDB443', // Warna untuk F
    },
    formContainer: { width: width, alignItems: 'center' },
});

export default RegisterScreen;