import { utils, getStarkKey } from '@scure/starknet';
import { bytesToHex, hexToBytes } from '@noble/hashes/utils'; // ✅ Here
import AsyncStorage from '@react-native-async-storage/async-storage';


const STORAGE_KEYS = {
    PRIVATE: 'starknet:privateKey',
    PUBLIC: 'starknet:publicKey',
  };
  
export const generateKeyPair = () => {
    const privateKeyBytes = utils.randomPrivateKey();
    const privateKey = bytesToHex(privateKeyBytes);
    const publicKey = getStarkKey(privateKey);

    // console.log('Generated KeyPair:', { privateKey, publicKey });

    return { privateKey, publicKey };
};

export const storeKeyPair = async (privateKey: string, publicKey: string) => {
    try {
        console.log('💾 Saving keypair to AsyncStorage...');
        await AsyncStorage.setItem(STORAGE_KEYS.PRIVATE, privateKey);
        await AsyncStorage.setItem(STORAGE_KEYS.PUBLIC, publicKey);
    } catch (err) {
        console.error('❌ Failed to save keypair:', err);
    }
};
  

export const loadOrCreateKeyPair = async () => {
    const privateKey = await AsyncStorage.getItem(STORAGE_KEYS.PRIVATE);
    const publicKey = await AsyncStorage.getItem(STORAGE_KEYS.PUBLIC);

    if (privateKey && publicKey) {
        console.log('Loaded keys from storage');
        return { privateKey, publicKey };
    }

    console.log('Generating new keys...');
    const newKeys = generateKeyPair();
    await storeKeyPair(newKeys.privateKey, newKeys.publicKey);
    return newKeys;
};
  