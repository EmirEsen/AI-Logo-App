import { StyleSheet, Text, View, ImageBackground, ImageSourcePropType, useWindowDimensions } from 'react-native'
import React from 'react'


interface CreationTypeCardProps {
    category: string
    title: string
    backgroundImage?: ImageSourcePropType
    onPress: () => void
    backgroundColor?: string
}

const FeatureCard = ({
    category,
    title,
    backgroundImage,
    backgroundColor = '#AAA'
}: CreationTypeCardProps) => {
    const { width } = useWindowDimensions();
    const cardWidth = (width - 48) / 2;

    return (
        <View
            style={[
                styles.cardContainer,
                {
                    backgroundColor,
                    width: cardWidth,
                    height: cardWidth
                }
            ]}
        >
            <View style={styles.textContainer}>
                <Text style={styles.categoryText}>{category}</Text>
                <Text style={styles.titleText}>{title}</Text>
            </View>
            {backgroundImage && (
                <View style={styles.imageContainer}>
                    <ImageBackground
                        source={backgroundImage}
                        style={styles.backgroundImage}
                        resizeMode="cover"
                    />
                </View>
            )}
        </View>
    )
}

export default FeatureCard

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    textContainer: {
        padding: 16,
    },
    categoryText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
        opacity: 0.9,
    },
    titleText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 4,
        lineHeight: 24,
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
    }
})