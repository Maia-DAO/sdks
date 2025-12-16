import { Ether } from './index'
import { NativeToken } from '../tokens/nativeToken'
import { WETH9 } from '../weth9'

describe('Ether', () => {
  describe('#onChain', () => {
    it('returns Ether instance for chainId 1', () => {
      const ether = Ether.onChain(1)
      expect(ether.chainId).toBe(1)
      expect(ether.decimals).toBe(18)
      expect(ether.symbol).toBe('ETH')
      expect(ether.name).toBe('Ether')
    })

    it('returns Ether instance for chainId 42161 (Arbitrum)', () => {
      const ether = Ether.onChain(42161)
      expect(ether.chainId).toBe(42161)
      expect(ether.decimals).toBe(18)
    })

    it('returns cached Ether for same chainId', () => {
      const ether1 = Ether.onChain(1)
      const ether2 = Ether.onChain(1)
      expect(ether1).toBe(ether2)
    })

    it('returns different instances for different chainIds', () => {
      const ether1 = Ether.onChain(1)
      const ether42161 = Ether.onChain(42161)
      expect(ether1).not.toBe(ether42161)
      expect(ether1.chainId).toBe(1)
      expect(ether42161.chainId).toBe(42161)
    })

    it('accepts extensions parameter', () => {
      // Using a unique chainId to avoid cache conflicts with other tests
      const ether = Ether.onChain(999999, { noLiquidityOnChain: true })
      expect(ether.noLiquidityOnChain).toBe(true)
    })
  })

  describe('#wrapped', () => {
    it('returns WETH9 for chainId 1', () => {
      const ether = Ether.onChain(1)
      const wrapped = ether.wrapped
      expect(wrapped).toBeInstanceOf(NativeToken)
      expect(wrapped).toBe(WETH9[1])
      expect(wrapped.symbol).toBe('WETH')
    })

    it('returns WETH9 for chainId 42161 (Arbitrum)', () => {
      const ether = Ether.onChain(42161)
      const wrapped = ether.wrapped
      expect(wrapped).toBe(WETH9[42161])
      expect(wrapped.address).toBe('0x82aF49447D8a07e3bd95BD0d56f35241523fBab1')
    })

    it('throws for unsupported chainId without WETH9', () => {
      // Using a chainId that doesn't have WETH9 defined
      const ether = Ether.onChain(123456)
      expect(() => ether.wrapped).toThrow('WRAPPED')
    })
  })

  describe('#equals', () => {
    it('returns true for same chainId native currency', () => {
      const ether1 = Ether.onChain(1)
      const ether1Again = Ether.onChain(1)
      expect(ether1.equals(ether1Again)).toBe(true)
    })

    it('returns false for different chainId', () => {
      const ether1 = Ether.onChain(1)
      const ether42161 = Ether.onChain(42161)
      expect(ether1.equals(ether42161)).toBe(false)
    })

    it('returns false for token (non-native)', () => {
      const ether = Ether.onChain(1)
      const weth = WETH9[1]
      expect(ether.equals(weth)).toBe(false)
    })
  })

  describe('properties', () => {
    it('has isNative = true', () => {
      const ether = Ether.onChain(1)
      expect(ether.isNative).toBe(true)
    })

    it('has isToken = false', () => {
      const ether = Ether.onChain(1)
      expect(ether.isToken).toBe(false)
    })

    it('has decimals = 18', () => {
      const ether = Ether.onChain(1)
      expect(ether.decimals).toBe(18)
    })

    it('has symbol = ETH', () => {
      const ether = Ether.onChain(1)
      expect(ether.symbol).toBe('ETH')
    })

    it('has name = Ether', () => {
      const ether = Ether.onChain(1)
      expect(ether.name).toBe('Ether')
    })
  })
})
