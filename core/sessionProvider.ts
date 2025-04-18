import SessionProvider from '@cartridge/controller';
import { constants } from 'starknet';
import { SESSION_POLICIES } from './session';


const provider = new SessionProvider({
    chains: [
      { rpcUrl: 'https://api.cartridge.gg/x/starknet/sepolia' },
    ],
    defaultChainId: constants.StarknetChainId.SN_SEPOLIA,
    policies: SESSION_POLICIES,
  });

export default provider;
