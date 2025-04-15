import React from 'react';
import { StyleSheet, Pressable, Text, Image, View } from 'react-native';

interface StyleTemplateSquareProps {
    imageUri?: number;
    icon: React.ReactNode;
    label: string;
    selected: boolean;
    onPress: () => void;
}

export const StyleTemplateSquare = ({ icon, label, imageUri, selected, onPress }: StyleTemplateSquareProps) => (
    <Pressable onPress={onPress} style={styles.wrapper}>
        <View style={[styles.styleOption, selected && styles.selectedStyle]}>
            {icon ? icon : <Image source={imageUri} resizeMode="cover" style={styles.styleImage} />}
        </View>
        <Text style={styles.styleLabel}>{label}</Text>
    </Pressable>
);

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        marginRight: 12,
        width: 90,
    },
    styleOption: {
        width: 90,
        height: 90,
        borderRadius: 13.71,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    selectedStyle: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 2,
        borderColor: '#4B3BFF',
    },
    styleImage: {
        width: '100%',
        height: '100%',
    },
    styleLabel: {
        marginTop: 8,
        color: 'white',
        fontSize: 12,
        textAlign: 'center',
    },
}); 