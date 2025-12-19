import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MonitoringHeader from '../../components/monitoring';
import { StackScreenProps } from '@react-navigation/stack';
import { MainStackParamList } from '../../navigation/mainnavigator';

type PanganScreenProps = StackScreenProps<MainStackParamList, 'Pangan'>;

const { width } = Dimensions.get('window');

// ==== DUMMY DATA ====
const GLOBAL_PONDS = [
  { id: 1, name: "Kolam A", devices: 2, pakanPerHari: 1.2, avgPh: 6.9 },
  { id: 2, name: "Kolam B", devices: 1, pakanPerHari: 0.7, avgPh: 7.2 },
  { id: 3, name: "Kolam C", devices: 3, pakanPerHari: 2.3, avgPh: 7.0 },
];

const PanganScreen: React.FC<PanganScreenProps> = ({ navigation }) => {
  const totalPerangkat = GLOBAL_PONDS.reduce((a, b) => a + b.devices, 0);
  const totalPakanPerHari = GLOBAL_PONDS.reduce((a, b) => a + b.pakanPerHari, 0);
  const avgPhGlobal = (
    GLOBAL_PONDS.reduce((a, b) => a + b.avgPh, 0) / GLOBAL_PONDS.length
  ).toFixed(2);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Pangan Global</Text>
        <Text style={styles.headerSubtitle}>Ringkasan & Analisis Semua Kolam</Text>
      </View>
      {/* BODY ROUNDED */}
      <View style={styles.bodyRounded}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* GLOBAL SUMMARY */}
          <View style={styles.summaryBox}>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Total Perangkat Aktif</Text>
              <Text style={styles.statValue}>{totalPerangkat} unit</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Total Pakan / Hari</Text>
              <Text style={styles.statValue}>{totalPakanPerHari.toFixed(1)} kg</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Rata-rata pH Air</Text>
              <Text style={styles.statValue}>{avgPhGlobal}</Text>
            </View>
          </View>
          <Text style={styles.sectionTitleSmall}>Analisis Per Kolam</Text>
          {GLOBAL_PONDS.map((pond) => (
            <TouchableOpacity
              key={pond.id}
              style={styles.card}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate("MonitoringKolam", {
                  pondId: pond.id,
                  pondName: pond.name,
                })
              }
            >
              <View>
                <Text style={styles.cardTitle}>{pond.name}</Text>
                <Text style={styles.cardSubtitle}>Perangkat: {pond.devices}</Text>
                <Text style={styles.cardSubtitle}>Pakan / Hari: {pond.pakanPerHari.toFixed(1)} kg</Text>
                <Text style={styles.cardSubtitle}>pH Rata-rata: {pond.avgPh}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

// Ganti seluruh blok style lama dengan style baru yang konsisten
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
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: "center",
    marginBottom: 20,
  },
  sectionTitleSmall: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 30,
    marginBottom: 10,
  },
  summaryBox: {
    backgroundColor: '#F6F6F6',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statLabel: { color: '#888', fontWeight: '600' },
  statValue: { color: '#222', fontWeight: 'bold' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    elevation: 2,
    borderLeftWidth: 5,
    borderLeftColor: '#DDB443',
  },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  cardSubtitle: { fontSize: 14, color: '#666', marginTop: 2 },
});

export default PanganScreen;
