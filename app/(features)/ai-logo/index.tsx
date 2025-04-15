import { StyleSheet, View, Pressable, Text, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function AILogoScreen() {
    const insets = useSafeAreaInsets();

    const navigateToFromScratch = () => {
        router.push('/(features)/ai-logo/from-scratch');
    };

    const navigateToFromTemplates = () => {
        router.push('/(features)/ai-logo/templates');
    };

    return (
        <LinearGradient
            colors={['#000000', '#2D1B4E', '#000000']}
            locations={[0, 0.5, 1]}
            style={styles.gradientBackground}
        >
            <View style={[styles.container, { paddingBottom: insets.bottom + 20 }]}>
                <Text style={styles.headerText}>Start Creating</Text>

                <Pressable
                    style={styles.optionCard}
                    onPress={() => navigateToFromScratch()}
                >
                    <LinearGradient
                        colors={['#d066a0', '#b04d9b']}
                        style={styles.cardGradient}
                    >
                        <View style={styles.iconContainer}>
                            <SymbolView name="pencil" size={36} tintColor="white" />
                        </View>

                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>From Scratch</Text>
                            <Text style={styles.cardDescription}>
                                Create your dream design providing every detail.
                            </Text>
                        </View>
                    </LinearGradient>
                </Pressable>

                <Pressable
                    style={styles.optionCard}
                    onPress={() => navigateToFromTemplates()}
                >
                    <LinearGradient
                        colors={['#5f5fb9', '#4747a1']}
                        style={styles.cardGradient}
                    >
                        <View style={styles.iconContainer}>
                            <SymbolView name="square.grid.2x2" size={36} tintColor="white" />
                        </View>

                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>From Template</Text>
                            <Text style={styles.cardDescription}>
                                Browse hundreds of stunning designs and make them uniquely yours.
                            </Text>
                        </View>
                    </LinearGradient>
                </Pressable>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradientBackground: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    headerText: {
        fontSize: 36,
        fontWeight: '500',
        color: 'white',
        marginTop: 5,
        marginBottom: 30,
    },
    optionCard: {
        width: '100%',
        height: width * 0.6,
        borderRadius: 20,
        marginBottom: 20,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    cardGradient: {
        flex: 1,
        padding: 20,
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    cardContent: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    cardTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },
    cardDescription: {
        fontSize: 16,
        color: 'white',
        opacity: 0.8,
        lineHeight: 22,
    },
    errorText: {
        color: 'white',
        fontSize: 18,
    }
}); 