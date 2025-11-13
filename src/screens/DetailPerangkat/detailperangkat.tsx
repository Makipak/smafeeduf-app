import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Switch,
  Modal,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";

// === Tipe Navigasi ===
type MainStackParamList = {
  DetailPerangkat: { deviceName: string };
  MonitoringPakan: { stokPakan: number };
};

type DetailPerangkatScreenProps = StackScreenProps<
  MainStackParamList,
  "DetailPerangkat"
>;

const { width } = Dimensions.get("window");

const DetailPerangkatScreen: React.FC<DetailPerangkatScreenProps> = ({
  route,
  navigation,
}) => {
  const deviceName = route.params?.deviceName || "Feeder 1";

  // === STATE ===
  const [isPowerOn, setIsPowerOn] = useState<boolean>(false);
  const [durasi, setDurasi] = useState<number>(2);
  const [jadwalList, setJadwalList] = useState<string[]>(["10:00"]);
  const [stokPakan, setStokPakan] = useState<number | null>(null);
  const [phAir, setPhAir] = useState<number>(7.2);

  // Modal states
  const [modalDurasi, setModalDurasi] = useState<boolean>(false);
  const [modalJadwal, setModalJadwal] = useState<boolean>(false);
  const [modalStok, setModalStok] = useState<boolean>(true);
  const [tempDurasi, setTempDurasi] = useState<string>(String(durasi));
  const [tempJadwal, setTempJadwal] = useState<string>("");
  const [tempStok, setTempStok] = useState<string>("");

  // === LOGIC FEEDER ===
  useEffect(() => {
    if (!isPowerOn || stokPakan === null) return;

    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5); // HH:MM

      if (jadwalList.includes(currentTime)) {
        const pakanPerMenit = 3.5; // kg per menit
        const totalPakan = pakanPerMenit * durasi;
        setStokPakan((prev) => Math.max((prev ?? 0) - totalPakan, 0));
      }
    }, 60000); // cek tiap menit

    return () => clearInterval(interval);
  }, [isPowerOn, durasi, jadwalList, stokPakan]);

  // Simulasi fluktuasi pH air
  useEffect(() => {
    const phInterval = setInterval(() => {
      setPhAir((prev) => {
        const fluktuasi = (Math.random() - 0.5) * 0.1;
        return Math.round((prev + fluktuasi) * 100) / 100;
      });
    }, 5000);
    return () => clearInterval(phInterval);
  }, []);

  // === HANDLERS ===
  const handleSaveDurasi = () => {
    const val = parseInt(tempDurasi);
    if (!isNaN(val) && val > 0) setDurasi(val);
    setModalDurasi(false);
  };

  const handleAddJadwal = () => {
    if (tempJadwal.match(/^\d{2}:\d{2}$/) && !jadwalList.includes(tempJadwal)) {
      setJadwalList([...jadwalList, tempJadwal].sort());
    }
    setTempJadwal("");
    setModalJadwal(false);
  };

  const handleDeleteJadwal = (jam: string) => {
    setJadwalList(jadwalList.filter((j) => j !== jam));
  };

  const handleSaveStok = () => {
    const val = parseFloat(tempStok);
    if (!isNaN(val) && val > 0) setStokPakan(val);
    setModalStok(false);
  };

  const handleGoBack = () => navigation.goBack();

  interface SwitchRowProps {
    label: string;
    value: boolean;
    onValueChange: (val: boolean) => void;
  }

  const SwitchRow: React.FC<SwitchRowProps> = ({
    label,
    value,
    onValueChange,
  }) => (
    <View style={styles.switchRow}>
      <Text style={styles.switchLabel}>{label}</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#76C48B" }}
        thumbColor={value ? "#38b000" : "#f4f3f4"}
        onValueChange={onValueChange}
        value={value}
      />
    </View>
  );

  const stokPersen =
    stokPakan !== null ? Math.round((stokPakan / 7) * 100) : 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={26} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>{deviceName}</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* === PENJADWALAN === */}
        <View style={styles.card}>
          <Text style={styles.cardHeader}>Penjadwalan</Text>
          <SwitchRow
            label="Power"
            value={isPowerOn}
            onValueChange={setIsPowerOn}
          />
          <View style={styles.divider} />
          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => {
              setTempDurasi(String(durasi));
              setModalDurasi(true);
            }}
          >
            <Text style={styles.settingLabel}>Durasi</Text>
            <Text style={styles.settingValue}>{durasi} menit</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Jadwal</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setModalJadwal(true)}
            >
              <Ionicons name="add" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          {jadwalList.map((jam, idx) => (
            <View key={idx} style={styles.jadwalRow}>
              <Text style={styles.jadwalText}>{jam}</Text>
              <TouchableOpacity onPress={() => handleDeleteJadwal(jam)}>
                <Ionicons name="trash-outline" size={20} color="#b00020" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* === MONITORING === */}
        <View style={styles.card}>
          <Text style={styles.cardHeader}>Monitoring</Text>
          <TouchableOpacity
            style={styles.settingRow}
            onPress={() =>
              stokPakan !== null &&
              navigation.navigate("MonitoringPakan", { stokPakan })
            }
          >
            <Text style={styles.settingLabel}>Sisa Pakan</Text>
            <Text style={styles.settingValue}>
              {stokPakan !== null
                ? `${stokPersen}% (${stokPakan.toFixed(1)} kg)`
                : "Belum diisi"}
            </Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>pH Air</Text>
            <Text style={styles.settingValue}>{phAir.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* === MODAL DURASI === */}
      <Modal visible={modalDurasi} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Atur Durasi (menit)</Text>
            <TextInput
              style={styles.input}
              value={tempDurasi}
              onChangeText={setTempDurasi}
              keyboardType="numeric"
              placeholder="Contoh: 2"
            />
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: "#2C5C52" }]}
              onPress={handleSaveDurasi}
            >
              <Text style={styles.modalButtonText}>Simpan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* === MODAL TAMBAH JADWAL === */}
      <Modal visible={modalJadwal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Tambah Jadwal (HH:MM)</Text>
            <TextInput
              style={styles.input}
              value={tempJadwal}
              onChangeText={setTempJadwal}
              placeholder="Contoh: 10:00"
            />
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: "#2C5C52" }]}
              onPress={handleAddJadwal}
            >
              <Text style={styles.modalButtonText}>Tambah</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* === MODAL STOK PAKAN === */}
      <Modal visible={modalStok} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Masukkan Stok Pakan Awal (kg)</Text>
            <TextInput
              style={styles.input}
              value={tempStok}
              onChangeText={setTempStok}
              keyboardType="numeric"
              placeholder="Contoh: 7"
            />
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: "#2C5C52" }]}
              onPress={handleSaveStok}
            >
              <Text style={styles.modalButtonText}>Simpan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

// === STYLES ===
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.05,
    height: 60,
  },
  title: { fontSize: 18, fontWeight: "700", color: "#000" },
  scrollContainer: {
    paddingHorizontal: width * 0.05,
    paddingVertical: 15,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#eee",
    shadowColor: "#DDB443",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  cardHeader: {
    fontSize: 14,
    fontWeight: "600",
    color: "#999",
    marginBottom: 8,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  switchLabel: { fontSize: 16, color: "#333", fontWeight: "500" },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  settingLabel: { fontSize: 16, color: "#333", fontWeight: "500" },
  settingValue: { fontSize: 15, color: "#777" },
  divider: { height: 1, backgroundColor: "#eee" },
  jadwalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  jadwalText: { fontSize: 15, color: "#444" },
  addButton: {
    backgroundColor: "#2C5C52",
    padding: 6,
    borderRadius: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    width: "85%",
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  modalButton: {
    marginTop: 15,
    paddingVertical: 10,
    borderRadius: 8,
  },
  modalButtonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});

export default DetailPerangkatScreen;
