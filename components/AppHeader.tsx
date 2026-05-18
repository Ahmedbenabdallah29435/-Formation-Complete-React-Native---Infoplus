import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  title: string;
  showBack?: boolean;
};

export default function AppHeader({ title, showBack = true }: Props) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { dark } = useTheme();

  const bg = dark ? '#1A1F36' : '#ffffff';
  const fg = dark ? '#ffffff' : '#0D47A1';
  const borderColor = dark ? '#2A3047' : '#E0E6ED';

  return (
    <View
      style={[
        styles.wrap,
        {
          backgroundColor: bg,
          paddingTop: insets.top + 8,
          borderBottomColor: borderColor,
        },
      ]}
    >
      {showBack ? (
        <Pressable onPress={() => router.back()} hitSlop={10} style={styles.backBtn}>
          <Text style={[styles.backText, { color: fg }]}>←</Text>
        </Pressable>
      ) : (
        <View style={styles.backBtn} />
      )}
      <Text style={[styles.title, { color: fg }]} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.backBtn} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: { fontSize: 28, fontWeight: '600' },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
  },
});
