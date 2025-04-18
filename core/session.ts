export const RPC_URL = "https://api.cartridge.gg/x/starknet/sepolia";

export const SESSION_POLICIES = {
  contracts: {
    "0x0177e5823b329287ca303f6222e1ef174d0fa0fd0a91ffc5e56646c37262fb5a": {
      methods: [
        {
          name: "increase_balance",
          entrypoint: "increase_balance",
          description: "Increase balance of the contract",
        },
        {
          name: "get_balance",
          entrypoint: "get_balance",
          description: "Read contract balance",
        },
      ],
    },
  },
};
