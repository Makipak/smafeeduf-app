import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Animated,
  Image,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { MainTabParamList, MainStackParamList } from '../../navigation/mainnavigator';

const { width } = Dimensions.get('window');

type PondListScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Pond'>,
  StackScreenProps<MainStackParamList>
>;

interface Pond {
  id: number;
  name: string;
  deviceCount: number;
}

const DUMMY_PONDS: Pond[] = [{ id: 1, name: 'Kolam A', deviceCount: 1 }];

const PondList: React.FC<PondListScreenProps> = ({ navigation }) => {
  const [ponds, setPonds] = useState<Pond[]>(DUMMY_PONDS);
  const [modalVisible, setModalVisible] = useState(false);
  const [pondName, setPondName] = useState('');
  const [activeTab, setActiveTab] = useState<'kolam' | 'pangan'>('kolam');
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const insets = useSafeAreaInsets();

  // animasi icon tab
  const scaleKolam = useRef(new Animated.Value(1.2)).current;
  const scalePangan = useRef(new Animated.Value(1)).current;

  const animateTab = (tab: 'kolam' | 'pangan') => {
    Animated.parallel([
      Animated.spring(scaleKolam, {
        toValue: tab === 'kolam' ? 1.2 : 1,
        useNativeDriver: true,
      }),
      Animated.spring(scalePangan, {
        toValue: tab === 'pangan' ? 1.2 : 1,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleTabPress = (tab: 'kolam' | 'pangan') => {
    setActiveTab(tab);
    animateTab(tab);
    if (tab === 'pangan') {
      navigation.navigate('Pangan'); // ke tab pangan
    }
  };

  const handleAddPond = () => setModalVisible(true);

  const handleSavePond = () => {
    if (!pondName.trim()) return;
    const newPond: Pond = {
      id: ponds.length + 1,
      name: pondName.trim(),
      deviceCount: 0,
    };
    setPonds((prev) => [...prev, newPond]);
    setPondName('');
    setModalVisible(false);
  };

  const handleDeletePond = (id: number) => {
    setPonds((prev) => prev.filter((pond) => pond.id !== id));
    setConfirmDeleteVisible(false);
    setDeleteId(null);
  };

  const renderPondCard = (pond: Pond) => (
    <TouchableOpacity
      key={pond.id}
      style={styles.card}
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate('DeviceList', { pondId: pond.id, pondName: pond.name })
      }
    >
      <View>
        <Text style={styles.cardTitle}>{pond.name}</Text>
        <Text style={styles.cardSubtitle}>{pond.deviceCount} Perangkat</Text>
      </View>
      <TouchableOpacity
        onPress={(e) => {
          e.stopPropagation();
          setDeleteId(pond.id);
          setConfirmDeleteVisible(true);
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
        <Text style={styles.headerTitle}>Daftar Kolam</Text>
        <Text style={styles.headerSubtitle}>Selamat Datang, JaneDoe</Text>
      </View>
      {/* BODY */}
      <View style={styles.bodyContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {ponds.length > 0 ? (
            ponds.map(renderPondCard)
          ) : (
            <Text style={styles.noPondText}>Anda belum memiliki kolam.</Text>
          )}
        </ScrollView>
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
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Hapus Kolam?</Text>
              <Text style={{ marginBottom: 24 }}>Apakah Anda yakin ingin menghapus kolam ini?</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <TouchableOpacity onPress={() => setConfirmDeleteVisible(false)} style={{ marginRight: 16 }}>
                  <Text style={{ color: '#2C5C52', fontWeight: 'bold' }}>Batal</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeletePond(deleteId!)}>
                  <Text style={{ color: '#FF6347', fontWeight: 'bold' }}>Hapus</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
      {/* FLOATING BUTTON */}
      <TouchableOpacity
        style={[styles.fab, { bottom: insets.bottom }]}
        activeOpacity={0.85}
        onPress={handleAddPond}
      >
        <MaterialCommunityIcons name="plus" size={30} color="#fff" />
      </TouchableOpacity>

      {/* MODAL TAMBAH KOLAM */}
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Tambah Kolam Baru</Text>
            <TextInput
              placeholder="Nama Kolam"
              placeholderTextColor="#aaa"
              value={pondName}
              onChangeText={setPondName}
              style={styles.input}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#DDB443' }]}
                onPress={handleSavePond}
              >
                <Text style={styles.modalButtonText}>Simpan</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#ccc' }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={[styles.modalButtonText, { color: '#333' }]}>Batal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },

  headerContainer: {
    backgroundColor: '#2C5C52',
    paddingTop: 10,
    paddingBottom: 40,
    alignItems: 'center',
    width: '100%',
  },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 5 },
  headerSubtitle: { fontSize: 16, color: '#fff', opacity: 0.8 },

  bodyContainer: {
    flex: 1,
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingHorizontal: width * 0.05,
    paddingTop: 20,
    paddingBottom: 150,
  },

  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: '#DDB443',
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#000', marginBottom: 2 },
  cardSubtitle: { fontSize: 14, color: '#666' },
  noPondText: { textAlign: 'center', marginTop: 50, color: '#999' },

  fab: {
    position: 'absolute',
    right: 20,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
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
    borderTopWidth: 0.5,
    borderTopColor: '#004520',
  },
  navItem: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  navIcon: { width: 26, height: 26, resizeMode: 'contain' },
  navLabelActive: { color: '#fff', fontSize: 13, marginTop: 3, fontWeight: '600' },
  navLabelInactive: { color: '#ccc', fontSize: 12, marginTop: 3 },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    color: '#000',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  modalButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default PondList;
