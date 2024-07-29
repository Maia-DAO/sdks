import { SupportedChainId } from './chainIds'
import { AddressMap } from './types'

// Zero address
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

// Address that all chains, except arbitrum, will use for the to param in a transaction
export const LAYER_ZERO_ENDPOINT_ADDRESS: AddressMap = {
  //MAINNETS
  [SupportedChainId.ARBITRUM_ONE]: '0x3c2269811836af69497E5F486A85D7316753cf62',
  [SupportedChainId.MAINNET]: '0x66A71Dcef29A0fFBDBE3c6a460a3B5BC225Cd675',
  [SupportedChainId.OPTIMISM]: '0x3c2269811836af69497E5F486A85D7316753cf62',
  [SupportedChainId.BASE]: '0x9740FF91F1985D8d2B71494aE1A2f723bb3Ed9E4',
  [SupportedChainId.POLYGON]: '0x3c2269811836af69497E5F486A85D7316753cf62',
  [SupportedChainId.BSC]: '0x3c2269811836af69497E5F486A85D7316753cf62',
  [SupportedChainId.AVAX]: '0x3c2269811836af69497E5F486A85D7316753cf62',
  [SupportedChainId.METIS]: '0x9740FF91F1985D8d2B71494aE1A2f723bb3Ed9E4',

  // [SupportedChainId.FANTOM]: '0xb6319cC6c8c27A8F5dAF0dD3DF91EA35C4720dd7',
  // [SupportedChainId.SCROLL]: '0xb6319cC6c8c27A8F5dAF0dD3DF91EA35C4720dd7',
  // [SupportedChainId.MANTLE]: '0xb6319cC6c8c27A8F5dAF0dD3DF91EA35C4720dd7',
  // [SupportedChainId.FRAXTAL]: '0xb6319cC6c8c27A8F5dAF0dD3DF91EA35C4720dd7',
  // [SupportedChainId.GNOSIS]: '0x9740FF91F1985D8d2B71494aE1A2f723bb3Ed9E4',

  //TESTNETS
  [SupportedChainId.SEPOLIA]: '0xae92d5aD7583AD66E49A0c67BAd18F6ba52dDDc1',
  [SupportedChainId.ARBITRUM_SEPOLIA]: '0x6098e96a28E02f27B1e6BD381f870F1C8Bd169d3',
  [SupportedChainId.OPTIMISM_SEPOLIA]: '0x55370E0fBB5f5b8dAeD978BA1c075a499eB107B8',
  [SupportedChainId.BASE_SEPOLIA]: '0x55370E0fBB5f5b8dAeD978BA1c075a499eB107B8',

  [SupportedChainId.POLYGON_AMOY]: '0x55370E0fBB5f5b8dAeD978BA1c075a499eB107B8',

  // [SupportedChainId.FANTOM_TESTNET]: '0x7dcAD72640F835B0FA36EFD3D6d3ec902C7E5acf',
  // [SupportedChainId.BSC_TESTNET]: '0x6Fcb97553D41516Cb228ac03FdC8B9a0a9df04A1',
  // [SupportedChainId.AVAX_FUJI]: '0x93f54D755A063cE7bB9e6Ac47Eccc8e33411d706',
}

// Address that all chains, except arbitrum, will use for the to param in a transaction
export const ULTRA_LIGHT_NODE_V2_ADDRESS: AddressMap = {
  //MAINNETS
  [SupportedChainId.ARBITRUM_ONE]: '0x4D73AdB72bC3DD368966edD0f0b2148401A178E2',
  [SupportedChainId.MAINNET]: '0x4D73AdB72bC3DD368966edD0f0b2148401A178E2',
  [SupportedChainId.OPTIMISM]: '0x4D73AdB72bC3DD368966edD0f0b2148401A178E2',
  [SupportedChainId.BASE]: '0x38dE71124f7a447a01D67945a51eDcE9FF491251',
  [SupportedChainId.POLYGON]: '0x4D73AdB72bC3DD368966edD0f0b2148401A178E2',
  [SupportedChainId.BSC]: '0x4D73AdB72bC3DD368966edD0f0b2148401A178E2',
  [SupportedChainId.AVAX]: '0x4D73AdB72bC3DD368966edD0f0b2148401A178E2',
  [SupportedChainId.METIS]: '0x38dE71124f7a447a01D67945a51eDcE9FF491251',

  // [SupportedChainId.FANTOM]: '0x4D73AdB72bC3DD368966edD0f0b2148401A178E2',
  // [SupportedChainId.SCROLL]: '0x38dE71124f7a447a01D67945a51eDcE9FF491251',
  // [SupportedChainId.MANTLE]: '0x38dE71124f7a447a01D67945a51eDcE9FF491251',
  // [SupportedChainId.FRAXTAL]: '0x38dE71124f7a447a01D67945a51eDcE9FF491251',
  // [SupportedChainId.GNOSIS]: '0x38dE71124f7a447a01D67945a51eDcE9FF491251',

  //TESTNETS
  [SupportedChainId.SEPOLIA]: '0x3aCAAf60502791D199a5a5F0B173D78229eBFe32',
  [SupportedChainId.ARBITRUM_SEPOLIA]: '0x88866E5A296FffA511EF8011CB1BBd4d01Cd094F',
  [SupportedChainId.OPTIMISM_SEPOLIA]: '0x35AdD9321507A87471a11EBd4aE4f592d531e620',
  [SupportedChainId.BASE_SEPOLIA]: '0x35AdD9321507A87471a11EBd4aE4f592d531e620',

  [SupportedChainId.POLYGON_AMOY]: '0x35AdD9321507A87471a11EBd4aE4f592d531e620',

  // [SupportedChainId.FANTOM_TESTNET]: ZERO_ADDRESS,
  // [SupportedChainId.BSC_TESTNET]: ZERO_ADDRESS,
  // [SupportedChainId.AVAX_FUJI]: ZERO_ADDRESS,
}