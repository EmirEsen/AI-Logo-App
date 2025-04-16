import { LogoProvider } from '@/components/context/LogoContext';
import { router, Stack } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Pressable } from 'react-native';

export default function AILogoLayout() {
    return (
        <LogoProvider>
            <Stack
                screenOptions={{
                    headerTitle: 'AI Logo',
                    headerStyle: {
                        backgroundColor: '#000000',
                    },
                    headerTintColor: '#FFFFFF',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerLeft: () => (
                        <Pressable onPress={() => router.back()}>
                            <SymbolView name="chevron.left" size={20} tintColor="white" />
                        </Pressable>
                    ),
                    headerRight: () => (
                        <Pressable onPress={() => router.back()}>
                            <SymbolView name="xmark" size={20} tintColor="white" />
                        </Pressable>
                    )
                }}
            >
                <Stack.Screen
                    name="from-scratch"
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="success"
                    options={{
                        headerShown: false
                    }}
                />
            </Stack>
        </LogoProvider>
    )
} 