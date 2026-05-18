import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
type Formation = {
  id: number;
  title: string;
  body: string;
};
export default function DetailFormation() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [formation, setFormation] = useState<Formation | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setFormation(data))
      .finally(() => setLoading(false));
  }, [id]);
  if (loading || !formation) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0D47A1" />
      </View>
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
          <Text style={styles.body}>{formation.body}</Text>
          <Text style={styles.sectionTitle}>Durée</Text>
          <Text style={styles.body}>40 heures réparties sur 5 semaines</Text>
          <Text style={styles.sectionTitle}>Prérequis</Text>
          <Text style={styles.body}>Bases en programmation JavaScript</Text>
          <Pressable
            style={styles.btn}
            onPress={() => router.push(`/inscription?formationId=${id}`)}
          >
            <Text style={styles.btnText}>S'inscrire à cette formation</Text>
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F4F8' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { backgroundColor: '#0D47A1', padding: 24, paddingTop: 40 },
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
