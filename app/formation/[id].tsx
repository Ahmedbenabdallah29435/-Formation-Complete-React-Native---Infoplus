import formationsData from '@/data/formations.json';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

type Formation = {
  id: number;
  title: string;
  description: string;
  duree: string;
  niveau: string;
  prix: string;
  prerequis: string;
};

export default function DetailFormation() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const formation = (formationsData as Formation[]).find((f) => f.id.toString() === id);

  if (!formation) {
    return (
      <>
        <Stack.Screen options={{ title: 'Détail Formation' }} />
        <View style={styles.center}>
          <Text style={styles.errorText}>Formation introuvable.</Text>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Détail Formation' }} />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.badge}>Formation #{formation.id}</Text>
          <Text style={styles.title}>{formation.title}</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.body}>{formation.description}</Text>
          <Text style={styles.sectionTitle}>Durée</Text>
          <Text style={styles.body}>{formation.duree}</Text>
          <Text style={styles.sectionTitle}>Niveau</Text>
          <Text style={styles.body}>{formation.niveau}</Text>
          <Text style={styles.sectionTitle}>Prix</Text>
          <Text style={styles.body}>{formation.prix}</Text>
          <Text style={styles.sectionTitle}>Prérequis</Text>
          <Text style={styles.body}>{formation.prerequis}</Text>
          <Pressable
            style={styles.btn}
            onPress={() => router.push(`/inscription?formationId=${id}`)}
          >
            <Text style={styles.btnText}>S&apos;inscrire à cette formation</Text>
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F4F8' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { color: '#E53935', fontSize: 16 },
  header: { backgroundColor: '#0D47A1', padding: 24, paddingTop: 24 },
  badge: {
    color: '#90CAF9',
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  title: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  content: { padding: 20 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0D47A1',
    marginTop: 16,
    marginBottom: 6,
  },
  body: { fontSize: 14, color: '#333', lineHeight: 22 },
  btn: {
    backgroundColor: '#FF9800',
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
