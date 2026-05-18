import formationsData from '@/data/formations.json';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

type Formation = {
  id: number;
  title: string;
  description: string;
  duree: string;
  niveau: string;
  prix: string;
  prerequis: string;
};

export default function FormationsScreen() {
  const router = useRouter();
  const [formations, setFormations] = useState<Formation[]>(formationsData);
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setFormations([...formationsData].sort(() => Math.random() - 0.5));
      setRefreshing(false);
    }, 1000);
  };

  const filtered = formations.filter((f) =>
    f.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nos Formations</Text>
        <Text style={styles.subtitle}>Choisis ta voie chez InfoPlus</Text>
      </View>

      <View style={styles.searchWrap}>
        <TextInput
          style={styles.searchInput}
          placeholder="🔍 Rechercher une formation..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={
          <Text style={styles.empty}>Aucune formation trouvée.</Text>
        }
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            onPress={() => router.push(`/formation/${item.id}`)}
          >
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardText} numberOfLines={2}>
              {item.description}
            </Text>
            <View style={styles.metaRow}>
              <Text style={styles.metaBadge}>⏱ {item.duree}</Text>
              <Text style={styles.metaBadge}>📊 {item.niveau}</Text>
              <Text style={styles.metaBadge}>💰 {item.prix}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f8' },
  header: {
    backgroundColor: '#0D47A1',
    padding: 40,
    alignItems: 'center',
    paddingTop: 60,
  },
  title: { fontSize: 32, fontWeight: 'bold', color: '#ffffff' },
  subtitle: { fontSize: 16, color: '#90CAF9', marginTop: 4 },
  searchWrap: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    elevation: 2,
  },
  list: { padding: 16, paddingBottom: 24 },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },
  cardPressed: { opacity: 0.7, transform: [{ scale: 0.98 }] },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0D47A1',
    marginBottom: 8,
  },
  cardText: { fontSize: 15, color: '#333', lineHeight: 22 },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  metaBadge: {
    backgroundColor: '#E3F2FD',
    color: '#0D47A1',
    fontSize: 13,
    fontWeight: '600',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  empty: {
    textAlign: 'center',
    color: '#666',
    marginTop: 32,
    fontSize: 15,
  },
});
