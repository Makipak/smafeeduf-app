// src/navigation/mainnavigator.tsx
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";

// === Import screens ===
import PondList from "../screens/main/pondlist";
import Pangan from "../screens/main/pangan";
import Setting from "../screens/main/settings";
import CariPerangkat from "../screens/DaftarPerangkat/cariperangkat";
import DaftarPerangkat from "../screens/DaftarPerangkat/daftarperangkat";
import DetailPerangkat from "../screens/DetailPerangkat/detailperangkat";
import MonitoringDetailPerangkat from "../screens/DetailPerangkat/monitoringDetailperangkat";
import SettingScreen from "../screens/main/settings";
import MonitoringKolam from "../screens/DaftarPerangkat/monitoringkolam";

// ✅ 1. Tab navigator hanya buat 3 tab
export type MainTabParamList = {
  Pond: undefined;
  Pangan: undefined;
  Setting: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: { backgroundColor: "#2C5C52", height: 70 },
      tabBarShowLabel: true,
      tabBarLabelStyle: { color: "#fff", fontSize: 12 },
    }}
  >
    <Tab.Screen
      name="Pond"
      component={PondList}
      options={{
        tabBarLabel: "Kolam",
        tabBarIcon: ({ focused }) => (
          <Image
            source={
              focused
                ? require("../../assets/icons/kolam_aktif.png")
                : require("../../assets/icons/kolam_inactive.png")
            }
            style={{ width: 22, height: 22 }}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Pangan"
      component={Pangan}
      options={{
        tabBarLabel: "Pangan",
        tabBarIcon: ({ focused }) => (
          <Image
            source={
              focused
                ? require("../../assets/icons/pangan_aktif.png")
                : require("../../assets/icons/pangan_inactive.png")
            }
            style={{ width: 22, height: 22 }}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Setting"
      component={SettingScreen}
      options={{
        tabBarLabel: "Setting",
        tabBarIcon: ({ focused }) => (
          <Image
            source={
              focused
                ? require("../../assets/icons/settings_aktif.png")
                : require("../../assets/icons/settings_inactive.png")
            }
            style={{ width: 22, height: 22 }}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

// ✅ 2. Stack navigator untuk navigasi antar-screen
export type MainStackParamList = {
  MainTab: { screen: keyof MainStackParamList } | undefined;
  DeviceList: { pondId: number; pondName: string };
  CariPerangkat: undefined;
  DetailPerangkat: { deviceName: string };
  MonitoringPangan: { stokPakan: number };
  Pangan: undefined;
  MonitoringGlobal: { summary: string };
  MonitoringKolam: { pondId: number; pondName: string };
};

const Stack = createStackNavigator<MainStackParamList>();

const MainNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MainTab" component={MainTabNavigator} />
    <Stack.Screen name="DeviceList" component={DaftarPerangkat} />
    <Stack.Screen name="CariPerangkat" component={CariPerangkat} />
    <Stack.Screen name="DetailPerangkat" component={DetailPerangkat} />
    <Stack.Screen
      name="MonitoringPangan"
      component={MonitoringDetailPerangkat}
    />
    <Stack.Screen
    name="MonitoringKolam"
    component={MonitoringKolam}
    />
  </Stack.Navigator>
);

export default MainNavigator;
