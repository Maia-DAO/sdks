import {
  SupportedChainId,
  SupportedLayerzeroChainId,
  ROOT_CHAIN_ID,
  LZ_CHAIN_ID_FROM_EVM_CHAIN_ID,
  EVM_CHAIN_ID_FROM_LZ_CHAIN_ID,
} from './chainIds'

describe('SupportedChainId', () => {
  it('ARBITRUM_ONE equals 42161', () => {
    expect(SupportedChainId.ARBITRUM_ONE).toBe(42161)
  })

  it('MAINNET equals 1', () => {
    expect(SupportedChainId.MAINNET).toBe(1)
  })

  it('SEPOLIA equals 11155111', () => {
    expect(SupportedChainId.SEPOLIA).toBe(11155111)
  })

  it('OPTIMISM equals 10', () => {
    expect(SupportedChainId.OPTIMISM).toBe(10)
  })

  it('BASE equals 8453', () => {
    expect(SupportedChainId.BASE).toBe(8453)
  })

  it('contains all expected mainnet chains', () => {
    expect(SupportedChainId.ARBITRUM_ONE).toBeDefined()
    expect(SupportedChainId.MAINNET).toBeDefined()
    expect(SupportedChainId.OPTIMISM).toBeDefined()
    expect(SupportedChainId.BASE).toBeDefined()
    expect(SupportedChainId.BSC).toBeDefined()
    expect(SupportedChainId.POLYGON).toBeDefined()
    expect(SupportedChainId.AVAX).toBeDefined()
    expect(SupportedChainId.METIS).toBeDefined()
  })

  it('contains all expected testnet chains', () => {
    expect(SupportedChainId.SEPOLIA).toBeDefined()
    expect(SupportedChainId.ARBITRUM_SEPOLIA).toBeDefined()
    expect(SupportedChainId.OPTIMISM_SEPOLIA).toBeDefined()
    expect(SupportedChainId.BASE_SEPOLIA).toBeDefined()
  })
})

describe('SupportedLayerzeroChainId', () => {
  it('ARBITRUM_ONE equals 110', () => {
    expect(SupportedLayerzeroChainId.ARBITRUM_ONE).toBe(110)
  })

  it('MAINNET equals 101', () => {
    expect(SupportedLayerzeroChainId.MAINNET).toBe(101)
  })

  it('SEPOLIA equals 10161', () => {
    expect(SupportedLayerzeroChainId.SEPOLIA).toBe(10161)
  })

  it('OPTIMISM equals 111', () => {
    expect(SupportedLayerzeroChainId.OPTIMISM).toBe(111)
  })

  it('BASE equals 184', () => {
    expect(SupportedLayerzeroChainId.BASE).toBe(184)
  })
})

describe('ROOT_CHAIN_ID', () => {
  it('equals ARBITRUM_ONE (42161)', () => {
    expect(ROOT_CHAIN_ID).toBe(SupportedChainId.ARBITRUM_ONE)
    expect(ROOT_CHAIN_ID).toBe(42161)
  })
})

describe('LZ_CHAIN_ID_FROM_EVM_CHAIN_ID', () => {
  it('maps Arbitrum EVM to LZ chainId', () => {
    expect(LZ_CHAIN_ID_FROM_EVM_CHAIN_ID[SupportedChainId.ARBITRUM_ONE]).toBe(SupportedLayerzeroChainId.ARBITRUM_ONE)
  })

  it('maps Mainnet EVM to LZ chainId', () => {
    expect(LZ_CHAIN_ID_FROM_EVM_CHAIN_ID[SupportedChainId.MAINNET]).toBe(SupportedLayerzeroChainId.MAINNET)
  })

  it('maps Sepolia EVM to LZ chainId', () => {
    expect(LZ_CHAIN_ID_FROM_EVM_CHAIN_ID[SupportedChainId.SEPOLIA]).toBe(SupportedLayerzeroChainId.SEPOLIA)
  })

  it('maps Optimism EVM to LZ chainId', () => {
    expect(LZ_CHAIN_ID_FROM_EVM_CHAIN_ID[SupportedChainId.OPTIMISM]).toBe(SupportedLayerzeroChainId.OPTIMISM)
  })

  it('maps all supported EVM chains to LZ chain IDs', () => {
    // Verify key chains have LZ mappings
    expect(LZ_CHAIN_ID_FROM_EVM_CHAIN_ID[SupportedChainId.ARBITRUM_ONE]).toBeDefined()
    expect(LZ_CHAIN_ID_FROM_EVM_CHAIN_ID[SupportedChainId.MAINNET]).toBeDefined()
    expect(LZ_CHAIN_ID_FROM_EVM_CHAIN_ID[SupportedChainId.SEPOLIA]).toBeDefined()
    expect(LZ_CHAIN_ID_FROM_EVM_CHAIN_ID[SupportedChainId.OPTIMISM]).toBeDefined()
  })
})

describe('EVM_CHAIN_ID_FROM_LZ_CHAIN_ID', () => {
  it('maps Arbitrum LZ to EVM chainId', () => {
    expect(EVM_CHAIN_ID_FROM_LZ_CHAIN_ID[SupportedLayerzeroChainId.ARBITRUM_ONE]).toBe(SupportedChainId.ARBITRUM_ONE)
  })

  it('maps Mainnet LZ to EVM chainId', () => {
    expect(EVM_CHAIN_ID_FROM_LZ_CHAIN_ID[SupportedLayerzeroChainId.MAINNET]).toBe(SupportedChainId.MAINNET)
  })

  it('is inverse of LZ_CHAIN_ID_FROM_EVM_CHAIN_ID', () => {
    Object.entries(EVM_CHAIN_ID_FROM_LZ_CHAIN_ID).forEach(([lzChainId, evmChainId]) => {
      expect(LZ_CHAIN_ID_FROM_EVM_CHAIN_ID[evmChainId]).toBe(Number(lzChainId))
    })
  })

  it('has entries for all key chains', () => {
    expect(Object.keys(EVM_CHAIN_ID_FROM_LZ_CHAIN_ID).length).toBeGreaterThan(0)
    expect(EVM_CHAIN_ID_FROM_LZ_CHAIN_ID[SupportedLayerzeroChainId.ARBITRUM_ONE]).toBeDefined()
    expect(EVM_CHAIN_ID_FROM_LZ_CHAIN_ID[SupportedLayerzeroChainId.MAINNET]).toBeDefined()
    expect(EVM_CHAIN_ID_FROM_LZ_CHAIN_ID[SupportedLayerzeroChainId.SEPOLIA]).toBeDefined()
  })
})
