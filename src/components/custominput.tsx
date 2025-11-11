import React from 'react';
import { View, TextInput, StyleSheet, Dimensions, TextInputProps } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

// Mengambil lebar layar untuk responsivitas
const { width } = Dimensions.get('window');

// Definisi props untuk komponen
interface CustomInputProps extends TextInputProps {
  iconName: keyof typeof Feather.glyphMap | keyof typeof MaterialCommunityIcons.glyphMap;
  placeholder: string;
  isPassword?: boolean;
  onToggleVisibility?: () => void;
  passwordVisible?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  iconName,
  placeholder,
  isPassword = false,
  onToggleVisibility,
  passwordVisible,
  ...rest
}) => {
  // Tentukan apakah menggunakan ikon dari Feather atau MaterialCommunityIcons
  const IconComponent = iconName === 'lock-outline' || iconName === 'email-outline'
    ? MaterialCommunityIcons
    : Feather;

  return (
    <View style={styles.inputContainer}>
      {/* Ikon di sisi kiri */}
      <IconComponent name={iconName as any} size={20} color="#333" style={styles.icon} />
      
      {/* Input Field */}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        secureTextEntry={isPassword && !passwordVisible}
        {...rest}
      />
      
      {/* Ikon untuk toggle password visibility (jika ini input password) */}
      {isPassword && onToggleVisibility && (
        <Feather
          name={passwordVisible ? 'eye' : 'eye-off'}
          size={20}
          color="#999"
          style={styles.toggleIcon}
          onPress={onToggleVisibility}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.9, // Lebar 90% dari layar
    height: 50,
    borderWidth: 1.5,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  icon: {
    marginRight: 10,
    color: '#777',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  toggleIcon: {
    marginLeft: 10,
    padding: 5,
  },
});

export default CustomInput;