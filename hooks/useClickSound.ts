import { useAudioPlayer } from 'expo-audio';

const CLICK_SOUND_URL = 'https://cdn.pixabay.com/audio/2022/03/15/audio_d22b2c4dfb.mp3';

export function useClickSound() {
  const player = useAudioPlayer({ uri: CLICK_SOUND_URL });

  return () => {
    try {
      player.seekTo(0);
      player.play();
    } catch {
      // ignore — sound is non-critical
    }
  };
}
