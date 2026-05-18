import formationsData from '@/data/formations.json';
import { useTheme } from '@/contexts/ThemeContext';
import { useClickSound } from '@/hooks/useClickSound';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Formation = {
  id: number;
  title: string;
  description: string;
  duree: string;
  niveau: string;
  prix: string;
  prerequis: string;
  image: string;
};

export default function FormationsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { dark } = useTheme();
  const playClick = useClickSound();
  const [formations, setFormations] = useState<Formation[]>(formationsData);
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const bg = dark ? '#1A1F36' : '#f0f4f8';
  const cardBg = dark ? '#2A3047' : '#fff';
  const titleColor = dark ? '#90CAF9' : '#0D47A1';
  const textColor = dark ? '#D6DCE8' : '#555';
  const inputBg = dark ? '#2A3047' : '#fff';
  const inputBorder = dark ? '#3A4060' : 'transparent';
  const inputText = dark ? '#fff' : '#333';
  const badgeBg = dark ? '#1A2440' : '#E3F2FD';

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
    <View style={[styles.container, { backgroundColor: bg }]}>
      <StatusBar style="light" />
      <View style={[styles.header, { paddingTop: insets.top + 24 }]}>
        <Text style={styles.title}>Nos Formations</Text>
        <Text style={styles.subtitle}>Choisis ta voie chez InfoPlus</Text>
      </View>

      <View style={styles.searchWrap}>
        <TextInput
          style={[
            styles.searchInput,
            { backgroundColor: inputBg, borderColor: inputBorder, borderWidth: 1, color: inputText },
          ]}
          placeholder="🔍 Rechercher une formation..."
          placeholderTextColor={dark ? '#7A82A0' : '#999'}
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
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={[styles.empty, { color: dark ? '#9AA0B6' : '#666' }]}>
              Aucune formation trouvée.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [
              styles.card,
              { backgroundColor: cardBg },
              pressed && styles.cardPressed,
            ]}
            onPress={() => {
              playClick();
              router.push(`/formation/${item.id}`);
            }}
          >
            <Image source={{ uri: item.image }} style={styles.cardImg} />
            <View style={styles.cardBody}>
              <Text style={[styles.cardTitle, { color: titleColor }]}>{item.title}</Text>
              <Text style={[styles.cardText, { color: textColor }]} numberOfLines={2}>
                {item.description}
              </Text>
              <View style={styles.metaRow}>
                <Text style={[styles.metaBadge, { backgroundColor: badgeBg, color: titleColor }]}>
                  ⏱ {item.duree}
                </Text>
                <Text style={[styles.metaBadge, { backgroundColor: badgeBg, color: titleColor }]}>
                  📊 {item.niveau}
                </Text>
                <Text style={[styles.metaBadge, { backgroundColor: badgeBg, color: titleColor }]}>
                  💰 {item.prix}
                </Text>
              </View>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    backgroundColor: '#0D47A1',
    paddingHorizontal: 24,
    paddingBottom: 32,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  title: { fontSize: 30, fontWeight: 'bold', color: '#ffffff' },
  subtitle: { fontSize: 15, color: '#90CAF9', marginTop: 4 },
  searchWrap: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchInput: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    shadowColor: '#0D47A1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  list: { padding: 16, paddingBottom: 24 },
  card: {
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#0D47A1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardImg: {
    width: '100%',
    height: 130,
  },
  cardBody: { padding: 16 },
  cardPressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  cardText: { fontSize: 14, lineHeight: 20 },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  metaBadge: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  emptyWrap: { alignItems: 'center', marginTop: 48 },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  empty: { fontSize: 15 },
});
