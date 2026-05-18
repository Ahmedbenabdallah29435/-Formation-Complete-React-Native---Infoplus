import ProfileCard from '@/components/ProfileCard';
import ProfileCardTest from '@/components/ProfileCardTest';
import UserDemo from '@/components/UserDemo';
import { useState } from 'react';
import { Button, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function ProfilScreen() {
  const [dark, setDark] = useState(false);
  const [nom, setNom] = useState('Ahmed Ben Salah');
  const [bio, setBio] = useState('Étudiant en développement mobile');
  const bg = dark ? '#1A1F36' : '#F0F4F8';
  const textColor = dark ? '#FFFFFF' : '#333333';
  const colors = ['#0D47A1', '#1976D2', '#1565C0', '#0277BD'];
  const [competences, setCompetences] = useState([
    'React Native',
    'TypeScript',
    'JavaScript',
    'HTML/CSS',
    'Git & GitHub',
    'Gitlab',
    'CI/CD',
    'Agile Methodologies',
    'UI/UX Design',
    'Testing & Debugging',
  ]);
  const [newSkill, setNewSkill] = useState('');
  const addSkill = () => {
    if (newSkill.trim() === '') return;
    if (competences.includes(newSkill)) return;

    setCompetences([...competences, newSkill]);
    setNewSkill('');
  };
  const removeSkill = (skill: string) => {
    setCompetences(competences.filter((c) => c !== skill));
  };
  return (
    <ScrollView style={[styles.container, { backgroundColor: bg }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mon Profil</Text>
        <Button title={dark ? ' Mode Clair' : ' Mode Sombre'} onPress={() => setDark(!dark)} />
      </View>
      <ProfileCard
        nom={nom}
        bio={bio}
        photo={require('@/assets/images/123.png')}
      />
      <View style={[styles.section, { backgroundColor: dark ? '#2A3047' : '#fff' }]}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>Modifier mon profil</Text>
        <Text style={[styles.label, { color: textColor }]}>Nom</Text>
        <TextInput
          style={styles.input}
          placeholder="Ton nom..."
          placeholderTextColor="#999"
          value={nom}
          onChangeText={setNom}
        />
        <Text style={[styles.label, { color: textColor }]}>Bio</Text>
        <TextInput
          style={styles.input}
          placeholder="Ta bio..."
          placeholderTextColor="#999"
          value={bio}
          onChangeText={setBio}
        />
      </View>
      <ProfileCardTest description="Étudiant en développement mobile passionné par la création d'applications innovantes et performantes. Compétent en React Native, TypeScript, et JavaScript, avec une solide expérience en HTML/CSS et Git. Toujours à la recherche de nouveaux défis pour améliorer mes compétences et contribuer à des projets passionnants." />
      <View style={[styles.section, { backgroundColor: dark ? '#2A3047' : '#fff' }]}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>Mes Compétences</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Nouvelle compétence..."
            placeholderTextColor="#999"
            value={newSkill}
            onChangeText={setNewSkill}
            onSubmitEditing={addSkill}
          />
          <Button title="Ajouter" onPress={addSkill} />
        </View>
        <View style={styles.skillsContainer}>
          {competences.map((comp, index) => (
            <Pressable
              key={comp}
              onPress={() => removeSkill(comp)}
              style={[styles.skillBadge, { backgroundColor: colors[index % colors.length] }]}
            >
              <Text style={styles.skillText}>{comp} ✕</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <UserDemo />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    backgroundColor: '#0D47A1',
    padding: 20,
    paddingTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  section: {
    padding: 16,
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 3,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
    width: '100%',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 8,
  },
  skillBadge: {
    backgroundColor: '#0D47A1',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  skillText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
});
