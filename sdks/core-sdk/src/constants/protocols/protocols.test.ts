import { SupportedChainId } from '../chainIds'
import { ZERO_ADDRESS } from '../addresses'
import { BalancerAddresses } from './BalancerAddresses'
import { HermesAddresses } from './HermesAddresses'
import { MaiaAddresses } from './MaiaAddresses'
import { TalosAddresses } from './TalosAddresses'
import { Ulysses } from './UlyssesAddresses'
import { isValidBytes32, isAddressField, expectChecksummedAddress } from '../test-utils'

describe('BalancerAddresses', () => {
  it('has addresses for Arbitrum and Sepolia', () => {
    expect(BalancerAddresses[SupportedChainId.ARBITRUM_ONE]).toBeDefined()
    expect(BalancerAddresses[SupportedChainId.SEPOLIA]).toBeDefined()
  })

  it('all addresses are valid checksummed', () => {
    Object.entries(BalancerAddresses).forEach(([chainId, addresses]) => {
      if (!addresses) return
      Object.entries(addresses).forEach(([key, value]) => {
        if (isAddressField(key, value)) {
          expectChecksummedAddress(value, `BalancerAddresses[${chainId}].${key}`)
        }
      })
    })
  })

  it('all init code hashes are valid bytes32', () => {
    Object.entries(BalancerAddresses).forEach(([_chainId, addresses]) => {
      if (!addresses) return
      Object.entries(addresses).forEach(([key, value]) => {
        if (key.toLowerCase().includes('hash') || key.toLowerCase().includes('initcode')) {
          expect(isValidBytes32(value)).toBe(true)
        }
      })
    })
  })
})

describe('HermesAddresses', () => {
  it('has addresses for Arbitrum and Sepolia', () => {
    expect(HermesAddresses[SupportedChainId.ARBITRUM_ONE]).toBeDefined()
    expect(HermesAddresses[SupportedChainId.SEPOLIA]).toBeDefined()
  })

  it('all Arbitrum addresses are valid checksummed', () => {
    const addresses = HermesAddresses[SupportedChainId.ARBITRUM_ONE]
    if (!addresses) throw new Error('Arbitrum addresses should be defined')
    Object.entries(addresses).forEach(([key, value]) => {
      if (isAddressField(key, value)) {
        expectChecksummedAddress(value, `HermesAddresses[ARBITRUM_ONE].${key}`)
      }
    })
  })

  it('all Sepolia addresses are valid checksummed', () => {
    const addresses = HermesAddresses[SupportedChainId.SEPOLIA]
    if (!addresses) throw new Error('Sepolia addresses should be defined')
    Object.entries(addresses).forEach(([key, value]) => {
      if (isAddressField(key, value)) {
        expectChecksummedAddress(value, `HermesAddresses[SEPOLIA].${key}`)
      }
    })
  })
})

describe('MaiaAddresses', () => {
  it('has addresses for Arbitrum and Sepolia', () => {
    expect(MaiaAddresses[SupportedChainId.ARBITRUM_ONE]).toBeDefined()
    expect(MaiaAddresses[SupportedChainId.SEPOLIA]).toBeDefined()
  })

  it('all Arbitrum addresses are valid checksummed', () => {
    const addresses = MaiaAddresses[SupportedChainId.ARBITRUM_ONE]
    if (!addresses) throw new Error('Arbitrum addresses should be defined')
    Object.entries(addresses).forEach(([key, value]) => {
      if (isAddressField(key, value) && value !== ZERO_ADDRESS) {
        expectChecksummedAddress(value, `MaiaAddresses[ARBITRUM_ONE].${key}`)
      }
    })
  })

  it('all Sepolia addresses are valid checksummed', () => {
    const addresses = MaiaAddresses[SupportedChainId.SEPOLIA]
    if (!addresses) throw new Error('Sepolia addresses should be defined')
    Object.entries(addresses).forEach(([key, value]) => {
      if (isAddressField(key, value) && value !== ZERO_ADDRESS) {
        expectChecksummedAddress(value, `MaiaAddresses[SEPOLIA].${key}`)
      }
    })
  })
})

