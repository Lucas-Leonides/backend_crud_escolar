import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/logo_mediotec.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.titleText}>Bem-vindo ao Mundo Mágico da Educação!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={styles.subtitleText}>
          Cadastre seus alunos como se estivesse na lista de Grifinória!
        </ThemedText>
        <ThemedText style={styles.bodyText}>
          Utilize nossa aplicação para gerenciar alunos e visualizar avisos importantes!
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={styles.subtitleText}>
          Veja os avisos gerais e anotações de aula
        </ThemedText>
        <ThemedText style={styles.bodyText}>
          Mantenha-se atualizado como um verdadeiro membro da Ordem da Fênix!
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={styles.subtitleText}>
          Navegue facilmente entre as funcionalidades
        </ThemedText>
        <ThemedText style={styles.bodyText}>
          Nossa aplicação é intuitiva e feita para você brilhar como um bruxo nas aulas!
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#683ba8',
    borderRadius: 8,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  stepContainer: {
    gap: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff10',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  reactLogo: {
    height: 200,
    width: '100%',
    resizeMode: 'contain',
    marginTop: Platform.OS === 'ios' ? 50 : 30,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitleText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f0f0f0',
    marginBottom: 4,
  },
  bodyText: {
    fontSize: 16,
    color: '#d0d0d0',
    lineHeight: 22,
  },
});