import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";

const { width } = Dimensions.get("window");

const MonitoringKolam = ({ pondId, pondName, navigation, route }: any) => {
  const realPondId = pondId || route?.params?.pondId;
  const realPondName = pondName || route?.params?.pondName;

  const devices = [
    {
      id: 1,
      name: "Feeder 1",
      stok: 65,
      ph: 7.1,
      power: true,
      durasi: 2,
      jadwal: ["10:00", "14:00", "18:00"],
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <Text style={styles.sectionTitle}>
          Monitoring Kolam {realPondName}
        </Text>

        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>Statistik Kolam</Text>

          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Total Stok Pakan</Text>
            <Text style={styles.statValue}>
              {devices.map((d) => d.stok).reduce((a, b) => a + b, 0) / devices.length}%
            </Text>
          </View>

          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Rata-rata pH Air</Text>
            <Text style={styles.statValue}>
              {(
                devices.map((d) => d.ph).reduce((a, b) => a + b, 0) /
                devices.length
              ).toFixed(2)}
            </Text>
          </View>

          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Total Jadwal</Text>
            <Text style={styles.statValue}>
              {devices.map((d) => d.jadwal.length).reduce((a, b) => a + b, 0)} kali
            </Text>
          </View>

          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Durasi Penyebaran</Text>
            <Text style={styles.statValue}>
              {devices.map((d) => d.durasi).reduce((a, b) => a + b, 0) / devices.length} menit
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitleSmall}>Daftar Perangkat</Text>

        {devices.map((device) => (
          <View key={device.id} style={styles.deviceCard}>
            <Text style={styles.deviceName}>{device.name}</Text>
            <Text style={styles.deviceInfo}>Sisa Pakan: {device.stok}%</Text>
            <Text style={styles.deviceInfo}>pH Air: {device.ph}</Text>
            <Text
              style={[
                styles.deviceInfo,
                { color: device.power ? "#38b000" : "#b00020" },
              ]}
            >
              Power: {device.power ? "On" : "Off"}
            </Text>
            <Text style={styles.deviceInfo}>Durasi: {device.durasi} menit</Text>
            <Text style={styles.deviceInfo}>
              Jadwal: {device.jadwal.join(", ")}
            </Text>
          </View>
        ))}

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",  // <<< penting biar nyatu sama parent
  },

  scrollContent: {
    paddingHorizontal: width * 0.05,
    paddingTop: 20,
    paddingBottom: 100,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },

  summaryBox: {
    width: "100%",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },

  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#444",
  },

  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },

  statLabel: { fontSize: 15, color: "#555" },
  statValue: { fontSize: 15, fontWeight: "bold", color: "#333" },

  sectionTitleSmall: {
    marginTop: 20,
    fontSize: 17,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 10,
  },

  deviceCard: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e8e8e8",
  },

  deviceName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },

  deviceInfo: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
});

export default MonitoringKolam;
