import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import { MainStackParamList } from "../../navigation/mainnavigator"; // ✅ diperbaiki import-nya

type Props = StackScreenProps<MainStackParamList, "MonitoringDetailPerangkat">; // ✅ ganti nama rute

const MonitoringDetailPerangkat: React.FC<Props> = ({ route, navigation }) => {
  // ✅ tambahkan default value biar aman
  const stokPakan = route.params?.stokPakan ?? 7.0; 

  return (
    <View style={styles.container}>
      {/* Tombol kembali */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Monitoring Pakan</Text>

      {/* Data utama */}
      <View style={styles.content}>
        <Text style={styles.label}>Sisa Pakan:</Text>
        <Text style={styles.value}>{stokPakan.toFixed(2)} kg</Text>
      </View>

      {/* Deskripsi */}
      <Text style={styles.desc}>
        Grafik atau indikator bisa ditambahkan di sini nantinya.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 60,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 30,
  },
  content: {
    backgroundColor: "#f6f6f6",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  label: {
    fontSize: 18,
    color: "#333",
  },
  value: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 8,
    color: "#2C5C52",
  },
  desc: {
    marginTop: 30,
    color: "#888",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});

export default MonitoringDetailPerangkat;
