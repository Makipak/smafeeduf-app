import React from 'react';
// 1. Impor fungsi untuk membuat Stack Navigator
import { createStackNavigator } from '@react-navigation/stack';

// 2. Impor Layar-Layar Otentikasi
import LoginScreen from '../screens/auth/LoginScreen'; 
import RegisterScreen from '../screens/auth/register'; 
import ForgotPasswordScreen from '../screens/auth/forgotpassword'; 

// --- Setup TypeScript ---
// 3. Definisikan Tipe untuk Parameter Rute (AuthStackParamList)
// Ini adalah map di mana kunci adalah nama rute, dan nilai adalah tipe parameter yang diterima.
export type AuthStackParamList = {
  Login: undefined;         // Tidak menerima parameter saat navigasi
  Register: undefined;      // Tidak menerima parameter saat navigasi
  ForgotPassword: undefined; // Tidak menerima parameter saat navigasi
};

// 4. Buat instance Stack Navigator
const AuthStack = createStackNavigator<AuthStackParamList>();

// --- Komponen Navigator ---
const AuthNavigator: React.FC = () => {
  return (
    // Stack.Navigator membungkus semua layar yang ada dalam stack ini
    <AuthStack.Navigator
      // Tentukan layar awal saat aplikasi pertama kali dibuka
      initialRouteName="Login"
      screenOptions={{
        // Menyembunyikan header bawaan di atas setiap layar
        headerShown: false, 
      }}
    >
      {/* 5. Definisikan semua rute/layar */}
      <AuthStack.Screen 
        name="Login" 
        component={LoginScreen} 
      />
      <AuthStack.Screen 
        name="Register" 
        component={RegisterScreen} 
      />
      <AuthStack.Screen 
        name="ForgotPassword" 
        component={ForgotPasswordScreen} 
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;