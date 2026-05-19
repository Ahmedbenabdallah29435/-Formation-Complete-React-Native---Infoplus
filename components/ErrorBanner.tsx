import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';

type Props = {
  message: string | null;
  type?: 'error' | 'success';
};

export default function ErrorBanner({ message, type = 'error' }: Props) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-10)).current;

  useEffect(() => {
    if (message) {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 250, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: 0, duration: 250, useNativeDriver: true }),
      ]).start();
    } else {
      opacity.setValue(0);
      translateY.setValue(-10);
    }
  }, [message, opacity, translateY]);

  if (!message) return null;

  const isError = type === 'error';
  const bg = isError ? '#FFEBEE' : '#E8F5E9';
  const border = isError ? '#E53935' : '#43A047';
  const color = isError ? '#C62828' : '#2E7D32';
  const icon = isError ? '⚠️' : '✅';

  return (
    <Animated.View
      style={[
        styles.banner,
        {
          backgroundColor: bg,
          borderLeftColor: border,
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      <Text style={styles.icon}>{icon}</Text>
      <Text style={[styles.text, { color }]}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 14,
  },
  icon: { fontSize: 16, marginRight: 8 },
  text: { fontSize: 13, flex: 1, fontWeight: '600' },
});
