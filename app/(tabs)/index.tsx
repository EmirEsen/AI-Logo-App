import { FlatList, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

import { View } from '@/components/Themed';
import FeatureCard from '@/components/ui/FeatureCard';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FeatureModal from '@/components/ui/FeatureModal';

const MOCK_FEATURES = [
  {
    id: '1',
    title: 'AI Logo',
    category: 'AI Transform',
    backgroundColor: '#5b91b0',
    route: 'ai-logo'
  },
  {
    id: '2',
    title: 'AI Tattoo',
    category: 'AI Image',
    backgroundColor: '#e0a87d',
    route: 'ai-tattoo'
  },
  {
    id: '3',
    title: 'AI Signature',
    category: 'AI Design',
    backgroundColor: '#a9a9a9',
    route: 'ai-signature'
  },
  {
    id: '4',
    title: 'AI Art',
    category: 'AI Create',
    backgroundColor: '#6495ed',
    route: 'ai-art'
  },
  {
    id: '5',
    title: 'AI Room Design',
    category: 'AI Transform',
    backgroundColor: '#e0a87d',
    route: 'ai-room-design'
  },
  {
    id: '6',
    title: 'Hair Texture',
    category: 'AI Style',
    backgroundColor: '#5b91b0'
  },
  {
    id: '7',
    title: 'Face Shape',
    category: 'AI Analysis',
    backgroundColor: '#a9a9a9'
  },
  {
    id: '8',
    title: 'Celebrity Look',
    category: 'AI Match',
    backgroundColor: '#6495ed'
  },
];

export default function TabOneScreen() {
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<typeof MOCK_FEATURES[0] | null>(null);
  const router = useRouter();

  const handleCardPress = (feature: typeof MOCK_FEATURES[0]) => {
    setSelectedItem(feature);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const navigateToFeature = (feature: typeof MOCK_FEATURES[0]) => {
    setModalVisible(false);
    setTimeout(() => {
      router.push(`/(features)/${feature.route}` as const);
    }, 200);
  };

  const renderItem = ({ item }: { item: typeof MOCK_FEATURES[0] }) => (
    <Pressable onPress={() => handleCardPress(item)}>
      <FeatureCard
        category={item.category}
        title={item.title}
        backgroundColor={item.backgroundColor}
        onPress={() => handleCardPress(item)}
      />
    </Pressable>
  );

  return (
    <LinearGradient
      colors={['#000000', '#2D1B4E', '#000000']}
      locations={[0, 0.5, 1]}
      style={styles.gradientBackground}
    >
      <View style={styles.container}>
        <FlatList
          data={MOCK_FEATURES}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.listContainer,
            { paddingBottom: insets.bottom + 70 }
          ]}
          columnWrapperStyle={styles.row}
        />
      </View>

      {selectedItem && (
        <FeatureModal
          isVisible={modalVisible}
          onClose={handleCloseModal}
          item={selectedItem}
          onProceed={() => navigateToFeature(selectedItem)}
        />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1
  },
  container: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});
