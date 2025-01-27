import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'myAppToken';

export async function saveTokenToStorage(token: string) {
    await AsyncStorage.setItem(TOKEN_KEY, token);
}

export async function removeTokenFromStorage() {
    await AsyncStorage.removeItem(TOKEN_KEY);
}

export async function getTokenFromStorage(): Promise<string | null> {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return token;
}
