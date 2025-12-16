import { constructSameAddressMap } from './constructSameAddressMap'
import { ChainId } from '../../constants'

const TEST_ADDRESS = '0x0000000000000000000000000000000000000001'

describe('constructSameAddressMap', () => {
  it('creates map for default networks (ARBITRUM_ONE, SEPOLIA)', () => {
    const map = constructSameAddressMap(TEST_ADDRESS)

    expect(map[ChainId.ARBITRUM_ONE]).toBe(TEST_ADDRESS)
    expect(map[ChainId.SEPOLIA]).toBe(TEST_ADDRESS)
  })

  it('includes additional networks when provided', () => {
    const map = constructSameAddressMap(TEST_ADDRESS, [ChainId.MAINNET, ChainId.OPTIMISM])

    // Default networks
    expect(map[ChainId.ARBITRUM_ONE]).toBe(TEST_ADDRESS)
    expect(map[ChainId.SEPOLIA]).toBe(TEST_ADDRESS)

    // Additional networks
    expect(map[ChainId.MAINNET]).toBe(TEST_ADDRESS)
    expect(map[ChainId.OPTIMISM]).toBe(TEST_ADDRESS)
  })

  it('uses same address for all chains', () => {
    const map = constructSameAddressMap(TEST_ADDRESS, [ChainId.MAINNET])

    Object.values(map).forEach((address) => {
      expect(address).toBe(TEST_ADDRESS)
    })
  })

  it('returns AddressMap type with expected keys', () => {
    const map = constructSameAddressMap(TEST_ADDRESS)

    expect(Object.keys(map)).toHaveLength(2)
    expect(map).toHaveProperty(String(ChainId.ARBITRUM_ONE))
    expect(map).toHaveProperty(String(ChainId.SEPOLIA))
  })

  it('handles empty additional networks array', () => {
    const map = constructSameAddressMap(TEST_ADDRESS, [])

    expect(Object.keys(map)).toHaveLength(2)
    expect(map[ChainId.ARBITRUM_ONE]).toBe(TEST_ADDRESS)
    expect(map[ChainId.SEPOLIA]).toBe(TEST_ADDRESS)
  })
})
