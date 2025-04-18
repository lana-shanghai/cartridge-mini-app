import 'react-native-get-random-values';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import * as Linking from 'expo-linking';
import { generateKeyPair } from './core/keypair';
import { generateSessionUrl } from './core/sessionLink';

export default function App() {
  const [accountAddress, setAccountAddress] = useState<string | null>(null);
  const [sessionToken, setSessionToken] = useState<string | null>(null);

  useEffect(() => {
    const sub = Linking.addEventListener('url', ({ url }) => {
      const parsed = Linking.parse(url);
      const token = parsed.queryParams?.token as string;
      const address = parsed.queryParams?.address as string;

      if (token && address) {
        setSessionToken(token);
        setAccountAddress(address);
        console.log('✅ Session token:', token);
        console.log('📬 Account address:', address);
      } else {
        Alert.alert('❌ Session rejected or failed');
      }
    });

    return () => sub.remove();
  }, []);

  const connect = () => {
    const { publicKey } = generateKeyPair();
    const url = generateSessionUrl(publicKey);
    Linking.openURL(url);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
      <Text style={{ fontSize: 18, marginBottom: 16 }}>Cartridge Session</Text>

      {accountAddress ? (
        <>
          <Text>🎉 Connected</Text>
          <Text selectable>{accountAddress}</Text>
        </>
      ) : (
        <Button title="Connect to Cartridge" onPress={connect} />
      )}
    </View>
  );
}
