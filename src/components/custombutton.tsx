import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions, TouchableOpacityProps } from 'react-native';

const { width } = Dimensions.get('window');

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'outline';
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, variant = 'primary', style, ...rest }) => {
  const isPrimary = variant === 'primary';

  return (
    <TouchableOpacity
      style={[
        styles.buttonBase,
        isPrimary ? styles.primaryButton : styles.outlineButton,
        style,
      ]}
      activeOpacity={0.8}
      {...rest}
    >
      <Text style={isPrimary ? styles.primaryText : styles.outlineText}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonBase: {
    width: width * 0.9, // Lebar 90% dari layar
    height: 55,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  primaryButton: {
    backgroundColor: '#4CAF50', // Hijau solid
  },
  primaryText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  outlineButton: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#4CAF50', // Outline hijau
  },
  outlineText: {
    color: '#4CAF50',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomButton;