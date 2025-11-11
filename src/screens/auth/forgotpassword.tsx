// file: screens/auth/ForgotPasswordScreen.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomInput from '../../components/custominput';
import CustomButton from '../../components/custombutton';

// IMPOR NAVIGASI
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/authnavigator'; 

// Definisikan Tipe Props Navigasi
type ForgotPasswordScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'ForgotPassword'>;

interface ForgotPasswordScreenProps {
  navigation: ForgotPasswordScreenNavigationProp;
}

const { width } = Dimensions.get('window');

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleSendVerificationCode = () => {
    console.log('Sending verification code to:', email);
    // Setelah kode terkirim, mungkin navigasi ke layar verifikasi OTP
    // Jika tidak ada layar OTP, navigasi kembali ke Login:
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

        <Text style={styles.instructionText}>
          Masukkan Email Anda Untuk Menerima Kode Verifikasi
        </Text>

        <View style={styles.formContainer}>
          <CustomInput
            iconName="email-outline"
            placeholder="Email Anda"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          {/* TOMBOL MASUK (KIRIM KODE) */}
          <CustomButton
            title="Masuk"
            onPress={handleSendVerificationCode}
            style={{ marginTop: 20 }}
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
    instructionText: { textAlign: 'center', fontSize: 16, color: '#333', marginBottom: 40, width: width * 0.8 },
    formContainer: { width: width, alignItems: 'center' },
});

export default ForgotPasswordScreen;