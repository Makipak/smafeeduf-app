import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, StyleSheet, View, Text } from 'react-native'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CompositeScreenProps } from '@react-navigation/native'; // Ditambahkan untuk typing lanjutan

// 💡 PERBAIKAN IMPORT: Mengasumsikan nama komponen diexport sebagai default atau bernama
import PondListScreen from '../screens/main/pondlist'; // Menggantikan 'pondlist'
import DeviceListScreen from '../screens/main/daftarperangkat'; // Menggantikan 'daftarperangkat' jika itu adalah DeviceListScreen

// Layar Dummy untuk Tab yang Belum Dibuat
const FoodScreen = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Pangan</Text></View>; 
const SettingScreen = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Setting</Text></View>; 

// --- TIPE 1: Bottom Tab Navigator ---
// Definisi ini cocok dengan yang ada di navigation/types.ts dari percakapan sebelumnya
export type MainTabParamList = {
  Pond: undefined;
  Food: undefined;
  Setting: undefined;
};
const Tab = createBottomTabNavigator<MainTabParamList>();


// --- TIPE 2: Root Stack Navigator ---
// 💡 PERBAIKAN: MainTabs HARUS didefinisikan di StackParamList karena Stack memanggilnya
export type MainStackParamList = {
    MainTabs: undefined; // Tambahkan rute ini
    DeviceList: { pondId: number; pondName: string };
    AddPond: undefined; // Rute tambahan yang mungkin dinavigasi dari PondList
};
const Stack = createStackNavigator<MainStackParamList>();


// Definisikan Path Ikon Lokal Anda
const ICONS = {
    pond: {
        active: require('../../assets/icons/kolam_aktif.png'), 
        inactive: require('../../assets/icons/kolam_inactive.png'), 
    },
    food: {
        active: require('../../assets/icons/pangan_aktif.png'), 
        inactive: require('../../assets/icons/pangan_inactive.png'), 
    },
    setting: {
        active: require('../../assets/icons/settings_aktif.png'),
        inactive: require('../../assets/icons/settings_inactive.png'),
    },
};

// 1. Komponen Bottom Tab
const MainTabs: React.FC = () => {
    const insets = useSafeAreaInsets();
    return (
        <Tab.Navigator
            initialRouteName="Pond"
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#fff', 
                tabBarInactiveTintColor: '#ccc', 
                tabBarStyle: {
                    backgroundColor: '#005930', 
                    height: 60 + insets.bottom,
                    paddingBottom: 5 + insets.bottom,
                },
            }}
        >
            <Tab.Screen
                name="Pond"
                component={PondListScreen} // Menggunakan nama komponen yang sudah dikoreksi
                options={{
                    title: 'Kolam',
                    tabBarIcon: ({ focused }) => (
                        <Image source={focused ? ICONS.pond.active : ICONS.pond.inactive} style={styles.icon} />
                    ),
                }}
            />
            <Tab.Screen
                name="Food"
                component={FoodScreen}
                options={{
                    title: 'Pangan',
                    tabBarIcon: ({ focused }) => (
                        <Image source={focused ? ICONS.food.active : ICONS.food.inactive} style={styles.icon} />
                    ),
                }}
            />
            <Tab.Screen
                name="Setting"
                component={SettingScreen}
                options={{
                    title: 'Setting',
                    tabBarIcon: ({ focused }) => (
                        <Image source={focused ? ICONS.setting.active : ICONS.setting.inactive} style={styles.icon} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

// 2. Komponen Root Stack Navigator
const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator 
        initialRouteName="MainTabs"
        screenOptions={{ headerShown: false }}
    >
      {/* Rute utama yang memuat Bottom Tabs */}
      <Stack.Screen name="MainTabs" component={MainTabs} /> 
      
      {/* Rute detail (tidak menampilkan Bottom Tabs) */}
      <Stack.Screen 
        name="DeviceList" 
        component={DeviceListScreen} 
      />
      {/* Rute detail lain yang mungkin dibutuhkan */}
      <Stack.Screen 
        name="AddPond" 
        component={FoodScreen} // Ganti dengan AddPondScreen yang sebenarnya
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
    icon: {
        width: 24, 
        height: 24,
        resizeMode: 'contain',
    },
});

export default MainNavigator;