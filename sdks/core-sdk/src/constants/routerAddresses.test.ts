import {
  ChainId,
  SUPPORTED_CHAINS,
  CHAIN_TO_ADDRESSES_MAP,
  V3_CORE_FACTORY_ADDRESSES,
  V3_MIGRATOR_ADDRESSES,
  MULTICALL_ADDRESSES,
  QUOTER_ADDRESSES,
  NONFUNGIBLE_POSITION_MANAGER_ADDRESSES,
  TICK_LENS_ADDRESSES,
  SWAP_ROUTER_02_ADDRESSES,
  ARGENT_WALLET_DETECTOR_ADDRESS,
  ENS_REGISTRAR_ADDRESSES,
} from './routerAddresses'
import { isValidChecksummedAddress } from './test-utils'

describe('ChainId enum', () => {
  it('contains expected values', () => {
    expect(ChainId.MAINNET).toBe(1)
    expect(ChainId.SEPOLIA).toBe(11155111)
    expect(ChainId.ARBITRUM_ONE).toBe(42161)
    expect(ChainId.OPTIMISM).toBe(10)
  })
})

describe('SUPPORTED_CHAINS', () => {
  it('contains Mainnet, Sepolia, Arbitrum, Optimism', () => {
    expect(SUPPORTED_CHAINS).toContain(ChainId.MAINNET)
    expect(SUPPORTED_CHAINS).toContain(ChainId.SEPOLIA)
    expect(SUPPORTED_CHAINS).toContain(ChainId.ARBITRUM_ONE)
    expect(SUPPORTED_CHAINS).toContain(ChainId.OPTIMISM)
  })

  it('has exactly 4 chains', () => {
    expect(SUPPORTED_CHAINS).toHaveLength(4)
  })
})

describe('CHAIN_TO_ADDRESSES_MAP', () => {
  it('has addresses for all supported chains', () => {
    SUPPORTED_CHAINS.forEach((chainId) => {
      expect(CHAIN_TO_ADDRESSES_MAP[chainId]).toBeDefined()
    })
  })

  it('Mainnet has v1MixedRouteQuoterAddress', () => {
    expect(CHAIN_TO_ADDRESSES_MAP[ChainId.MAINNET].v1MixedRouteQuoterAddress).toBeDefined()
    expect(isValidChecksummedAddress(CHAIN_TO_ADDRESSES_MAP[ChainId.MAINNET].v1MixedRouteQuoterAddress!)).toBe(true)
  })

  it('all chains have v3CoreFactoryAddress', () => {
    SUPPORTED_CHAINS.forEach((chainId) => {
      expect(CHAIN_TO_ADDRESSES_MAP[chainId].v3CoreFactoryAddress).toBeDefined()
      expect(isValidChecksummedAddress(CHAIN_TO_ADDRESSES_MAP[chainId].v3CoreFactoryAddress)).toBe(true)
    })
  })

  it('all chains have multicallAddress', () => {
    SUPPORTED_CHAINS.forEach((chainId) => {
      expect(CHAIN_TO_ADDRESSES_MAP[chainId].multicallAddress).toBeDefined()
      expect(isValidChecksummedAddress(CHAIN_TO_ADDRESSES_MAP[chainId].multicallAddress)).toBe(true)
    })
  })

  it('all chains have quoterAddress', () => {
    SUPPORTED_CHAINS.forEach((chainId) => {
      expect(CHAIN_TO_ADDRESSES_MAP[chainId].quoterAddress).toBeDefined()
      expect(isValidChecksummedAddress(CHAIN_TO_ADDRESSES_MAP[chainId].quoterAddress)).toBe(true)
    })
  })
})

describe('V3_CORE_FACTORY_ADDRESSES', () => {
  it('has address for each supported chain', () => {
    SUPPORTED_CHAINS.forEach((chainId) => {
      expect(V3_CORE_FACTORY_ADDRESSES[chainId]).toBeDefined()
    })
  })

  it('matches CHAIN_TO_ADDRESSES_MAP values', () => {
    SUPPORTED_CHAINS.forEach((chainId) => {
      expect(V3_CORE_FACTORY_ADDRESSES[chainId]).toBe(CHAIN_TO_ADDRESSES_MAP[chainId].v3CoreFactoryAddress)
    })
  })

  it('all addresses are valid', () => {
    Object.values(V3_CORE_FACTORY_ADDRESSES).forEach((address) => {
      expect(isValidChecksummedAddress(address)).toBe(true)
    })
  })
})

describe('V3_MIGRATOR_ADDRESSES', () => {
  it('has addresses for chains with migrator', () => {
    SUPPORTED_CHAINS.forEach((chainId) => {
      const migratorAddress = CHAIN_TO_ADDRESSES_MAP[chainId].v3MigratorAddress
      if (migratorAddress) {
        expect(V3_MIGRATOR_ADDRESSES[chainId]).toBe(migratorAddress)
      }
    })
  })
})

