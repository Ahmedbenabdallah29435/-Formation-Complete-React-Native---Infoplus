import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function InscriptionScreen() {
  const { formationId } = useLocalSearchParams<{ formationId: string }>();
  const router = useRouter();
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const valider = () => {
    if (nom.trim().length < 2) {
      Alert.alert('Erreur', 'Le nom doit contenir au moins 2 caractères');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert('Erreur', 'Email invalide');
      return;
    }
    if (telephone.length < 8) {
      Alert.alert('Erreur', 'Numéro de téléphone invalide');
      return;
    }
    router.push({
      pathname: '/confirmation',
      params: { nom, email, formationId },
    });
  };
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <Stack.Screen options={{ title: 'Inscription' }} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Inscription Formation #{formationId}</Text>
        <Text style={styles.subtitle}>Remplis le formulaire pour valider ton inscription</Text>
        <Text style={styles.label}>Nom complet *</Text>
        <TextInput
          style={styles.input}
          value={nom}
          onChangeText={setNom}
          placeholder="Ahmed Ben Ali"
          autoCapitalize="words"
        />
        <Text style={styles.label}>Email *</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="ahmed@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text style={styles.label}>Téléphone *</Text>
        <TextInput
          style={styles.input}
          value={telephone}
          onChangeText={setTelephone}
          placeholder="+216 XX XXX XXX"
          keyboardType="phone-pad"
        />
        <Pressable
          style={({ pressed }) => [styles.btn, pressed && { opacity: 0.7 }]}
          onPress={valider}
        >
          <Text style={styles.btnText}>Valider mon inscription</Text>
        </Pressable>
        <Pressable style={styles.btnSecondary} onPress={() => router.back()}>
          <Text style={styles.btnSecondaryText}>Annuler</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F0F4F8' },
  container: { padding: 20, backgroundColor: '#F0F4F8', flexGrow: 1 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#0D47A1', marginBottom: 4 },
  subtitle: { fontSize: 13, color: '#666', marginBottom: 24 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 6, marginTop: 12 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  btn: {
    backgroundColor: '#0D47A1',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  btnSecondary: { padding: 12, alignItems: 'center', marginTop: 8 },
  btnSecondaryText: { color: '#666', fontSize: 14 },
});
