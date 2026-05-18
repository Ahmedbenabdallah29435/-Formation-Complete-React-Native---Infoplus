import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

type User = {
  name: string;
  email: string;
  address?: { city?: string };
};

type Props = { dark?: boolean };

export default function UserDemo({ dark = false }: Props) {
  const [userId, setUserId] = useState(1);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [userId]);

  const bgCard = dark ? '#2A3047' : '#fff';
  const bgInner = dark ? '#1A1F36' : '#F0F4F8';
  const textPrimary = dark ? '#90CAF9' : '#0D47A1';
  const textSecondary = dark ? '#B0B8D0' : '#555';
  const textMuted = dark ? '#7A82A0' : '#888';

  return (
    <View style={[styles.card, { backgroundColor: bgCard }]}>
      <Text style={[styles.sectionTitle, { color: textPrimary }]}>👤 Démo useEffect</Text>
      <Text style={[styles.note, { color: textMuted }]}>
        Cette section est un exemple pédagogique du hook <Text style={styles.code}>useEffect</Text>.
        Le timer ci-dessous démarre au montage (cleanup au démontage), et la requête API se relance
        à chaque changement de <Text style={styles.code}>userId</Text>.
      </Text>
      <Text style={[styles.timer, { color: textSecondary }]}>⏱️ Temps : {seconds}s</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0D47A1" style={{ marginVertical: 16 }} />
      ) : (
        <View style={[styles.inner, { backgroundColor: bgInner }]}>
          <Text style={[styles.name, { color: textPrimary }]}>{user?.name}</Text>
          <Text style={[styles.email, { color: textSecondary }]}>{user?.email}</Text>
          <Text style={[styles.city, { color: textMuted }]}>📍 {user?.address?.city}</Text>
        </View>
      )}

      <Pressable
        onPress={() => setUserId((prev) => (prev >= 10 ? 1 : prev + 1))}
        style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}
      >
        <Text style={styles.btnText}>→ Utilisateur suivant</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: '#0D47A1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  note: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 12,
    fontStyle: 'italic',
  },
  code: {
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontStyle: 'normal',
  },
  timer: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: '600',
  },
  inner: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  name: { fontSize: 18, fontWeight: 'bold' },
  email: { fontSize: 14, marginTop: 4 },
  city: { fontSize: 13, marginTop: 4 },
  btn: {
    backgroundColor: '#0D47A1',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnPressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
});
