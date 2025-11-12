import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { MainTabParamList, MainStackParamList } from '../../navigation/mainnavigator';

const { width } = Dimensions.get('window');

// Fixed navigation props: PondList is a tab screen inside a stack navigator
type PondListScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Pond'>,
  StackScreenProps<MainStackParamList>
>;

interface Pond {
  id: number;
  name: string;
  deviceCount: number;
}

const DUMMY_PONDS: Pond[] = [
  { id: 1, name: 'Kolam A', deviceCount: 1 },
  { id: 2, name: 'Kolam B', deviceCount: 2 },
  { id: 3, name: 'Kolam C', deviceCount: 0 },
  { id: 4, name: 'Kolam A', deviceCount: 1 },
  { id: 5, name: 'Kolam B', deviceCount: 2 },
  { id: 6, name: 'Kolam C', deviceCount: 0 },

];

const PondListScreen: React.FC<PondListScreenProps> = ({ navigation }) => {
  const [ponds, setPonds] = useState<Pond[]>(DUMMY_PONDS);

  const handleAddPond = () => {
    console.log("Menavigasi ke Tambah Kolam.");
    // navigation.navigate('AddPond'); 
  };

  const renderPondCard = (pond: Pond) => (
    <TouchableOpacity 
      key={pond.id} 
      style={styles.card}
      onPress={() => 
          // NAVIGASI KE DAFTAR PERANGKAT, membawa ID dan Nama Kolam
          navigation.navigate('DeviceList', { pondId: pond.id, pondName: pond.name })
      }
      activeOpacity={0.7}
    >
      <View>
        <Text style={styles.cardTitle}>{pond.name}</Text>
        <Text style={styles.cardSubtitle}>{pond.deviceCount} Perangkat</Text>
      </View>
      <TouchableOpacity 
        onPress={(e) => {
          e.stopPropagation(); // Mencegah klik card ketika mengklik opsi
          console.log('Opsi Kolam', pond.name);
        }}
      >
        <MaterialCommunityIcons name="dots-vertical" size={24} color="#000" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* HEADER HIJAU GELAP */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Daftar Kolam</Text>
        <Text style={styles.headerSubtitle}>Selamat Datang JaneDoe</Text>
      </View>

      {/* BODY KONTEN */}
      <View style={styles.bodyContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {ponds.map(renderPondCard)}
          
          {ponds.length === 0 && (
            <Text style={styles.noPondText}>Anda belum memiliki kolam.</Text>
          )}
        </ScrollView>
      </View>
      
      {/* FLOATING ACTION BUTTON (+) */}
      <TouchableOpacity 
        style={styles.fab} 
        onPress={handleAddPond}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons name="plus" size={30} color="#fff" />
      </TouchableOpacity>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  headerContainer: {
    backgroundColor: '#005930', 
    paddingTop: 10,
    paddingBottom: 40, 
    alignItems: 'center',
    width: '100%',
  },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 5 },
  headerSubtitle: { fontSize: 16, color: '#fff', opacity: 0.8 },
  
  bodyContainer: {
    flex: 1,
    width: '100%',
    marginTop: -30, // Mengangkat konten agar berada di bawah header
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#fff', 
    overflow: 'hidden', 
  },
  scrollContent: {
    paddingHorizontal: width * 0.05,
    paddingTop: 20,
    paddingBottom: 100,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    width: '100%',
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
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 80, 
    backgroundColor: '#DDB443', 
    borderRadius: 28,
    elevation: 8,
  },
});

export default PondListScreen;