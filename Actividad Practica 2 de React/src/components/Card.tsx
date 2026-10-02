import React from 'react';
import { Image, Text, StyleSheet, View, Pressable } from 'react-native';
import { Colors } from '@/constants/theme';

export interface CardProps {
  title: string;
  description: string;
  price: number;
  image?: string; // URL string (remote image)
  onPress?: () => void;
}

export default function Card({ title, description, price, image, onPress }: CardProps) {
  return (
    <Pressable onPress={onPress} style={styles.card} android_ripple={{ color: Colors.light.backgroundElement }}>
      {image && <Image source={{ uri: image }} style={styles.image} defaultSource={{ uri: 'https://archive.org/download/placeholder-image/placeholder.png' }} />}
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description} numberOfLines={2}>{description}</Text>
        <Text style={styles.price}>${price.toFixed(2)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.backgroundElement,
    borderRadius: 8,
    marginVertical: 8,
    overflow: 'hidden',
    flexDirection: 'row',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
  },
  description: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginVertical: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
});