describe('MULTICALL_ADDRESSES', () => {
  it('has address for each supported chain', () => {
    SUPPORTED_CHAINS.forEach((chainId) => {
      expect(MULTICALL_ADDRESSES[chainId]).toBeDefined()
    })
  })

  it('Arbitrum has custom multicall address', () => {
    expect(MULTICALL_ADDRESSES[ChainId.ARBITRUM_ONE]).toBe('0xadF885960B47eA2CD9B55E6DAc6B42b7Cb2806dB')
  })

  it('all addresses are valid', () => {
    Object.values(MULTICALL_ADDRESSES).forEach((address) => {
      expect(isValidChecksummedAddress(address)).toBe(true)
    })
  })
})

describe('QUOTER_ADDRESSES', () => {
  it('has address for each supported chain', () => {
    SUPPORTED_CHAINS.forEach((chainId) => {
      expect(QUOTER_ADDRESSES[chainId]).toBeDefined()
    })
  })

  it('all addresses are valid', () => {
    Object.values(QUOTER_ADDRESSES).forEach((address) => {
      expect(isValidChecksummedAddress(address)).toBe(true)
    })
  })
})

describe('NONFUNGIBLE_POSITION_MANAGER_ADDRESSES', () => {
  it('has addresses for chains with NFT position manager', () => {
    SUPPORTED_CHAINS.forEach((chainId) => {
      const npmAddress = CHAIN_TO_ADDRESSES_MAP[chainId].nonfungiblePositionManagerAddress
      if (npmAddress) {
        expect(NONFUNGIBLE_POSITION_MANAGER_ADDRESSES[chainId]).toBe(npmAddress)
      }
    })
  })
})

describe('TICK_LENS_ADDRESSES', () => {
  it('has addresses for chains with tick lens', () => {
    SUPPORTED_CHAINS.forEach((chainId) => {
      const tickLensAddress = CHAIN_TO_ADDRESSES_MAP[chainId].tickLensAddress
      if (tickLensAddress) {
        expect(TICK_LENS_ADDRESSES[chainId]).toBe(tickLensAddress)
      }
    })
  })

  it('Arbitrum has tick lens address', () => {
    expect(TICK_LENS_ADDRESSES[ChainId.ARBITRUM_ONE]).toBeDefined()
  })

  it('Sepolia has tick lens address', () => {
    expect(TICK_LENS_ADDRESSES[ChainId.SEPOLIA]).toBeDefined()
  })
})

describe('SWAP_ROUTER_02_ADDRESSES', () => {
  it('returns correct address for supported chain', () => {
    const address = SWAP_ROUTER_02_ADDRESSES(ChainId.MAINNET)
    expect(isValidChecksummedAddress(address)).toBe(true)
  })

  it('returns default address when chain has no custom swapRouter02Address', () => {
    const address = SWAP_ROUTER_02_ADDRESSES(ChainId.ARBITRUM_ONE)
    expect(address).toBe('0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45')
  })

  it('returns empty string for unsupported chain', () => {
    const address = SWAP_ROUTER_02_ADDRESSES(999999)
    expect(address).toBe('')
  })

  it('returns valid address for all supported chains', () => {
    SUPPORTED_CHAINS.forEach((chainId) => {
      const address = SWAP_ROUTER_02_ADDRESSES(chainId)
      expect(isValidChecksummedAddress(address)).toBe(true)
    })
  })
})

describe('ARGENT_WALLET_DETECTOR_ADDRESS', () => {
  it('has address for Mainnet', () => {
    expect(ARGENT_WALLET_DETECTOR_ADDRESS[ChainId.MAINNET]).toBeDefined()
  })

  it('all addresses are valid checksummed', () => {
    Object.values(ARGENT_WALLET_DETECTOR_ADDRESS).forEach((address) => {
      expect(isValidChecksummedAddress(address)).toBe(true)
    })
  })

  it('has correct Mainnet address', () => {
    expect(ARGENT_WALLET_DETECTOR_ADDRESS[ChainId.MAINNET]).toBe('0xeca4B0bDBf7c55E9b7925919d03CbF8Dc82537E8')
  })
})

describe('ENS_REGISTRAR_ADDRESSES', () => {
  it('has addresses for default networks', () => {
    expect(ENS_REGISTRAR_ADDRESSES[ChainId.ARBITRUM_ONE]).toBeDefined()
    expect(ENS_REGISTRAR_ADDRESSES[ChainId.SEPOLIA]).toBeDefined()
  })

  it('all addresses are valid checksummed', () => {
    Object.values(ENS_REGISTRAR_ADDRESSES).forEach((address) => {
      expect(isValidChecksummedAddress(address)).toBe(true)
    })
  })

  it('has correct ENS registrar address', () => {
    expect(ENS_REGISTRAR_ADDRESSES[ChainId.ARBITRUM_ONE]).toBe('0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e')
  })
})
