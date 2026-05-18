import { Image } from 'expo-image';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('@/assets/images/123.png')} style={styles.logo} />
        <Text style={styles.title}>InfoPlus</Text>
        <Text style={styles.subtitle}>Centre de Formation — Bizerte</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📚 Qui sommes-nous ?</Text>
        <Text style={styles.cardText}>
          InfoPlus est un centre de formation spécialisé dans les technologies du web et du mobile.
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🎓 Nos Formations</Text>
        <Text style={styles.cardText}>• React Native — Dév Mobile</Text>
        <Text style={styles.cardText}>• React JS — Dév Web</Text>
        <Text style={styles.cardText}>• Flutter — Cross-Platform</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📍 Contact</Text>
        <Text style={styles.cardText}>Bizerte, Tunisie</Text>
        <Text style={styles.cardText}>📞 +216 72 435 403</Text>
      </View>
    </ScrollView>
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
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  title: { fontSize: 32, fontWeight: 'bold', color: '#ffffff' },
  subtitle: { fontSize: 16, color: '#90CAF9', marginTop: 4 },
  card: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0D47A1',
    marginBottom: 8,
  },
  cardText: { fontSize: 15, color: '#333', lineHeight: 24 },
});
