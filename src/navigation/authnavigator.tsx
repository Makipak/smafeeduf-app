import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import Screens yang Anda sebutkan
import LoginScreen from '../screens/auth/LoginScreen';
// Asumsi Anda memiliki screen ini
import RegisterScreen from '../screens/auth/register'; 
import ForgotPasswordScreen from '../screens/auth/forgotpassword'; 

// --- TIPE AUTH STACK ---
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

const AuthStack = createStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;