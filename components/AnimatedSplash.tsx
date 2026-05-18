import { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

type Props = { onFinish: () => void };

export default function AnimatedSplash({ onFinish }: Props) {
  const logoFade = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const textFade = useRef(new Animated.Value(0)).current;
  const containerFade = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoFade, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 4,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(textFade, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(700),
      Animated.timing(containerFade, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start(() => onFinish());
  }, [logoFade, logoScale, textFade, containerFade, onFinish]);

  return (
    <Animated.View style={[styles.container, { opacity: containerFade }]}>
      <Animated.Image
        source={require('@/assets/images/123.png')}
        style={[
          styles.logo,
          { opacity: logoFade, transform: [{ scale: logoScale }] },
        ]}
      />
      <Animated.Text style={[styles.title, { opacity: textFade }]}>
        InfoPlus
      </Animated.Text>
      <Animated.Text style={[styles.subtitle, { opacity: textFade }]}>
        Centre de Formation — Bizerte
      </Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0D47A1',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    elevation: 1000,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 14,
    color: '#90CAF9',
    marginTop: 6,
  },
});
