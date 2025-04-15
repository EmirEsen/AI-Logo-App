import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, Dimensions, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    runOnJS,
    interpolate,
    Extrapolation
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

interface FeatureModalProps {
    isVisible: boolean;
    onClose: () => void;
    onProceed?: () => void;
    item: {
        id: string;
        title: string;
        backgroundColor: string;
        category?: string;
    };
}

const { width, height } = Dimensions.get('window');
const SNAP_THRESHOLD = height * 0.2;
const MODAL_HEIGHT = height * 0.9;

export default function FeatureModal({ isVisible, onClose, onProceed, item }: FeatureModalProps) {
    const translateY = useSharedValue(MODAL_HEIGHT);
    const opacity = useSharedValue(0);
    const [fullyHidden, setFullyHidden] = React.useState(!isVisible);

    useEffect(() => {
        if (isVisible) {
            setFullyHidden(false);
            translateY.value = withTiming(0, { duration: 300 });
            opacity.value = withTiming(1, { duration: 300 });
        } else {
            translateY.value = withTiming(MODAL_HEIGHT, { duration: 300 }, () => {
                runOnJS(setFullyHidden)(true);
            });
            opacity.value = withTiming(0, { duration: 300 });
        }
    }, [isVisible]);

    const panGesture = Gesture.Pan()
        .onUpdate((event) => {
            if (event.translationY > 0) {
                translateY.value = event.translationY;

                opacity.value = interpolate(
                    translateY.value,
                    [0, MODAL_HEIGHT],
                    [1, 0],
                    Extrapolation.CLAMP
                );
            }
        })
        .onEnd((event) => {
            if (event.translationY > SNAP_THRESHOLD) {
                // User has dragged enough to close
                translateY.value = withTiming(MODAL_HEIGHT, { duration: 300 }, () => {
                    runOnJS(onClose)();
                });
                opacity.value = withTiming(0, { duration: 300 });
            } else {
                // Snap back to open position
                translateY.value = withTiming(0, { duration: 200 });
                opacity.value = withTiming(1, { duration: 200 });
            }
        });

    const animatedContentStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
        };
    });

    const animatedBackgroundStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: `rgba(0,0,0,${opacity.value * 0.7})`,
        };
    });

    if (fullyHidden) return null;

    return (
        <Modal
            transparent={true}
            visible={true}
            statusBarTranslucent={true}
            animationType="none"
            onRequestClose={onClose}
        >
            <Animated.View style={[styles.modalContainer, animatedBackgroundStyle]}>
                <GestureDetector gesture={panGesture}>
                    <Animated.View style={[styles.modalContent, animatedContentStyle]}>
                        <View style={styles.handleBar} />

                        <View style={styles.mainContentArea}>
                            <View style={styles.previewImageContainer}>
                                <View style={[styles.itemPreview, { backgroundColor: item?.backgroundColor }]}>
                                    <Text style={styles.previewText}>Create your own {item?.title}</Text>
                                    {item?.category && (
                                        <Text style={styles.categoryText}>{item.category}</Text>
                                    )}
                                </View>
                            </View>

                            <View style={styles.textContentArea}>
                                <Text style={styles.titleText}>{item?.title}</Text>
                                <Text style={styles.descriptionText}>
                                    Bring your ideas to life with a professional {item?.title.toLowerCase()}.
                                    Just type your concept, choose your style, and watch it transform into reality with precision and creativity!
                                </Text>
                            </View>
                        </View>

                        <View style={styles.modalControls}>
                            <Pressable
                                onPress={() => {
                                    if (onProceed) {
                                        onProceed();
                                    } else {
                                        onClose();
                                    }
                                }}
                            >
                                <LinearGradient
                                    colors={['#8a65ff', '#6c63ff', '#5e56e8']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.primaryButton}
                                >
                                    <Text style={styles.buttonText}>Start</Text>
                                </LinearGradient>
                            </Pressable>
                        </View>
                    </Animated.View>
                </GestureDetector>
            </Animated.View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#141414',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingBottom: Platform.OS === 'ios' ? 40 : 20,
        paddingTop: 10,
        height: MODAL_HEIGHT,
        ...(Platform.OS === 'ios'
            ? { shadowColor: '#000', shadowOffset: { width: 0, height: -3 }, shadowOpacity: 0.2, shadowRadius: 5 }
            : { elevation: 5 }
        ),
    },
    handleBar: {
        width: 40,
        height: 5,
        backgroundColor: '#555',
        borderRadius: 3,
        marginVertical: 8,
        alignSelf: 'center',
    },
    mainContentArea: {
        flex: 1,
        paddingTop: 10,
    },
    previewImageContainer: {
        width: '100%',
        height: '65%',
        borderRadius: 15,
        overflow: 'hidden',
        marginBottom: 20,
    },
    itemPreview: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },
    previewText: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    categoryText: {
        color: 'white',
        fontSize: 16,
        opacity: 0.8,
        textAlign: 'center',
    },
    textContentArea: {
        paddingBottom: 20,
        marginTop: 25
    },
    titleText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 12,
    },
    descriptionText: {
        color: '#ccc',
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 28,
        paddingHorizontal: 10,
        letterSpacing: 0.3,
    },
    modalControls: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
        width: '100%',
        gap: 12,
    },
    primaryButton: {
        paddingVertical: 18,
        paddingHorizontal: 20,
        borderRadius: 50,
        width: width - 40,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    secondaryButton: {
        paddingVertical: 18,
        paddingHorizontal: 20,
        borderRadius: 50,
        width: width - 40,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#6c63ff',
    },
    secondaryButtonText: {
        color: '#6c63ff',
        fontSize: 18,
        fontWeight: 'bold',
    },
}); 