import React, { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import { MainStackParamList } from "../../navigation/mainnavigator";

type Props = StackScreenProps<MainStackParamList, "MonitoringPangan">;

const { width } = Dimensions.get("window");

const MonitoringDetailPerangkat: React.FC<Props> = ({ route, navigation }) => {
  const stokPakan = route.params?.stokPakan ?? 7.0;

  // --- Simulasi data grafik (historis stok pakan 7 hari terakhir) ---
  const sampleData = useMemo(() => {
    return [7, 6.3, 5.8, 5.3, 4.9, 4.4, stokPakan];
  }, [stokPakan]);

  // --- Simulasi pH ---
  const phAir = 7.2;
  const phStatusColor =
    phAir < 6.5 ? "#D9534F" : phAir < 7.5 ? "#5CB85C" : "#F0AD4E";

  return (
    <View style={styles.container}>
      {/* HEADER FIXED */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Monitoring Pakan</Text>

        <View style={{ width: 24 }} />
      </View>

      {/* KOTAK SISA PAKAN */}
      <View style={styles.content}>
        <Text style={styles.label}>Sisa Pakan:</Text>
        <Text style={styles.value}>{stokPakan.toFixed(2)} kg</Text>
      </View>

      {/* --- GRAFIK PAKAN --- */}
      <Text style={styles.sectionTitle}>Grafik Penggunaan Pakan</Text>

      <View style={styles.chartWrapper}>
        {sampleData.map((v, i) => {
          const maxVal = 7; // kapasitas penuh
          const barHeight = (v / maxVal) * 120;

          return (
            <View key={i} style={styles.chartBarWrapper}>
              <View
                style={[styles.chartBar, { height: barHeight }]}
              />
              <Text style={styles.chartLabel}>D{i + 1}</Text>
            </View>
          );
        })}
      </View>

      {/* --- MONITORING PH --- */}
      <Text style={styles.sectionTitle}>Monitoring pH Air</Text>

      <View style={styles.phContainer}>
        <Text style={styles.phValue}>{phAir.toFixed(2)}</Text>

        <View style={styles.phBar}>
          <View
            style={[
              styles.phIndicator,
              {
                width: `${(phAir / 14) * 100}%`,
                backgroundColor: phStatusColor,
              },
            ]}
          />
        </View>

        <Text style={[styles.phStatus, { color: phStatusColor }]}>
          {phAir < 6.5
            ? "Asam (Tidak Ideal)"
            : phAir < 7.5
            ? "Netral (Ideal)"
            : "Basa (Perlu Pengawasan)"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
    alignItems: "center",
  },

  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
    flex: 1,
  },

  content: {
    backgroundColor: "#f6f6f6",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
    marginTop: 20,
  },

  label: { fontSize: 18, color: "#333" },
  value: { fontSize: 26, fontWeight: "bold", marginTop: 8, color: "#2C5C52" },

  // --- Chart ---
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 30,
    marginBottom: 10,
    color: "#333",
  },

  chartWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    width: width * 0.9,
    height: 150,
    marginBottom: 20,
  },

  chartBarWrapper: {
    alignItems: "center",
    width: 35,
    marginHorizontal: 6,
  },

  chartBar: {
    width: 25,
    backgroundColor: "#2C5C52",
    borderRadius: 6,
  },

  chartLabel: {
    marginTop: 6,
    fontSize: 12,
    color: "#666",
  },

  // --- PH Monitoring ---
  phContainer: {
    marginTop: 10,
    width: width * 0.85,
    backgroundColor: "#F7F7F7",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },

  phValue: {
    fontSize: 34,
    fontWeight: "700",
    color: "#2C5C52",
  },

  phBar: {
    width: "100%",
    backgroundColor: "#ddd",
    height: 10,
    borderRadius: 10,
    marginTop: 10,
    overflow: "hidden",
  },

  phIndicator: {
    height: 10,
    borderRadius: 10,
  },

  phStatus: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "600",
  },
});

export default MonitoringDetailPerangkat;
