import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';

type ProfileProps = {
  nom: string;
  bio: string;
  photo: ImageSourcePropType;
};

const ProfileCard = ({ nom, bio, photo }: ProfileProps) => {
  return (
    <View style={styles.card}>
      <Image source={photo} style={styles.avatar} />
      <Text style={styles.name}>{nom}</Text>
      <Text style={styles.bio}>{bio}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    margin: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  avatar: {
    width: 100, height: 100,
    borderRadius: 50, marginBottom: 12,
  },
  name: {
    fontSize: 24, fontWeight: 'bold', color: '#0D47A1',
  },
  bio: {
    fontSize: 14, color: '#666',
    marginTop: 4, textAlign: 'center',
  },
});

export default ProfileCard;