describe('TalosAddresses', () => {
  it('has addresses for Arbitrum and Sepolia', () => {
    expect(TalosAddresses[SupportedChainId.ARBITRUM_ONE]).toBeDefined()
    expect(TalosAddresses[SupportedChainId.SEPOLIA]).toBeDefined()
  })

  it('all Arbitrum addresses are valid checksummed', () => {
    const addresses = TalosAddresses[SupportedChainId.ARBITRUM_ONE]
    if (!addresses) throw new Error('Arbitrum addresses should be defined')
    Object.entries(addresses).forEach(([key, value]) => {
      if (isAddressField(key, value)) {
        expectChecksummedAddress(value, `TalosAddresses[ARBITRUM_ONE].${key}`)
      }
    })
  })

  it('all Sepolia addresses are valid checksummed', () => {
    const addresses = TalosAddresses[SupportedChainId.SEPOLIA]
    if (!addresses) throw new Error('Sepolia addresses should be defined')
    Object.entries(addresses).forEach(([key, value]) => {
      if (isAddressField(key, value)) {
        expectChecksummedAddress(value, `TalosAddresses[SEPOLIA].${key}`)
      }
    })
  })
})

describe('UlyssesAddresses', () => {
  // All 17 Ulysses chains (12 mainnets + 5 testnets)
  const ULYSSES_MAINNET_CHAINS = [
    SupportedChainId.ARBITRUM_ONE,
    SupportedChainId.MAINNET,
    SupportedChainId.OPTIMISM,
    SupportedChainId.BASE,
    SupportedChainId.POLYGON,
    SupportedChainId.AVAX,
    SupportedChainId.BSC,
    SupportedChainId.METIS,
    SupportedChainId.SONIC,
    SupportedChainId.BERA,
    SupportedChainId.FRAXTAL,
    SupportedChainId.SWELL,
  ]

  const ULYSSES_TESTNET_CHAINS = [
    SupportedChainId.SEPOLIA,
    SupportedChainId.ARBITRUM_SEPOLIA,
    SupportedChainId.OPTIMISM_SEPOLIA,
    SupportedChainId.BASE_SEPOLIA,
    SupportedChainId.POLYGON_AMOY,
  ]

  const ULYSSES_ROOT_CHAINS = [SupportedChainId.ARBITRUM_ONE, SupportedChainId.SEPOLIA]

  it('has addresses for root chains', () => {
    expect(Ulysses[SupportedChainId.ARBITRUM_ONE]).toBeDefined()
    expect(Ulysses[SupportedChainId.SEPOLIA]).toBeDefined()
  })

  it('has addresses for all 12 mainnet chains', () => {
    ULYSSES_MAINNET_CHAINS.forEach((chainId) => {
      expect(Ulysses[chainId]).toBeDefined()
    })
  })

  it('has addresses for all 5 testnet chains', () => {
    ULYSSES_TESTNET_CHAINS.forEach((chainId) => {
      expect(Ulysses[chainId]).toBeDefined()
    })
  })

  it('has exactly 17 chains configured', () => {
    expect(Object.keys(Ulysses)).toHaveLength(17)
  })

  it('all addresses on all chains are valid checksummed', () => {
    Object.entries(Ulysses).forEach(([chainId, addresses]) => {
      if (!addresses) return
      Object.entries(addresses).forEach(([key, value]) => {
        // Skip empty strings (some addresses are intentionally empty)
        if (typeof value === 'string' && value !== '' && isAddressField(key, value)) {
          expectChecksummedAddress(value, `Ulysses[${chainId}].${key}`)
        }
      })
    })
  })

  it('RootPort exists only on root chains (Arbitrum and Sepolia)', () => {
    // Root chains should have RootPort
    ULYSSES_ROOT_CHAINS.forEach((chainId) => {
      expect((Ulysses[chainId] as any).RootPort).toBeDefined()
    })
    // Non-root chains should not have RootPort
    const nonRootChains = [...ULYSSES_MAINNET_CHAINS, ...ULYSSES_TESTNET_CHAINS].filter(
      (chainId) => !ULYSSES_ROOT_CHAINS.includes(chainId)
    )
    nonRootChains.forEach((chainId) => {
      expect((Ulysses[chainId] as any).RootPort).toBeUndefined()
    })
  })

  it('BranchPort exists on all chains', () => {
    Object.entries(Ulysses).forEach(([chainId, addresses]) => {
      if (!addresses) return
      expect(addresses.BranchPort).toBeDefined()
      expectChecksummedAddress(addresses.BranchPort, `Ulysses[${chainId}].BranchPort`)
    })
  })
})
