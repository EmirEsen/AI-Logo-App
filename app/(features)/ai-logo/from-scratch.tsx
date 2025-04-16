import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, FlatList, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { Keyboard } from 'react-native';
import { StatusIndicatorChip, ProgressState } from '@/components/ui/StatusIndicatorChip';
import { StyleTemplateSquare } from '@/components/ui/StyleTemplateSquare';
import { generateLogo } from '../../../lib/api';

interface StyleOption {
    id: string;
    label: string;
    icon?: React.ReactNode;
    imageUri?: number;
}

const DUMMY_STYLE_OPTIONS: StyleOption[] = [
    {
        id: 'no-style',
        label: 'No Style',
        icon: <Ionicons name="close-circle-outline" size={28} color="white" />,
    },
    {
        id: 'monogram',
        label: 'Monogram',
        imageUri: require('../../../assets/images/logo-styles/style1.png'),
    },
    {
        id: 'abstract',
        label: 'Abstract',
        imageUri: require('../../../assets/images/logo-styles/style2.png'),
    },
    {
        id: 'mascot',
        label: 'Mascot',
        icon: <Ionicons name="fish-outline" size={24} color="white" />,
    },
    {
        id: 'mascot2',
        label: 'Mascot',
        icon: <Ionicons name="fish-outline" size={24} color="white" />,
    },
    {
        id: 'mascot3',
        label: 'Mascot',
        icon: <Ionicons name="fish-outline" size={24} color="white" />,
    },
    {
        id: 'mascot4',
        label: 'Mascot',
        icon: <Ionicons name="fish-outline" size={24} color="white" />,
    },
];

export default function FromScratchScreen() {
    const [prompt, setPrompt] = useState('');
    const [selectedStyle, setSelectedStyle] = useState('no-style');
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [progressState, setProgressState] = useState<ProgressState | null>(null);
    const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

    const handleCreate = async () => {
        if (!prompt) return;

        Keyboard.dismiss();
        setProgressState('pending');

        try {
            const imageUrl = await generateLogo(prompt);
            setGeneratedImageUrl(imageUrl);
            setProgressState('success');
        } catch (error) {
            console.error('Error:', error);
            setProgressState('error');
        }
    };

    const handleRetry = () => {
        handleCreate();
    };

    const handleSurpriseMe = () => {
        setPrompt('Minimalistic logo for a boutique hotel named Cosmos on the Aegean coast of Turkey, featuring ocean waves and terracotta accents.');
    };

    const renderStyleOption = ({ item }: { item: StyleOption }) => (
        <StyleTemplateSquare
            icon={item.icon}
            imageUri={item.imageUri}
            label={item.label}
            selected={selectedStyle === item.id}
            onPress={() => setSelectedStyle(item.id)}
        />
    );

    return (
        <LinearGradient
            colors={['#000000', '#1A103C', '#000000']}
            locations={[0, 0.5, 1]}
            style={styles.gradientBackground}
        >
            <SafeAreaView style={styles.safeArea}>
                <Text style={styles.title}>AI Logo</Text>
                {progressState ? (
                    <StatusIndicatorChip
                        state={progressState}
                        onRetry={handleRetry}
                        imageUrl={generatedImageUrl || undefined}
                        prompt={prompt}
                    />
                ) : <></>}
                <View style={styles.promptSection}>
                    <View style={styles.promptHeader}>
                        <Text style={styles.promptTitle}>Enter Your Prompt</Text>
                        <Pressable onPress={handleSurpriseMe} style={styles.surpriseButton}>
                            <Text style={{ fontSize: 12 }}>🎲</Text>
                            <Text style={styles.surpriseText}>Surprise me</Text>
                        </Pressable>
                    </View>

                    <BlurView intensity={90} tint="dark" style={[styles.inputWrapper, isInputFocused && styles.inputWrapperFocused]}>
                        <TextInput
                            style={styles.input}
                            placeholder={isInputFocused ? "" : "A blue lion logo reading 'HEXA' in bold letters"}
                            placeholderTextColor="#71717A"
                            value={prompt}
                            onChangeText={setPrompt}
                            multiline
                            maxLength={500}
                            onFocus={() => setIsInputFocused(true)}
                            onBlur={() => setIsInputFocused(false)}
                            returnKeyType="done"
                            enablesReturnKeyAutomatically={true}
                            onKeyPress={({ nativeEvent }) => {
                                if (nativeEvent.key === 'Enter') {
                                    Keyboard.dismiss();
                                }
                            }}
                            onSubmitEditing={() => {
                                Keyboard.dismiss();
                                setIsInputFocused(false);
                            }}
                        />
                        <Text style={styles.counter}>{prompt.length}/500</Text>
                    </BlurView>
                </View>

                <Text style={styles.sectionTitle}>Logo Styles</Text>
                <FlatList
                    data={DUMMY_STYLE_OPTIONS}
                    renderItem={renderStyleOption}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingLeft: 20 }}
                />

                <Pressable onPress={handleCreate} style={styles.createButton}>
                    <LinearGradient
                        colors={['#4B3BFF', '#9C3BFF']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.createGradient}
                    >
                        <Text style={styles.createText}>Create</Text>
                        <Ionicons name="sparkles" size={20} color="white" style={styles.sparkle} />
                    </LinearGradient>
                </Pressable>

            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradientBackground: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    title: {
        fontFamily: 'Manrope-ExtraBold',
        fontSize: 17,
        fontWeight: '800',
        lineHeight: 22,
        letterSpacing: -0.17,
        textAlign: 'center',
        color: 'white',
        marginTop: 60,
        marginBottom: 32,
    },
    promptSection: {
        padding: 20
    },
    promptHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    promptTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    surpriseButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    surpriseText: {
        color: 'white',
        fontSize: 16,
    },
    inputWrapper: {
        backgroundColor: '#27272A',
        borderRadius: 16,
        overflow: 'hidden',
        minHeight: 175,
        padding: 16,
        borderWidth: 0,
    },
    inputWrapperFocused: {
        borderWidth: 1,
        borderColor: '#FAFAFA',
    },
    input: {
        color: 'white',
        fontSize: 16,
        flex: 1,
    },
    counter: {
        color: '#71717A',
        fontSize: 14,
        alignSelf: 'flex-start',
        marginTop: 8,
    },
    stylesSection: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 16,
        paddingHorizontal: 20
    },
    createButton: {
        marginTop: 'auto',
        marginBottom: 40,
        marginHorizontal: 25,
        height: 56,
        borderRadius: 28,
        overflow: 'hidden',
    },
    createGradient: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    createText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    sparkle: {
        marginLeft: 4,
    },
}); 
