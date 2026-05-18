import { useOnboarding } from '@/contexts/OnboardingContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useClickSound } from '@/hooks/useClickSound';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useRef } from 'react';
import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { dark } = useTheme();
  const { show: showOnboarding } = useOnboarding();
  const playClick = useClickSound();

  const logoScale = useRef(new Animated.Value(1)).current;
  const rippleScale = useRef(new Animated.Value(0)).current;
  const rippleOpacity = useRef(new Animated.Value(0)).current;

  const onLogoPress = () => {
    playClick();
    rippleScale.setValue(0);
    rippleOpacity.setValue(0.6);
    Animated.parallel([
      Animated.timing(rippleScale, {
        toValue: 3.5,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(rippleOpacity, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(logoScale, { toValue: 0.92, duration: 100, useNativeDriver: true }),
        Animated.spring(logoScale, { toValue: 1.05, friction: 3, useNativeDriver: true }),
        Animated.spring(logoScale, { toValue: 1, friction: 4, useNativeDriver: true }),
      ]),
    ]).start(() => {
      showOnboarding();
    });
  };

  const bg = dark ? '#1A1F36' : '#F0F4F8';
  const cardBg = dark ? '#2A3047' : '#ffffff';
  const titleColor = dark ? '#90CAF9' : '#0D47A1';
  const textColor = dark ? '#D6DCE8' : '#333';
  const mutedColor = dark ? '#9AA0B6' : '#666';
  const testimoBg = dark ? '#1A1F36' : '#F0F4F8';

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.header, { paddingTop: insets.top + 24 }]}>
          <Pressable onPress={onLogoPress} hitSlop={12} style={styles.logoWrap}>
            <Animated.View
              style={[
                styles.ripple,
                {
                  opacity: rippleOpacity,
                  transform: [{ scale: rippleScale }],
                },
              ]}
            />
            <Animated.View style={[styles.logo, { transform: [{ scale: logoScale }] }]}>
              <Image source={require('@/assets/images/123.png')} style={styles.logoImg} />
            </Animated.View>
          </Pressable>
          <Text style={styles.title}>InfoPlus</Text>
          <Text style={styles.subtitle}>Centre de Formation — Bizerte</Text>
          <Text style={styles.tagline}>Depuis 1995</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: cardBg }]}>
            <Text numberOfLines={1} adjustsFontSizeToFit style={[styles.statNumber, { color: titleColor }]}>
              5000
            </Text>
            <Text numberOfLines={1} adjustsFontSizeToFit style={[styles.statLabel, { color: mutedColor }]}>
              Diplômés
            </Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: cardBg }]}>
            <Text numberOfLines={1} adjustsFontSizeToFit style={[styles.statNumber, { color: titleColor }]}>
              20
            </Text>
            <Text numberOfLines={1} adjustsFontSizeToFit style={[styles.statLabel, { color: mutedColor }]}>
              Formations
            </Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: cardBg }]}>
            <Text numberOfLines={1} adjustsFontSizeToFit style={[styles.statNumber, { color: titleColor }]}>
              30
            </Text>
            <Text numberOfLines={1} adjustsFontSizeToFit style={[styles.statLabel, { color: mutedColor }]}>
              Années
            </Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: cardBg }]}>
            <Text numberOfLines={1} adjustsFontSizeToFit style={[styles.statNumber, { color: titleColor }]}>
              20
            </Text>
            <Text numberOfLines={1} adjustsFontSizeToFit style={[styles.statLabel, { color: mutedColor }]}>
              Formateurs
            </Text>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: cardBg }]}>
          <Text style={[styles.cardTitle, { color: titleColor }]}>📚 À Propos de Nous</Text>
          <Text style={[styles.cardLead, { color: textColor }]}>
            Excellence et innovation dans la formation professionnelle depuis 1995
          </Text>
          <Text style={[styles.cardText, { color: textColor }]}>
            InfoPlus est une structure privée de formation enregistrée au ministère de la formation
            professionnelle et de l&apos;emploi sous le numéro 01.025.23, dédiée à former les
            professionnels de demain.
          </Text>
          <View style={styles.bulletList}>
            <Text style={[styles.bullet, { color: textColor }]}>
              ✅ Plus de 30 ans d&apos;expérience et plus de 5000 diplômés.
            </Text>
            <Text style={[styles.bullet, { color: textColor }]}>
              🎓 Formations diplômantes reconnues par l&apos;État tunisien (BTP, BTS) avec stages.
            </Text>
            <Text style={[styles.bullet, { color: textColor }]}>
              💡 Approche pédagogique innovante : pratique + suivi personnalisé.
            </Text>
          </View>
        </View>

        <Text style={[styles.sectionLabel, { color: titleColor }]}>🖼️ Notre Centre</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.gallery}
        >
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600' }}
            style={styles.galleryImg}
          />
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600' }}
            style={styles.galleryImg}
          />
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600' }}
            style={styles.galleryImg}
          />
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600' }}
            style={styles.galleryImg}
          />
        </ScrollView>

        <View style={[styles.card, { backgroundColor: cardBg }]}>
          <Text style={[styles.cardTitle, { color: titleColor }]}>🎓 Nos Formations</Text>
          <Text style={[styles.cardText, { color: textColor }]}>• BTP & BTS diplômants</Text>
          <Text style={[styles.cardText, { color: textColor }]}>• Commerce International</Text>
          <Text style={[styles.cardText, { color: textColor }]}>• Infographie Multimédia</Text>
          <Text style={[styles.cardText, { color: textColor }]}>• Développement Web & Mobile</Text>
          <Text style={[styles.cardText, { color: textColor }]}>• Formations continues</Text>
          <Pressable
            style={({ pressed }) => [styles.ctaBtn, pressed && styles.pressed]}
            onPress={() => router.push('/(tabs)/formations')}
          >
            <Text style={styles.ctaBtnText}>Voir toutes les formations →</Text>
          </Pressable>
        </View>

        <View style={[styles.card, { backgroundColor: cardBg }]}>
          <Text style={[styles.cardTitle, { color: titleColor }]}>💬 Témoignages</Text>
          <Text style={[styles.cardLead, { color: textColor }]}>Ce qu&apos;ils disent de nous</Text>

          <View style={[styles.testimonial, { backgroundColor: testimoBg }]}>
            <Text style={[styles.testiText, { color: textColor }]}>
              « La formation en Commerce International à InfoPlus m&apos;a permis d&apos;acquérir
              des compétences solides et de trouver un emploi rapidement après l&apos;obtention de
              mon diplôme. L&apos;équipe pédagogique est très professionnelle. »
            </Text>
            <Text style={[styles.testiAuthor, { color: titleColor }]}>
              — Amira Ben Ali, Diplômée BTS Commerce
            </Text>
          </View>

          <View style={[styles.testimonial, { backgroundColor: testimoBg }]}>
            <Text style={[styles.testiText, { color: textColor }]}>
              « Le certificat en Infographie Multimédia m&apos;a ouvert de nombreuses portes. La
              formation pratique sur Photoshop et Illustrator était excellente, et j&apos;ai pu
              créer mon propre studio de design. »
            </Text>
            <Text style={[styles.testiAuthor, { color: titleColor }]}>
              — Mohamed Trabelsi, Infographiste
            </Text>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: cardBg }]}>
          <Text style={[styles.cardTitle, { color: titleColor }]}>📍 Contact</Text>
          <Text style={[styles.cardText, { color: textColor }]}>Bizerte, Tunisie</Text>
          <Text style={[styles.cardText, { color: textColor }]}>📞 +216 72 435 403</Text>
          <Text style={[styles.cardText, { color: textColor }]}>🌐 infoplus.tn</Text>
        </View>

        <View style={{ height: 16 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    backgroundColor: '#0D47A1',
    paddingHorizontal: 24,
    paddingBottom: 48,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  logoWrap: {
    width: 80,
    height: 80,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ripple: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#90CAF9',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
  },
  logoImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  title: { fontSize: 32, fontWeight: 'bold', color: '#ffffff' },
  subtitle: { fontSize: 16, color: '#90CAF9', marginTop: 4 },
  tagline: {
    fontSize: 12,
    color: '#fff',
    backgroundColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 10,
    overflow: 'hidden',
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: -28,
    gap: 8,
  },
  statCard: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#0D47A1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  statNumber: { fontSize: 20, fontWeight: 'bold' },
  statLabel: { fontSize: 10, marginTop: 2 },
  card: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#0D47A1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardLead: { fontSize: 15, fontWeight: '600', marginBottom: 8, lineHeight: 22 },
  cardText: { fontSize: 15, lineHeight: 24 },
  bulletList: { marginTop: 8, gap: 6 },
  bullet: { fontSize: 14, lineHeight: 20 },
  sectionLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 24,
    marginLeft: 16,
    marginBottom: 8,
  },
  gallery: {
    paddingHorizontal: 16,
    gap: 12,
  },
  galleryImg: {
    width: 220,
    height: 140,
    borderRadius: 14,
  },
  ctaBtn: {
    backgroundColor: '#0D47A1',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 14,
  },
  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  ctaBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  testimonial: {
    padding: 14,
    borderRadius: 12,
    marginTop: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#0D47A1',
  },
  testiText: { fontSize: 14, fontStyle: 'italic', lineHeight: 20 },
  testiAuthor: { fontSize: 12, fontWeight: 'bold', marginTop: 6 },
});
