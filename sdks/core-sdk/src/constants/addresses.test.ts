import {
  LAYER_ZERO_ENDPOINT_ADDRESS,
  SEND_ULTRA_LIGHT_NODE_V2_ADDRESS,
  ULTRA_LIGHT_NODE_V2_ADDRESS,
  ZERO_ADDRESS,
} from './addresses'
import { SupportedChainId } from './chainIds'
import { isValidChecksummedAddress } from './test-utils'

describe('ZERO_ADDRESS', () => {
  it('equals 0x0000000000000000000000000000000000000000', () => {
    expect(ZERO_ADDRESS).toBe('0x0000000000000000000000000000000000000000')
  })

  it('is a valid address format', () => {
    expect(isValidChecksummedAddress(ZERO_ADDRESS)).toBe(true)
  })
})

describe('LAYER_ZERO_ENDPOINT_ADDRESS', () => {
  it('has valid checksummed address for Arbitrum', () => {
    expect(isValidChecksummedAddress(LAYER_ZERO_ENDPOINT_ADDRESS[SupportedChainId.ARBITRUM_ONE])).toBe(true)
  })

  it('has valid checksummed address for Mainnet', () => {
    expect(isValidChecksummedAddress(LAYER_ZERO_ENDPOINT_ADDRESS[SupportedChainId.MAINNET])).toBe(true)
  })

  it('has valid checksummed address for Sepolia', () => {
    expect(isValidChecksummedAddress(LAYER_ZERO_ENDPOINT_ADDRESS[SupportedChainId.SEPOLIA])).toBe(true)
  })

  it('has valid checksummed address for Optimism', () => {
    expect(isValidChecksummedAddress(LAYER_ZERO_ENDPOINT_ADDRESS[SupportedChainId.OPTIMISM])).toBe(true)
  })

  it('has valid checksummed address for Base', () => {
    expect(isValidChecksummedAddress(LAYER_ZERO_ENDPOINT_ADDRESS[SupportedChainId.BASE])).toBe(true)
  })

  it('all addresses are valid checksummed addresses', () => {
    Object.values(LAYER_ZERO_ENDPOINT_ADDRESS).forEach((address) => {
      expect(isValidChecksummedAddress(address)).toBe(true)
    })
  })

  it('has specific known address for Arbitrum', () => {
    expect(LAYER_ZERO_ENDPOINT_ADDRESS[SupportedChainId.ARBITRUM_ONE]).toBe(
      '0x3c2269811836af69497E5F486A85D7316753cf62'
    )
  })
})

describe('ULTRA_LIGHT_NODE_V2_ADDRESS', () => {
  it('has valid checksummed address for Arbitrum', () => {
    expect(isValidChecksummedAddress(ULTRA_LIGHT_NODE_V2_ADDRESS[SupportedChainId.ARBITRUM_ONE])).toBe(true)
  })

  it('has valid checksummed address for Sepolia', () => {
    expect(isValidChecksummedAddress(ULTRA_LIGHT_NODE_V2_ADDRESS[SupportedChainId.SEPOLIA])).toBe(true)
  })

  it('has valid checksummed address for Mainnet', () => {
    expect(isValidChecksummedAddress(ULTRA_LIGHT_NODE_V2_ADDRESS[SupportedChainId.MAINNET])).toBe(true)
  })

  it('all addresses are valid checksummed addresses', () => {
    Object.values(ULTRA_LIGHT_NODE_V2_ADDRESS).forEach((address) => {
      expect(isValidChecksummedAddress(address)).toBe(true)
    })
  })

  it('has specific known address for Arbitrum', () => {
    expect(ULTRA_LIGHT_NODE_V2_ADDRESS[SupportedChainId.ARBITRUM_ONE]).toBe(
      '0x4D73AdB72bC3DD368966edD0f0b2148401A178E2'
    )
  })
})

describe('SEND_ULTRA_LIGHT_NODE_V2_ADDRESS', () => {
  it('has valid checksummed address for Arbitrum', () => {
    expect(isValidChecksummedAddress(SEND_ULTRA_LIGHT_NODE_V2_ADDRESS[SupportedChainId.ARBITRUM_ONE])).toBe(true)
  })

  it('has valid checksummed address for Sepolia', () => {
    expect(isValidChecksummedAddress(SEND_ULTRA_LIGHT_NODE_V2_ADDRESS[SupportedChainId.SEPOLIA])).toBe(true)
  })

  it('has valid checksummed address for Mainnet', () => {
    expect(isValidChecksummedAddress(SEND_ULTRA_LIGHT_NODE_V2_ADDRESS[SupportedChainId.MAINNET])).toBe(true)
  })

  it('all addresses are valid checksummed addresses', () => {
    Object.values(SEND_ULTRA_LIGHT_NODE_V2_ADDRESS).forEach((address) => {
      expect(isValidChecksummedAddress(address)).toBe(true)
    })
  })

  it('has specific known address for Arbitrum', () => {
    expect(SEND_ULTRA_LIGHT_NODE_V2_ADDRESS[SupportedChainId.ARBITRUM_ONE]).toBe(
      '0x975bcD720be66659e3EB3C0e4F1866a3020E493A'
    )
  })

  it('addresses differ between ULTRA_LIGHT_NODE_V2 and SEND_ULTRA_LIGHT_NODE_V2', () => {
    // These should be different contracts for most chains
    expect(ULTRA_LIGHT_NODE_V2_ADDRESS[SupportedChainId.ARBITRUM_ONE]).not.toBe(
      SEND_ULTRA_LIGHT_NODE_V2_ADDRESS[SupportedChainId.ARBITRUM_ONE]
    )
  })
})
