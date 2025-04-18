import { utils, getStarkKey } from '@scure/starknet';
import { bytesToHex } from '@noble/hashes/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';


const STORAGE_KEYS = {
    PRIVATE: 'starknet:privateKey',
    PUBLIC: 'starknet:publicKey',
  };
  
export const generateKeyPair = () => {
    const privateKeyBytes = utils.randomPrivateKey();
    const privateKey = bytesToHex(privateKeyBytes);
    const publicKey = getStarkKey(privateKey);

    return { privateKey, publicKey };
};

export const storeKeyPair = async (privateKey: string, publicKey: string) => {
    try {
        await AsyncStorage.setItem(STORAGE_KEYS.PRIVATE, privateKey);
        await AsyncStorage.setItem(STORAGE_KEYS.PUBLIC, publicKey);
    } catch (err) {
        console.error('Failed to save keypair:', err);
    }
};
  

export const loadOrCreateKeyPair = async () => {
    const privateKey = await AsyncStorage.getItem(STORAGE_KEYS.PRIVATE);
    const publicKey = await AsyncStorage.getItem(STORAGE_KEYS.PUBLIC);

    if (privateKey && publicKey) {
        return { privateKey, publicKey };
    }

    const newKeys = generateKeyPair();
    await storeKeyPair(newKeys.privateKey, newKeys.publicKey);
    return newKeys;
};
  