import AppHeader from '@/components/AppHeader';
import { useTheme } from '@/contexts/ThemeContext';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function ConfirmationScreen() {
  const { nom, email, formationId } = useLocalSearchParams<{
    nom: string;
    email: string;
    formationId: string;
  }>();
  const router = useRouter();
  const { dark } = useTheme();

  const bg = dark ? '#1A1F36' : '#F0F4F8';
  const cardBg = dark ? '#2A3047' : '#fff';
  const textColor = dark ? '#D6DCE8' : '#333';
  const mutedColor = dark ? '#9AA0B6' : '#666';

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />
      <View style={{ flex: 1, backgroundColor: bg }}>
        <AppHeader title="Confirmation" showBack={false} />
        <View style={[styles.container, { backgroundColor: bg }]}>
        <Text style={styles.icon}>✅</Text>
        <Text style={styles.title}>Inscription confirmée !</Text>
        <View style={[styles.card, { backgroundColor: cardBg }]}>
          <Text style={[styles.label, { color: mutedColor }]}>Nom</Text>
          <Text style={[styles.value, { color: textColor }]}>{nom}</Text>
          <Text style={[styles.label, { color: mutedColor }]}>Email</Text>
          <Text style={[styles.value, { color: textColor }]}>{email}</Text>
          <Text style={[styles.label, { color: mutedColor }]}>Formation</Text>
          <Text style={[styles.value, { color: textColor }]}>#{formationId}</Text>
        </View>
        <Text style={[styles.message, { color: mutedColor }]}>
          Un email de confirmation t&apos;a été envoyé. Notre équipe te contactera bientôt.
        </Text>
        <Pressable
          style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}
          onPress={() => router.replace('/(tabs)/formations')}
        >
          <Text style={styles.btnText}>Retour aux formations</Text>
        </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { fontSize: 80, marginBottom: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#4CAF50', marginBottom: 24 },
  card: {
    padding: 20,
    borderRadius: 16,
    width: '100%',
    marginBottom: 24,
    shadowColor: '#0D47A1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  label: { fontSize: 12, marginTop: 8 },
  value: { fontSize: 16, fontWeight: 'bold' },
  message: { fontSize: 14, textAlign: 'center', marginBottom: 24 },
  btn: {
    backgroundColor: '#0D47A1',
    padding: 16,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#0D47A1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  btnPressed: { opacity: 0.9, transform: [{ scale: 0.98 }] },
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
