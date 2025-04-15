import React from 'react';
import { StyleSheet, View, Text, Image, Pressable, SafeAreaView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { height: screenHeight } = Dimensions.get('window');
const imageContainerHeight = screenHeight * 0.4;

export default function SuccessScreen() {
    const params = useLocalSearchParams();
    const router = useRouter();

    const imageUrl = params.imageUrl as string;
    const prompt = params.prompt as string;

    return (
        <LinearGradient
            colors={['#000000', '#1A103C', '#000000']}
            locations={[0, 0.5, 1]}
            style={styles.gradientBackground}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Your Design</Text>
                    <Pressable onPress={() => router.back()} style={styles.closeButton}>
                        <Ionicons name="close" size={24} color="white" />
                    </Pressable>
                </View>

                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: imageUrl as string }}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.promptContainer}>
                    <View style={styles.promptBox}>
                        <View style={styles.promptContent}>
                            <Text style={styles.promptLabel}>Prompt</Text>
                            <Text style={styles.promptText}>{prompt}</Text>
                            <View style={styles.tag}>
                                <Text style={styles.tagText}>Monogram</Text>
                            </View>
                        </View>
                        <Pressable style={styles.copyButton}>
                            <Ionicons name="copy-outline" size={20} color="white" />
                            <Text style={styles.copyText}>Copy</Text>
                        </Pressable>
                    </View>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradientBackground: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        position: 'relative',
    },
    title: {
        fontSize: 22,
        fontWeight: '800',
        color: 'white',
        flex: 1,
        textAlign: 'left',
    },
    closeButton: {
        position: 'absolute',
        right: 20,
        top: 20,
    },
    imageContainer: {
        height: imageContainerHeight,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 16,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    promptContainer: {
        padding: 20,
        paddingTop: 0,
    },
    promptLabel: {
        fontSize: 17,
        fontWeight: '600',
        color: 'white',
        marginBottom: 12,
    },
    promptBox: {
        backgroundColor: '#27272A',
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    promptContent: {
        flex: 1,
        marginRight: 16,
    },
    promptText: {
        color: 'white',
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 12,
    },
    copyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        opacity: 0.7,
    },
    copyText: {
        color: 'white',
        fontSize: 14,
    },
    tag: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 100,
        alignSelf: 'flex-start',
    },
    tagText: {
        color: 'white',
        fontSize: 14,
        opacity: 0.7,
    },
}); 