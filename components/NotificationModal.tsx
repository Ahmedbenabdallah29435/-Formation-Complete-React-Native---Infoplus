import { useTheme } from '@/contexts/ThemeContext';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  visible: boolean;
  title: string;
  message: string;
  emoji?: string;
  buttonLabel?: string;
  onClose: () => void;
};

export default function NotificationModal({
  visible,
  title,
  message,
  emoji = '📧',
  buttonLabel = 'OK, compris',
  onClose,
}: Props) {
  const { dark } = useTheme();
  const cardBg = dark ? '#2A3047' : '#fff';
  const titleColor = dark ? '#90CAF9' : '#0D47A1';
  const textColor = dark ? '#D6DCE8' : '#333';
  const closeColor = dark ? '#9AA0B6' : '#999';

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        {/* Inner pressable swallows clicks so tapping inside doesn't close. */}
        <Pressable style={[styles.card, { backgroundColor: cardBg }]} onPress={() => {}}>
          <Pressable onPress={onClose} hitSlop={10} style={styles.closeBtn}>
            <Text style={[styles.closeText, { color: closeColor }]}>✕</Text>
          </Pressable>

          <Text style={styles.emoji}>{emoji}</Text>
          <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
          <Text style={[styles.message, { color: textColor }]}>{message}</Text>

          <Pressable
            style={({ pressed }) => [styles.okBtn, pressed && styles.pressed]}
            onPress={onClose}
          >
            <Text style={styles.okBtnText}>{buttonLabel}</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 12,
  },
  closeBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: { fontSize: 22, fontWeight: '300' },
  emoji: { fontSize: 56, marginBottom: 12 },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 22,
  },
  okBtn: {
    backgroundColor: '#0D47A1',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  pressed: { opacity: 0.9, transform: [{ scale: 0.98 }] },
  okBtnText: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
});
