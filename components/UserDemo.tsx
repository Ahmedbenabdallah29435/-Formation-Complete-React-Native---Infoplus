import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';

export default function UserDemo() {
  const [userId, setUserId] = useState(1);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [seconds, setSeconds] = useState(0);

  // 1️⃣ Au montage uniquement + cleanup au démontage
  useEffect(() => {
    console.log('✅ Composant monté - Timer démarré');
    const intervalId = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      console.log('🧹 Composant démonté - Timer nettoyé');
      clearInterval(intervalId);
    };
  }, []);

  // 2️⃣ À chaque changement de userId
  useEffect(() => {
    console.log(`🔄 userId a changé : ${userId} - Fetch en cours...`);
    setLoading(true);

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [userId]);

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>⏱️ Temps : {seconds}s</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#FF9728" />
      ) : (
        <View style={styles.card}>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.email}>{user?.email}</Text>
          <Text style={styles.city}>📍 {user?.address?.city}</Text>
        </View>
      )}

      <Button
        title="Utilisateur suivant"
        onPress={() => setUserId((prev) => (prev >= 10 ? 1 : prev + 1))}
        color="#22BCB9"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  timer: { fontSize: 24, textAlign: 'center', marginBottom: 20, color: '#20517D' },
  card: { backgroundColor: '#f0f4f8', padding: 20, borderRadius: 10, marginBottom: 20 },
  name: { fontSize: 20, fontWeight: 'bold', color: '#20517D' },
  email: { fontSize: 16, color: '#555', marginTop: 5 },
  city: { fontSize: 14, color: '#888', marginTop: 5 },
});
