import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { MainStackParamList } from '../../navigation/mainnavigator';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

type DeviceListScreenProps = StackScreenProps<MainStackParamList, 'DeviceList'>;

interface Device {
  id: number;
  name: string;
  isActive: boolean;
}

const DUMMY_DEVICES: Device[] = [
  { id: 1, name: 'Feeder 1', isActive: false },
];

const DeviceListScreen: React.FC<DeviceListScreenProps> = ({ route, navigation }) => {
  const { pondId, pondName } = route.params;
  const [devices, setDevices] = useState<Device[]>(DUMMY_DEVICES);
  const [activeTab, setActiveTab] = useState<'perangkat' | 'pangan'>('perangkat');
  const insets = useSafeAreaInsets();

  // Animasi skala ikon untuk dua tab
  const scalePerangkat = useRef(new Animated.Value(1.2)).current;
  const scalePangan = useRef(new Animated.Value(1)).current;

  const animateTab = (tab: 'perangkat' | 'pangan') => {
    if (tab === 'perangkat') {
      Animated.parallel([
        Animated.spring(scalePerangkat, { toValue: 1.2, useNativeDriver: true }),
        Animated.spring(scalePangan, { toValue: 1, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(scalePerangkat, { toValue: 1, useNativeDriver: true }),
        Animated.spring(scalePangan, { toValue: 1.2, useNativeDriver: true }),
      ]).start();
    }
  };

  useEffect(() => {
    console.log(`Menampilkan perangkat untuk Kolam: ${pondName} (ID: ${pondId})`);
  }, [pondId, pondName]);

  const handleAddDevice = () => {
    console.log("Menavigasi ke Tambah Perangkat untuk Kolam:", pondName);
  };

  const handleTabPress = (tab: 'perangkat' | 'pangan') => {
    setActiveTab(tab);
    animateTab(tab);

    if (tab === 'pangan') {
      navigation.navigate('MainTabs', { screen: 'Food' });
    }
  };

  const renderDeviceCard = (device: Device) => (
    <TouchableOpacity
      key={device.id}
      style={styles.card}
      onPress={() => console.log('Buka detail perangkat', device.name)}
      activeOpacity={0.7}
    >
      <View>
        <Text style={styles.cardTitle}>{device.name}</Text>
        <Text style={[styles.cardSubtitle, device.isActive ? styles.activeText : styles.inactiveText]}>
          {device.isActive ? 'Aktif' : 'Tidak Aktif'}
        </Text>
      </View>
      <TouchableOpacity
        onPress={(e) => {
          e.stopPropagation();
          console.log('Opsi Perangkat', device.name);
        }}
      >
        <MaterialCommunityIcons name="dots-vertical" size={24} color="#000" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Daftar Perangkat</Text>
        <Text style={styles.headerSubtitle}>{pondName || 'Kolam Detail'}</Text>
      </View>

      {/* BODY */}
      <View style={styles.bodyContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {devices.map(renderDeviceCard)}
          {devices.length === 0 && <Text style={styles.noDeviceText}>Tidak ada perangkat terdaftar.</Text>}
        </ScrollView>
      </View>

      {/* FAB */}
      <TouchableOpacity style={styles.fab} onPress={handleAddDevice} activeOpacity={0.8}>
        <MaterialCommunityIcons name="plus" size={30} color="#fff" />
      </TouchableOpacity>

      {/* === BOTTOM NAVIGATION (DUA TAB DENGAN ANIMASI) === */}
      <View style={[styles.bottomNav, { paddingBottom: 0 + insets.bottom }]}>
        {/* TAB PERANGKAT */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleTabPress('perangkat')}
          activeOpacity={0.8}
        >
          <Animated.View style={{ transform: [{ scale: scalePerangkat }] }}>
            <Image
              source={
                activeTab === 'perangkat'
                  ? require('../../../assets/icons/kolam_aktif.png')
                  : require('../../../assets/icons/kolam_inactive.png')
              }
              style={styles.navIcon}
            />
          </Animated.View>
          <Text
            style={activeTab === 'perangkat' ? styles.navLabelActive : styles.navLabelInactive}
          >
            Perangkat
          </Text>
        </TouchableOpacity>

        {/* TAB PANGAN */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleTabPress('pangan')}
          activeOpacity={0.8}
        >
          <Animated.View style={{ transform: [{ scale: scalePangan }] }}>
            <Image
              source={
                activeTab === 'pangan'
                  ? require('../../../assets/icons/pangan_aktif.png')
                  : require('../../../assets/icons/pangan_inactive.png')
              }
              style={styles.navIcon}
            />
          </Animated.View>
          <Text
            style={activeTab === 'pangan' ? styles.navLabelActive : styles.navLabelInactive}
          >
            Pangan
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// === STYLING ===
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  headerContainer: {
    backgroundColor: '#005930',
    paddingTop: 10,
    paddingBottom: 40,
    alignItems: 'center',
    width: '100%',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    display: 'none',
  },
  bodyContainer: {
    flex: 1,
    width: '100%',
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  scrollContent: {
    paddingHorizontal: width * 0.05,
    paddingTop: 20,
    paddingBottom: 120,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: '#DDB443',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  activeText: {
    color: '#10c916',
  },
  inactiveText: {
    color: '#FF6347',
  },
  noDeviceText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#999',
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    top: 669,
    backgroundColor: '#DDB443',
    borderRadius: 16,
    elevation: 8,
  },

  // === BOTTOM NAVIGATION ===
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: '#005930',
    width: '100%',
    height: 110,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: '#004520',
  },
  navItem: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  navIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  navLabelActive: { color: '#fff', fontSize: 13, marginTop: 3, fontWeight: '600' },
  navLabelInactive: { color: '#ccc', fontSize: 12, marginTop: 3 },
});

export default DeviceListScreen;
