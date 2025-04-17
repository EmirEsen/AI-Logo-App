import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, FlatList, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { Keyboard } from 'react-native';
import { StatusIndicatorChip, ProgressState } from '@/components/ui/StatusIndicatorChip';
import { StyleTemplateSquare } from '@/components/ui/StyleTemplateSquare';
import { generateLogo } from '../../../lib/api';
import { useLogo } from '@/components/context/LogoContext';
import SvgSlashIcon from '@/components/ui/svgs/SvgSlashIcon';
import SvgCreateSparkles from '@/components/ui/svgs/SvgCreateSparkles';

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
        icon: <SvgSlashIcon />,
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

    const { setLogoUrl } = useLogo();

    const handleCreate = async () => {
        if (!prompt) return;

        Keyboard.dismiss();
        setProgressState('pending');

        try {
            const imageUrl = await generateLogo(prompt);
            setLogoUrl(imageUrl);
            setGeneratedImageUrl(imageUrl)
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
                <View style={styles.headerTitle}>
                    <Text style={styles.title}>AI Logo</Text>
                </View>
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
                            <Text style={{ fontSize: 10, marginRight: -6 }}>🎲</Text>
                            <Text style={styles.surpriseText}>Surprise me</Text>
                        </Pressable>
                    </View>

                    <View style={[styles.inputWrapper, isInputFocused && styles.inputWrapperFocused]}>
                        <LinearGradient
                            colors={['rgba(39, 39, 42, 0.7)', 'rgba(39, 39, 42, 0.7)']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.inputGradient}
                        >
                            <TextInput
                                style={styles.input}
                                placeholder={isInputFocused ? "" : "A blue lion logo reading 'HEXA' in bold letters"}
                                placeholderTextColor="rgba(113, 113, 122, 0.8)"
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
                        </LinearGradient>
                    </View>
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
                        <SvgCreateSparkles />
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
    headerTitle: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
    },
    title: {
        fontFamily: 'Manrope-ExtraBold',
        fontSize: 17,
        fontWeight: '800',
        lineHeight: 22,
        letterSpacing: -0.17,
        textAlign: 'center',
        color: 'white',
    },
    promptSection: {
        padding: 20,
        marginBottom: 12
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
        fontSize: 13,
    },
    inputWrapper: {
        borderRadius: 16,
        overflow: 'hidden',
        minHeight: 175,
        borderWidth: 0,
        backgroundColor: 'rgba(39, 39, 42, 0.2)',
    },
    inputWrapperFocused: {
        borderWidth: 1,
        borderColor: '#FAFAFA',
    },
    inputGradient: {
        flex: 1,
        padding: 16,
        backgroundColor: 'transparent',
    },
    input: {
        color: 'white',
        fontSize: 16,
        flex: 1,
        backgroundColor: 'transparent',
    },
    counter: {
        color: 'rgba(113, 113, 122, 0.8)',
        fontSize: 14,
        alignSelf: 'flex-start',
        marginTop: 8,
    },
    stylesSection: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '800',
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
