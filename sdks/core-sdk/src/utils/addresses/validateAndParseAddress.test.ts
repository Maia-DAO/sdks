import { validateAndParseAddress, checkValidAddress } from './validateAndParseAddress'

// Known checksummed addresses
const WETH_MAINNET_CHECKSUMMED = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
const WETH_MAINNET_LOWERCASE = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

describe('validateAndParseAddress', () => {
  it('returns checksummed address for valid lowercase address', () => {
    const result = validateAndParseAddress(WETH_MAINNET_LOWERCASE)
    expect(result).toBe(WETH_MAINNET_CHECKSUMMED)
  })

  it('throws for address with incorrect checksum', () => {
    // Mixed case with incorrect checksum should throw
    const badChecksum = '0xc02AAa39b223fe8d0a0e5c4f27ead9083c756cc2'
    expect(() => validateAndParseAddress(badChecksum)).toThrow('is not a valid address')
  })

  it('returns same address for already checksummed address', () => {
    const result = validateAndParseAddress(WETH_MAINNET_CHECKSUMMED)
    expect(result).toBe(WETH_MAINNET_CHECKSUMMED)
  })

  it('handles zero address', () => {
    const result = validateAndParseAddress(ZERO_ADDRESS)
    expect(result).toBe(ZERO_ADDRESS)
  })

  it('throws for invalid address', () => {
    expect(() => validateAndParseAddress('invalid')).toThrow('is not a valid address')
  })

  it('throws for address too short', () => {
    expect(() => validateAndParseAddress('0x123')).toThrow('is not a valid address')
  })

  it('throws for address too long', () => {
    expect(() => validateAndParseAddress('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2ff')).toThrow(
      'is not a valid address'
    )
  })

  it('handles address without 0x prefix by auto-prefixing', () => {
    // ethers getAddress auto-prefixes addresses without 0x
    const result = validateAndParseAddress('C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2')
    expect(result).toBe(WETH_MAINNET_CHECKSUMMED)
  })

  it('throws for empty string', () => {
    expect(() => validateAndParseAddress('')).toThrow('is not a valid address')
  })
})

describe('checkValidAddress', () => {
  it('returns address for valid hex address', () => {
    const result = checkValidAddress(WETH_MAINNET_CHECKSUMMED)
    expect(result).toBe(WETH_MAINNET_CHECKSUMMED)
  })

  it('returns address for lowercase address', () => {
    const result = checkValidAddress(WETH_MAINNET_LOWERCASE)
    expect(result).toBe(WETH_MAINNET_LOWERCASE)
  })

  it('accepts both upper and lowercase hex characters', () => {
    expect(checkValidAddress('0xABCDEF0123456789abcdef0123456789abcdef01')).toBe(
      '0xABCDEF0123456789abcdef0123456789abcdef01'
    )
  })

  it('throws for address without 0x prefix', () => {
    expect(() => checkValidAddress('C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2')).toThrow('is not a valid address')
  })

  it('throws for address too short', () => {
    expect(() => checkValidAddress('0x123')).toThrow('is not a valid address')
  })

  it('throws for address too long', () => {
    expect(() => checkValidAddress('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2ff')).toThrow('is not a valid address')
  })

  it('throws for address with non-hex characters', () => {
    expect(() => checkValidAddress('0xGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG')).toThrow('is not a valid address')
  })

  it('throws for empty string', () => {
    expect(() => checkValidAddress('')).toThrow('is not a valid address')
  })
})
