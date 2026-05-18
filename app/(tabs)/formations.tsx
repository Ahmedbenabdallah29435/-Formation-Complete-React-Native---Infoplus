import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
type Formation = {
  id: number;
  title: string;
  body: string;
};
export default function FormationsScreen() {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((data) => setFormations(data.slice(0, 10)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0D47A1" />
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Erreur : {error}</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={formations}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <Pressable
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
          onPress={() => router.push(`/formation/${item.id}`)}
        >
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.body} numberOfLines={2}>
            {item.body}
          </Text>
        </Pressable>
      )}
    />
  );
}
const styles = StyleSheet.create({
  list: { padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 12, color: '#666' },
  errorText: { color: '#E53935', fontSize: 16 },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardPressed: { opacity: 0.7, transform: [{ scale: 0.98 }] },
  title: { fontSize: 16, fontWeight: 'bold', color: '#0D47A1', marginBottom: 4 },
  body: { fontSize: 13, color: '#666' },
});
