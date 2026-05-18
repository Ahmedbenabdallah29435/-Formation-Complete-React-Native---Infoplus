import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';

type ProfileProps = {
  nom: string;
  bio: string;
  photo: ImageSourcePropType;
  dark?: boolean;
};

const ProfileCard = ({ nom, bio, photo, dark = false }: ProfileProps) => {
  return (
    <View style={[styles.card, { backgroundColor: dark ? '#2A3047' : '#ffffff' }]}>
      <Image source={photo} style={styles.avatar} />
      <Text style={[styles.name, { color: dark ? '#90CAF9' : '#0D47A1' }]}>{nom}</Text>
      <Text style={[styles.bio, { color: dark ? '#B0B8D0' : '#666' }]}>{bio}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: '#0D47A1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  bio: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
});

export default ProfileCard;
