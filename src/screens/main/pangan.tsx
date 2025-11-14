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
      
      {/* FIX HEADER BIAR NAIK */}
      <View style={{ marginTop: -10 }}>
        <MonitoringHeader title="Monitoring Pangan" />
      </View>

      {/* BODY ROUNDED */}
      <View style={styles.bodyRounded}>
        <ScrollView contentContainerStyle={styles.scrollContent}>

          {/* GLOBAL SUMMARY */}
          <Text style={styles.sectionTitle}>Ringkasan Pangan Semua Kolam</Text>

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
              style={styles.pondCard}
              activeOpacity={0.75}
              onPress={() =>
                navigation.navigate("MonitoringKolam", {
                  pondId: pond.id,
                  pondName: pond.name,
                })
              }
            >
              <Text style={styles.pondName}>{pond.name}</Text>
              <Text style={styles.pondInfo}>Perangkat: {pond.devices}</Text>
              <Text style={styles.pondInfo}>
                Pakan / Hari: {pond.pakanPerHari.toFixed(1)} kg
              </Text>
              <Text style={styles.pondInfo}>pH Rata-rata: {pond.avgPh}</Text>
            </TouchableOpacity>
          ))}

        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // FIX: background harus putih biar tab bar gak double
  safeArea: { flex: 1, backgroundColor: '#fff' },

  // ROUNDED BODY yang natural
  bodyRounded: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: -25,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 25,
  },

  scrollContent: {
    paddingHorizontal: width * 0.05,
    paddingBottom: 40,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: "center",
    marginBottom: 20,
  },

  summaryBox: {
    backgroundColor: "#f5f5f5",
    padding: 18,
    borderRadius: 12,
    marginBottom: 25,
  },

  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },

  statLabel: { fontSize: 15, color: "#666" },
  statValue: { fontSize: 16, color: "#333", fontWeight: "bold" },

  sectionTitleSmall: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 10,
  },

  pondCard: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    marginBottom: 12,
  },

  pondName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },

  pondInfo: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
});

export default PanganScreen;
