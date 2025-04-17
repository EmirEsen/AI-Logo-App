import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

import { db } from '../../lib/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { IImageDoc } from '../../models/IImageDoc';


export type ProgressState = 'pending' | 'success' | 'error';

interface StatusIndicatorChipProps {
    state: ProgressState;
    onRetry?: () => void;
    imageUrl?: string;
    prompt?: string;
}

export const StatusIndicatorChip = ({ state, onRetry, imageUrl, prompt }: StatusIndicatorChipProps) => {
    const router = useRouter();

    const addData = async (imageData: Omit<IImageDoc, 'created_at'>) => {
        try {
            await addDoc(collection(db, 'images'), {
                ...imageData,
                created_at: new Date()
            });
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    const handleSuccess = () => {
        if (imageUrl && prompt) {
            addData({
                image_url: imageUrl,
                prompt: prompt,
                user_id: '12345' //user ID Can be taken from apple id or some other unique id later.
            });

            router.push({
                pathname: '/(features)/ai-logo/success',
                params: {
                    prompt
                }
            });
        }
    };

    const renderContent = () => {
        switch (state) {
            case 'pending':
                return (
                    <View style={[styles.container, styles.pendingContainer]}>
                        <View style={styles.spinnerContainer}>
                            <ActivityIndicator size={24} color="white" />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>Creating Your Design...</Text>
                            <Text style={styles.subtitle}>Ready in 2 minutes</Text>
                        </View>
                    </View>
                );
            case 'success':
                return (
                    <Pressable
                        style={[styles.container, styles.successContainer]}
                        onPress={handleSuccess}
                    >
                        <View style={styles.logoPreview}>
                            {imageUrl ? (
                                <Image
                                    source={{ uri: imageUrl }}
                                    style={styles.previewImage}
                                    resizeMode="cover"
                                />
                            ) : (
                                <View style={styles.placeholderImage} />
                            )}
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>Your Design is Ready!</Text>
                            <Text style={styles.subtitle}>Tap to see it.</Text>
                        </View>
                    </Pressable>
                );
            case 'error':
                return (
                    <Pressable onPress={onRetry} style={[styles.container, styles.errorContainer]}>
                        <View style={styles.errorIcon}>
                            <Text style={styles.exclamation}>!</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>Oops, something went wrong!</Text>
                            <Text style={styles.subtitle}>Click to try again.</Text>
                        </View>
                    </Pressable>
                );
        }
    };

    return renderContent();
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        borderRadius: 16,
        height: 70,
        marginTop: 20,
        marginBottom: 10
    },
    pendingContainer: {
        backgroundColor: '#27272A',
    },
    successContainer: {
        backgroundColor: '#4B3BFF',
    },
    errorContainer: {
        backgroundColor: '#EF4444',
    },
    spinnerContainer: {
        width: 72,
        height: 72,
        backgroundColor: '#18181B',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
    },
    logoPreview: {
        width: 72,
        height: 72,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
    },
    previewImage: {
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
    },
    errorIcon: {
        width: 72,
        height: 72,
        backgroundColor: '#FEE2E2',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
    },
    exclamation: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#EF4444',
    },
    textContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 17,
        fontWeight: '600',
        color: 'white',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.7)',
    },
    placeholderImage: {
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
    },
}); 