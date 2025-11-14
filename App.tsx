import 'react-native-gesture-handler';
import React from 'react';
import { AuthProvider, useAuth } from './src/context/AuthContext';
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


const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <RootStack.Screen name="Main" component={MainNavigator} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const App: React.FC = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

// Pastikan Anda mengekspor komponen utama untuk di-render
export default App;