// file: App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Impor Navigator yang sudah Anda buat
import AuthNavigator from './src/navigation/authnavigator';

export default function App() {
  return (
    // 1. SafeAreaProvider: Menangani area aman (notch, bar notifikasi) pada perangkat.
    <SafeAreaProvider>
      {/* 2. NavigationContainer: Wajib ada di root untuk mengelola status navigasi. */}
      <NavigationContainer>
        {/* 3. AuthNavigator: Stack yang berisi Login, Register, dan Forgot Password. */}
        <AuthNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
