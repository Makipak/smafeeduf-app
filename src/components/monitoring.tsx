import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface MonitoringHeaderProps {
  title: string;
  subtitle?: string; // Opsional untuk kasus seperti "Feeder 1"
  hideCurve?: boolean; // Opsional jika curve tidak dibutuhkan
}

const MonitoringHeader: React.FC<MonitoringHeaderProps> = ({ title, subtitle, hideCurve = false }) => {
  const insets = useSafeAreaInsets();
  
  // Hitung tinggi header agar adaptif
  const headerHeight = 120 + insets.top; 

  return (
    <View 
      style={[
        styles.headerContainer, 
        { 
            paddingTop: insets.top + 10, // Tambahkan padding top untuk status bar
            height: headerHeight,
        },
        !hideCurve && styles.curvedBottom // Terapkan curve hanya jika tidak disembunyikan
      ]}
    >
      <View style={styles.titleWrapper}>
        <Text style={styles.headerTitle}>{title}</Text>
        {subtitle && <Text style={styles.headerSubtitle}>{subtitle}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#2C5C52', // Warna hijau gelap
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    overflow: 'hidden',
  },
  curvedBottom: {
    // Styling untuk efek melengkung di bagian bawah
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  titleWrapper: {
    alignItems: 'center',
    width: width * 0.9,
    marginTop: 10, // Memberi ruang dari insets.top
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    textAlign: 'center',
  },
});

export default MonitoringHeader;