import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
  Modal,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { MainStackParamList } from '../../navigation/mainnavigator';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import MonitoringKolam from "./monitoringkolam";

const { width } = Dimensions.get('window');

type DaftarPerangkatProps = StackScreenProps<MainStackParamList, 'DeviceList'>;

interface Device {
  id: number;
  name: string;
  isActive: boolean;
}



const DaftarPerangkat: React.FC<DaftarPerangkatProps> = ({
  route,
  navigation,
}) => {
  const { pondName, pondId } = route.params || {};
  const [devices, setDevices] = useState<Device[]>([]);
    // Database
    React.useEffect(() => {
      const loadDevices = async () => {
        try {
          const { initDatabase } = await import('../../database/schema');
          const { getDevicesByPond } = await import('../../database/deviceService');
          initDatabase();
          if (pondId) {
            const dbDevices = await getDevicesByPond(pondId);
            setDevices(dbDevices.map((d: any) => ({
              id: d.id,
              name: d.name,
              isActive: d.status === 'active',
            })));
          }
        } catch (e) {
          // Handle error
        }
      };
      loadDevices();
    }, [pondId]);
  const [activeTab, setActiveTab] = useState<'perangkat' | 'pangan'>('perangkat');
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const insets = useSafeAreaInsets();

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

  const handleAddDevice = () => navigation.navigate('CariPerangkat');

  const handleDeleteDevice = async (id: number) => {
    try {
      const { deleteDevice } = await import('../../database/deviceService');
      await deleteDevice(id);
      setDevices((prev) => prev.filter((device) => device.id !== id));
    } catch (e) {
      // Handle error
    }
    setConfirmDeleteVisible(false);
    setDeleteId(null);
  };

  const renderDeviceCard = (device: Device) => (
    <TouchableOpacity
      key={device.id}
      style={styles.card}
      onPress={() => navigation.navigate('DetailPerangkat', { deviceName: device.name })}
      activeOpacity={0.7}
    >
      <View>
        <Text style={styles.cardTitle}>{device.name}</Text>
        <Text
          style={[
            styles.cardSubtitle,
            device.isActive ? styles.activeText : styles.inactiveText,
          ]}
        >
          {device.isActive ? 'Aktif' : 'Tidak Aktif'}
        </Text>
      </View>
      <TouchableOpacity
        onPress={(e) => {
          e.stopPropagation();
          setDeleteId(device.id);
          setConfirmDeleteVisible(true);
        }}
      >
        <MaterialCommunityIcons name="dots-vertical" size={24} color="#000" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderContent = () => {
    if (activeTab === 'perangkat') {
      return (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {devices.map(renderDeviceCard)}
          {devices.length === 0 && (
            <Text style={styles.noDeviceText}>Tidak ada perangkat terdaftar.</Text>
          )}
        </ScrollView>
      );
    }

    return (
      <MonitoringKolam
        pondId={pondId}
        pondName={pondName}
        navigation={navigation}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header berubah sesuai tab */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>
          {activeTab === "perangkat" ? "Daftar Perangkat" : "Monitoring Kolam"}
        </Text>
        <Text style={styles.headerSubtitle}>{pondName}</Text>
      </View>
      <View style={styles.bodyRounded}>
        {renderContent()}
      </View>
      {/* MODAL KONFIRMASI HAPUS */}
      {confirmDeleteVisible && (
        <Modal
          transparent
          visible={confirmDeleteVisible}
          animationType="fade"
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)' }}>
            <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 24, width: '80%' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Hapus Perangkat?</Text>
              <Text style={{ marginBottom: 24 }}>Apakah Anda yakin ingin menghapus perangkat ini?</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <TouchableOpacity onPress={() => setConfirmDeleteVisible(false)} style={{ marginRight: 16 }}>
                  <Text style={{ color: '#2C5C52', fontWeight: 'bold' }}>Batal</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteDevice(deleteId!)}>
                  <Text style={{ color: '#FF6347', fontWeight: 'bold' }}>Hapus</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* FAB hanya muncul di perangkat */}
      {activeTab === "perangkat" && (
        <TouchableOpacity
          style={[styles.fab, { bottom: 75 + insets.bottom }]}
          onPress={handleAddDevice}
        >
          <MaterialCommunityIcons name="plus" size={30} color="#fff" />
        </TouchableOpacity>
      )}

      {/* BOTTOM TABS */}
      <View style={[styles.bottomNav, { paddingBottom: insets.bottom }]}>
        {/* PERANGKAT */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            setActiveTab('perangkat');
            animateTab('perangkat');
          }}
        >
          <Animated.View style={{ transform: [{ scale: scalePerangkat }] }}>
            <Image
              source={
                activeTab === 'perangkat'
                  ? require('../../../assets/icons/perangkat_aktif.png')
                  : require('../../../assets/icons/perangkat_inactive.png')
              }
              style={styles.navIcon}
            />
          </Animated.View>
          <Text
            style={
              activeTab === 'perangkat' ? styles.navLabelActive : styles.navLabelInactive
            }
          >
            Perangkat
          </Text>
        </TouchableOpacity>

        {/* PANGAN */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            setActiveTab('pangan');
            animateTab('pangan');
          }}
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
            style={
              activeTab === 'pangan' ? styles.navLabelActive : styles.navLabelInactive
            }
          >
            Pangan
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

/* ==========================================
   STYLES
========================================== */
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  headerContainer: {
    backgroundColor: '#2C5C52',
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
  },
  bodyRounded: {
    flex: 1,
    width: '100%',
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    paddingTop: 10,
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
    borderLeftWidth: 5,
    borderLeftColor: '#DDB443',
    elevation: 3,
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  cardSubtitle: { fontSize: 14, fontWeight: '600' },
  activeText: { color: '#10c916' },
  inactiveText: { color: '#FF6347' },
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
    backgroundColor: '#DDB443',
    borderRadius: 16,
    elevation: 8,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: '#2C5C52',
    width: '100%',
    height: 85,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  navItem: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  navIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  navLabelActive: {
    color: '#fff',
    fontSize: 13,
    marginTop: 3,
    fontWeight: '600',
  },
  navLabelInactive: { color: '#ccc', fontSize: 12, marginTop: 3 },
});

export default DaftarPerangkat;
