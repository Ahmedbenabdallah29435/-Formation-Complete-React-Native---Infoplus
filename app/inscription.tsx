import AppHeader from '@/components/AppHeader';
import { useTheme } from '@/contexts/ThemeContext';
import { useClickSound } from '@/hooks/useClickSound';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function InscriptionScreen() {
  const { formationId } = useLocalSearchParams<{ formationId: string }>();
  const router = useRouter();
  const { dark } = useTheme();
  const playClick = useClickSound();
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');

  const bg = dark ? '#1A1F36' : '#F0F4F8';
  const cardBg = dark ? '#2A3047' : '#fff';
  const titleColor = dark ? '#90CAF9' : '#0D47A1';
  const textColor = dark ? '#D6DCE8' : '#333';
  const mutedColor = dark ? '#9AA0B6' : '#666';
  const inputBg = dark ? '#1A1F36' : '#F7F9FC';
  const inputBorder = dark ? '#3A4060' : '#E0E6ED';

  const valider = () => {
    playClick();
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
    <SafeAreaView style={[styles.safe, { backgroundColor: bg }]} edges={['left', 'right', 'bottom']}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />
      <AppHeader title="Inscription" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={[styles.container, { backgroundColor: bg }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={[styles.title, { color: titleColor }]}>
            Inscription Formation #{formationId}
          </Text>
          <Text style={[styles.subtitle, { color: mutedColor }]}>
            Remplis le formulaire pour valider ton inscription
          </Text>

          <View style={[styles.card, { backgroundColor: cardBg }]}>
            <Text style={[styles.label, { color: textColor }]}>Nom complet *</Text>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: inputBg, borderColor: inputBorder, color: textColor },
              ]}
              value={nom}
              onChangeText={setNom}
              placeholder="Ahmed Ben Ali"
              placeholderTextColor={dark ? '#7A82A0' : '#999'}
              autoCapitalize="words"
            />

            <Text style={[styles.label, { color: textColor }]}>Email *</Text>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: inputBg, borderColor: inputBorder, color: textColor },
              ]}
              value={email}
              onChangeText={setEmail}
              placeholder="ahmed@example.com"
              placeholderTextColor={dark ? '#7A82A0' : '#999'}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={[styles.label, { color: textColor }]}>Téléphone *</Text>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: inputBg, borderColor: inputBorder, color: textColor },
              ]}
              value={telephone}
              onChangeText={setTelephone}
              placeholder="+216 XX XXX XXX"
              placeholderTextColor={dark ? '#7A82A0' : '#999'}
              keyboardType="phone-pad"
            />
          </View>

          <Pressable
            style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}
            onPress={valider}
          >
            <Text style={styles.btnText}>Valider mon inscription</Text>
          </Pressable>
          <Pressable style={styles.btnSecondary} onPress={() => router.back()}>
            <Text style={[styles.btnSecondaryText, { color: mutedColor }]}>Annuler</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { padding: 20, flexGrow: 1 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  subtitle: { fontSize: 13, marginBottom: 20 },
  card: {
    padding: 18,
    borderRadius: 16,
    shadowColor: '#0D47A1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 6, marginTop: 12 },
  input: {
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    borderWidth: 1,
  },
  btn: {
    backgroundColor: '#0D47A1',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#0D47A1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  btnPressed: { opacity: 0.9, transform: [{ scale: 0.98 }] },
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  btnSecondary: { padding: 12, alignItems: 'center', marginTop: 8 },
  btnSecondaryText: { fontSize: 14 },
});
