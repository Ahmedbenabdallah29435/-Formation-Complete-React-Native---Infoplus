import AppHeader from '@/components/AppHeader';
import formationsData from '@/data/formations.json';
import { useTheme } from '@/contexts/ThemeContext';
import { useClickSound } from '@/hooks/useClickSound';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

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

export default function DetailFormation() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { dark } = useTheme();
  const playClick = useClickSound();
  const formation = (formationsData as Formation[]).find((f) => f.id.toString() === id);

  const bg = dark ? '#1A1F36' : '#F0F4F8';
  const cardBg = dark ? '#2A3047' : '#fff';
  const titleColor = dark ? '#90CAF9' : '#0D47A1';
  const textColor = dark ? '#D6DCE8' : '#333';
  const pillBg = dark ? '#1A2440' : '#E3F2FD';

  if (!formation) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={{ flex: 1, backgroundColor: bg }}>
          <AppHeader title="Détail Formation" />
          <View style={styles.center}>
            <Text style={styles.errorText}>Formation introuvable.</Text>
          </View>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style={dark ? 'light' : 'dark'} />
      <View style={[styles.container, { backgroundColor: bg }]}>
        <AppHeader title="Détail Formation" />
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.heroWrap}>
          <Image source={{ uri: formation.image }} style={styles.heroImg} />
          <View style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <Text style={styles.badge}>Formation #{formation.id}</Text>
            <Text style={styles.title}>{formation.title}</Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.metaRow}>
            <View style={[styles.metaPill, { backgroundColor: pillBg }]}>
              <Text style={[styles.metaPillText, { color: titleColor }]}>⏱ {formation.duree}</Text>
            </View>
            <View style={[styles.metaPill, { backgroundColor: pillBg }]}>
              <Text style={[styles.metaPillText, { color: titleColor }]}>📊 {formation.niveau}</Text>
            </View>
            <View style={[styles.metaPill, { backgroundColor: pillBg }]}>
              <Text style={[styles.metaPillText, { color: titleColor }]}>💰 {formation.prix}</Text>
            </View>
          </View>

          <View style={[styles.card, { backgroundColor: cardBg }]}>
            <Text style={[styles.sectionTitle, { color: titleColor }]}>Description</Text>
            <Text style={[styles.body, { color: textColor }]}>{formation.description}</Text>
          </View>

          <View style={[styles.card, { backgroundColor: cardBg }]}>
            <Text style={[styles.sectionTitle, { color: titleColor }]}>Prérequis</Text>
            <Text style={[styles.body, { color: textColor }]}>{formation.prerequis}</Text>
          </View>

          <Pressable
            style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}
            onPress={() => {
              playClick();
              router.push(`/inscription?formationId=${id}`);
            }}
          >
            <Text style={styles.btnText}>S&apos;inscrire à cette formation</Text>
          </Pressable>
        </View>
        </ScrollView>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { color: '#E53935', fontSize: 16 },
  heroWrap: {
    height: 220,
    position: 'relative',
  },
  heroImg: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(13,71,161,0.55)',
  },
  heroContent: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
  },
  badge: {
    color: '#90CAF9',
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 8,
    overflow: 'hidden',
  },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold', lineHeight: 30 },
  content: { padding: 16 },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 4,
  },
  metaPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  metaPillText: {
    fontSize: 13,
    fontWeight: '600',
  },
  card: {
    padding: 18,
    borderRadius: 16,
    marginTop: 12,
    shadowColor: '#0D47A1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  body: { fontSize: 14, lineHeight: 22 },
  btn: {
    backgroundColor: '#FF9800',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center',
    shadowColor: '#FF9800',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  btnPressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
