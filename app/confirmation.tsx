import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
export default function ConfirmationScreen() {
  const { nom, email, formationId } = useLocalSearchParams<{
    nom: string;
    email: string;
    formationId: string;
  }>();
  const router = useRouter();
  return (
    <>
      <Stack.Screen options={{ title: 'Confirmation', headerBackVisible: false }} />
      <View style={styles.container}>
        <Text style={styles.icon}>✅</Text>
        <Text style={styles.title}>Inscription confirmée !</Text>
        <View style={styles.card}>
          <Text style={styles.label}>Nom</Text>
          <Text style={styles.value}>{nom}</Text>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{email}</Text>
          <Text style={styles.label}>Formation</Text>
          <Text style={styles.value}>#{formationId}</Text>
        </View>
        <Text style={styles.message}>
          Un email de confirmation t'a été envoyé. Notre équipe te contactera bientôt.
        </Text>
        <Pressable style={styles.btn} onPress={() => router.replace('/(tabs)/formations')}>
          <Text style={styles.btnText}>Retour aux formations</Text>
        </Pressable>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F0F4F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { fontSize: 80, marginBottom: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#4CAF50', marginBottom: 24 },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    marginBottom: 24,
    elevation: 2,
  },
  label: { fontSize: 12, color: '#666', marginTop: 8 },
  value: { fontSize: 16, color: '#333', fontWeight: 'bold' },
  message: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 24 },
  btn: {
    backgroundColor: '#0D47A1',
    padding: 16,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
