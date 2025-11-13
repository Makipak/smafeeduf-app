import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MonitoringHeader from '../../components/monitoring';
import { StackScreenProps } from '@react-navigation/stack';
import { MainStackParamList } from '../../navigation/mainnavigator'; // ✅ pakai StackParamList utama

type PanganScreenProps = StackScreenProps<MainStackParamList, 'Pangan'>;

const { width } = Dimensions.get('window');

const PanganScreen: React.FC<PanganScreenProps> = ({ navigation }) => {

  const handleViewDetail = () => {
    // ✅ Navigasi ke screen monitoring global
    navigation.navigate('MonitoringGlobal', {
      summary: 'Analisis keseluruhan kolam',
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <MonitoringHeader title="Monitoring Pangan" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Ringkasan Monitoring Global</Text>

        <View style={styles.contentBox}>
          <Text style={styles.placeholderText}>
            Data & Grafik Global Monitoring Pangan
          </Text>
        </View>

        <TouchableOpacity style={styles.detailButton} onPress={handleViewDetail}>
          <Text style={styles.detailButtonText}>Lihat Analisis Detail</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  scrollContent: {
    paddingHorizontal: width * 0.05,
    paddingTop: 30,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  contentBox: {
    minHeight: 200,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
  },
  placeholderText: {
    color: '#999',
    fontSize: 16,
  },
  detailButton: {
    backgroundColor: '#DDB443',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  detailButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PanganScreen;
