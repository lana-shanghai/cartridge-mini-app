import * as Linking from 'expo-linking';

const CONTROLLER_URL = 'https://x.cartridge.gg/login'; // ??

export const generateSessionUrl = (publicKey: string): string => {
  const redirectUrl = Linking.createURL('/'); 
  // What params? 
  const params = new URLSearchParams({
    client: 'public',
    pubkey: publicKey,
    redirect: redirectUrl,
  });

  return `${CONTROLLER_URL}?${params.toString()}`;
};
