import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import Navigators
import AuthNavigator from './src/navigation/authnavigator'; // Harus dibuat (lihat bagian 2)
import MainNavigator from './src/navigation/mainnavigator'; // Sudah kita perbaiki sebelumnya

// --- TIPE ROOT STACK ---
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined; // 💡 Rute ini yang dipanggil oleh LoginScreen.tsx
};

const RootStack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  // Simulasikan status otentikasi. 
  // Dalam aplikasi nyata, ini didapat dari Firebase/Redux/Context.
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false); 
  const [isLoading, setIsLoading] = useState(true);

  // Simulasikan pengecekan token/otentikasi saat aplikasi dimuat
  useEffect(() => {
    // Di sini akan ada logika async untuk memuat user/token
    setTimeout(() => {
      // Contoh: Anggap pengguna BELUM terotentikasi setelah 2 detik
      setUserIsAuthenticated(false); 
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    // Tampilkan layar loading atau splash screen
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Memuat Aplikasi...</Text>
        </View>
    );
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {/* Logika Switching: Jika terotentikasi, tampilkan Main. Jika tidak, tampilkan Auth. */}
        {userIsAuthenticated ? (
          <RootStack.Screen name="Main" component={MainNavigator} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

// Pastikan Anda mengekspor komponen utama untuk di-render
export default App;