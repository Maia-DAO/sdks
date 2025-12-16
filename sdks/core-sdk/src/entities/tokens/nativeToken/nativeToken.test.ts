import { NativeToken } from './index'
import type { AcrossInfo, TokenExtensions } from '../../../types'
import { Ether } from '../../ether'

// Test addresses (checksummed)
const TEST_ADDRESS_ONE = '0x0000000000000000000000000000000000000001'
const TEST_ADDRESS_TWO = '0x0000000000000000000000000000000000000002'
const WETH_MAINNET = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'

describe('NativeToken', () => {
  describe('constructor', () => {
    it('creates token with valid checksummed address', () => {
      const token = new NativeToken(1, WETH_MAINNET, 18, 'WETH', 'Wrapped Ether')
      expect(token.address).toBe(WETH_MAINNET)
      expect(token.chainId).toBe(1)
      expect(token.decimals).toBe(18)
      expect(token.symbol).toBe('WETH')
      expect(token.name).toBe('Wrapped Ether')
    })

    it('creates token with bypassChecksum=true for lowercase address', () => {
      const lowercaseAddress = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
      const token = new NativeToken(1, lowercaseAddress, 18, 'WETH', 'Wrapped Ether', true)
      expect(token.address).toBe(lowercaseAddress)
    })

    it('throws for invalid address', () => {
      expect(() => new NativeToken(1, 'invalid', 18, 'TEST', 'Test')).toThrow('is not a valid address')
    })

    it('throws for invalid checksum when bypassChecksum=false', () => {
      // Address with incorrect checksum
      const badChecksum = '0xc02AAa39b223fe8d0a0e5c4f27ead9083c756cc2'
      expect(() => new NativeToken(1, badChecksum, 18, 'WETH', 'Wrapped Ether', false)).toThrow('is not a valid address')
    })

    it('validates chainId is safe integer', () => {
      expect(() => new NativeToken(1.5, TEST_ADDRESS_ONE, 18, 'TEST', 'Test', true)).toThrow('CHAIN_ID')
      expect(() => new NativeToken(Infinity, TEST_ADDRESS_ONE, 18, 'TEST', 'Test', true)).toThrow('CHAIN_ID')
    })

    it('validates decimals in range 0-254', () => {
      expect(() => new NativeToken(1, TEST_ADDRESS_ONE, -1, 'TEST', 'Test', true)).toThrow('DECIMALS')
      expect(() => new NativeToken(1, TEST_ADDRESS_ONE, 255, 'TEST', 'Test', true)).toThrow('DECIMALS')
      expect(() => new NativeToken(1, TEST_ADDRESS_ONE, 18.5, 'TEST', 'Test', true)).toThrow('DECIMALS')

      // Valid decimals should work
      const token0 = new NativeToken(1, TEST_ADDRESS_ONE, 0, 'TEST', 'Test', true)
      expect(token0.decimals).toBe(0)
      const token254 = new NativeToken(1, TEST_ADDRESS_ONE, 254, 'TEST', 'Test', true)
      expect(token254.decimals).toBe(254)
    })

    it('stores symbol and name correctly', () => {
      const token = new NativeToken(1, TEST_ADDRESS_ONE, 18, 'SYM', 'Token Name', true)
      expect(token.symbol).toBe('SYM')
      expect(token.name).toBe('Token Name')
    })

    it('creates token without symbol and name', () => {
      const token = new NativeToken(1, TEST_ADDRESS_ONE, 18, undefined, undefined, true)
      expect(token.symbol).toBeUndefined()
      expect(token.name).toBeUndefined()
    })
  })

  describe('#equals', () => {
    it('returns true for same chainId and address (case insensitive)', () => {
      const token1 = new NativeToken(1, WETH_MAINNET, 18, 'WETH', 'Wrapped Ether')
      const token2 = new NativeToken(1, WETH_MAINNET.toLowerCase(), 18, 'WETH', 'Wrapped Ether', true)
      expect(token1.equals(token2)).toBe(true)
    })

    it('returns false for different chainId', () => {
      const token1 = new NativeToken(1, TEST_ADDRESS_ONE, 18, 'TEST', 'Test', true)
      const token42161 = new NativeToken(42161, TEST_ADDRESS_ONE, 18, 'TEST', 'Test', true)
      expect(token1.equals(token42161)).toBe(false)
    })

    it('returns false for different address', () => {
      const token1 = new NativeToken(1, TEST_ADDRESS_ONE, 18, 'TEST1', 'Test 1', true)
      const token2 = new NativeToken(1, TEST_ADDRESS_TWO, 18, 'TEST2', 'Test 2', true)
      expect(token1.equals(token2)).toBe(false)
    })

    it('returns false for native currency', () => {
      const token = new NativeToken(1, TEST_ADDRESS_ONE, 18, 'TEST', 'Test', true)
      const ether = Ether.onChain(1)
      expect(token.equals(ether)).toBe(false)
    })
  })

  describe('#sortsBefore', () => {
    it('returns true when address sorts before other', () => {
      const tokenLower = new NativeToken(1, TEST_ADDRESS_ONE, 18, 'TEST1', 'Test 1', true)
      const tokenHigher = new NativeToken(1, TEST_ADDRESS_TWO, 18, 'TEST2', 'Test 2', true)
      expect(tokenLower.sortsBefore(tokenHigher)).toBe(true)
    })

    it('returns false when address sorts after other', () => {
      const tokenLower = new NativeToken(1, TEST_ADDRESS_ONE, 18, 'TEST1', 'Test 1', true)
      const tokenHigher = new NativeToken(1, TEST_ADDRESS_TWO, 18, 'TEST2', 'Test 2', true)
      expect(tokenHigher.sortsBefore(tokenLower)).toBe(false)
    })

    it('throws CHAIN_IDS for different chains', () => {
      const token1 = new NativeToken(1, TEST_ADDRESS_ONE, 18, 'TEST', 'Test', true)
      const token42161 = new NativeToken(42161, TEST_ADDRESS_TWO, 18, 'TEST', 'Test', true)
      expect(() => token1.sortsBefore(token42161)).toThrow('CHAIN_IDS')
    })

    it('throws ADDRESSES for same address', () => {
      const token1 = new NativeToken(1, TEST_ADDRESS_ONE, 18, 'TEST1', 'Test 1', true)
      const token2 = new NativeToken(1, TEST_ADDRESS_ONE, 18, 'TEST2', 'Test 2', true)
      expect(() => token1.sortsBefore(token2)).toThrow('ADDRESSES')
    })
  })

  describe('#wrapped', () => {
    it('returns self', () => {
      const token = new NativeToken(1, WETH_MAINNET, 18, 'WETH', 'Wrapped Ether')
      expect(token.wrapped).toBe(token)
    })
  })

  describe('Across extension getters', () => {
    const mockAcrossInfo: AcrossInfo = {
      [1]: { address: TEST_ADDRESS_ONE, decimals: 18 },
      [42161]: { address: TEST_ADDRESS_TWO },
    }

    const extensionsWithAcross: TokenExtensions = {
      acrossInfo: mockAcrossInfo,
    }

    it('isAcross returns false when no acrossInfo', () => {
      const token = new NativeToken(1, TEST_ADDRESS_ONE, 18, 'TEST', 'Test', true)
      expect(token.isAcross).toBe(false)
    })

    it('isAcross returns true when acrossInfo present', () => {
      const token = new NativeToken(1, TEST_ADDRESS_ONE, 18, 'TEST', 'Test', true, extensionsWithAcross)
      expect(token.isAcross).toBe(true)
    })

    it('isAcross returns false when acrossInfo is empty object', () => {
      const emptyExtensions: TokenExtensions = { acrossInfo: {} }
      const token = new NativeToken(1, TEST_ADDRESS_ONE, 18, 'TEST', 'Test', true, emptyExtensions)
      expect(token.isAcross).toBe(false)
    })

    it('acrossInfo returns undefined when not present', () => {
      const token = new NativeToken(1, TEST_ADDRESS_ONE, 18, 'TEST', 'Test', true)
      expect(token.acrossInfo).toBeUndefined()
    })

    it('acrossInfo returns info when present', () => {
      const token = new NativeToken(1, TEST_ADDRESS_ONE, 18, 'TEST', 'Test', true, extensionsWithAcross)
      expect(token.acrossInfo).toEqual(mockAcrossInfo)
    })

    it('getAcrossChainInfo returns info for valid chainId', () => {
      const token = new NativeToken(1, TEST_ADDRESS_ONE, 18, 'TEST', 'Test', true, extensionsWithAcross)
      const info = token.getAcrossChainInfo(1)
      expect(info).toEqual({ address: TEST_ADDRESS_ONE, decimals: 18 })
    })

    it('getAcrossChainInfo returns undefined for invalid chainId', () => {
      const token = new NativeToken(1, TEST_ADDRESS_ONE, 18, 'TEST', 'Test', true, extensionsWithAcross)
      expect(token.getAcrossChainInfo(999)).toBeUndefined()
    })

    it('getAcrossChainIds returns all chain IDs', () => {
      const token = new NativeToken(1, TEST_ADDRESS_ONE, 18, 'TEST', 'Test', true, extensionsWithAcross)
      const chainIds = token.getAcrossChainIds()
      expect(chainIds).toContain(1)
      expect(chainIds).toContain(42161)
      expect(chainIds).toHaveLength(2)
    })

    it('getAcrossChainIds returns empty array when no acrossInfo', () => {
      const token = new NativeToken(1, TEST_ADDRESS_ONE, 18, 'TEST', 'Test', true)
      expect(token.getAcrossChainIds()).toEqual([])
    })
  })

  describe('properties', () => {
    it('has isNative = false', () => {
      const token = new NativeToken(1, TEST_ADDRESS_ONE, 18, 'TEST', 'Test', true)
      expect(token.isNative).toBe(false)
    })

    it('has isToken = true', () => {
      const token = new NativeToken(1, TEST_ADDRESS_ONE, 18, 'TEST', 'Test', true)
      expect(token.isToken).toBe(true)
    })

    it('has isGlobal = false', () => {
      const token = new NativeToken(1, TEST_ADDRESS_ONE, 18, 'TEST', 'Test', true)
      expect(token.isGlobal).toBe(false)
    })
  })
})
