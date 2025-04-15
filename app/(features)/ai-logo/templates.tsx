import { StyleSheet, View, Text, FlatList, Pressable, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';

const MOCK_TEMPLATES = [
    { id: '1', name: 'Modern Minimal', image: 'https://example.com/logo1.jpg' },
    { id: '2', name: 'Classic Elegance', image: 'https://example.com/logo2.jpg' },
    { id: '3', name: 'Tech Inspired', image: 'https://example.com/logo3.jpg' },
    { id: '4', name: 'Nature Theme', image: 'https://example.com/logo4.jpg' },
    { id: '5', name: 'Abstract Design', image: 'https://example.com/logo5.jpg' },
    { id: '6', name: 'Geometric Style', image: 'https://example.com/logo6.jpg' },
];

export default function TemplatesScreen() {
    const handleTemplateSelect = (templateId: string) => {
        router.push({
            pathname: '/(features)/ai-logo/success',
            params: { templateId }
        });
    };

    const renderTemplate = ({ item }: { item: typeof MOCK_TEMPLATES[0] }) => (
        <Pressable
            style={styles.templateCard}
            onPress={() => handleTemplateSelect(item.id)}
        >
            <BlurView intensity={90} tint="dark" style={styles.templateBlur}>
                <View style={styles.templateImageContainer}>
                    <Image
                        source={{ uri: item.image }}
                        style={styles.templateImage}
                    />
                </View>
                <Text style={styles.templateName}>{item.name}</Text>
            </BlurView>
        </Pressable>
    );

    return (
        <LinearGradient
            colors={['#000000', '#2D1B4E', '#000000']}
            locations={[0, 0.5, 1]}
            style={styles.gradientBackground}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Choose a Template</Text>
                <Text style={styles.subtitle}>Select a template to customize</Text>

                <FlatList
                    data={MOCK_TEMPLATES}
                    renderItem={renderTemplate}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradientBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 40,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#A0A0A0',
        marginBottom: 24,
    },
    listContainer: {
        paddingBottom: 32,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    templateCard: {
        width: '48%',
        aspectRatio: 1,
        borderRadius: 12,
        overflow: 'hidden',
    },
    templateBlur: {
        flex: 1,
        padding: 12,
    },
    templateImageContainer: {
        flex: 1,
        backgroundColor: '#2A2A2A',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 8,
    },
    templateImage: {
        width: '100%',
        height: '100%',
    },
    templateName: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
    },
}); 