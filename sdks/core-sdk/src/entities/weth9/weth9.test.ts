import { WETH9 } from './index'
import { NativeToken } from '../tokens/nativeToken'

describe('WETH9', () => {
  describe('mainnet chains', () => {
    it('has correct address for chainId 1 (Mainnet)', () => {
      const weth = WETH9[1]
      expect(weth).toBeDefined()
      expect(weth.address).toBe('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2')
      expect(weth.chainId).toBe(1)
    })

    it('has correct address for chainId 42161 (Arbitrum)', () => {
      const weth = WETH9[42161]
      expect(weth).toBeDefined()
      expect(weth.address).toBe('0x82aF49447D8a07e3bd95BD0d56f35241523fBab1')
      expect(weth.chainId).toBe(42161)
    })

    it('has correct address for chainId 10 (Optimism)', () => {
      const weth = WETH9[10]
      expect(weth).toBeDefined()
      expect(weth.address).toBe('0x4200000000000000000000000000000000000006')
      expect(weth.chainId).toBe(10)
    })
  })

  describe('testnet chains', () => {
    it('has correct address for chainId 5 (Goerli)', () => {
      const weth = WETH9[5]
      expect(weth).toBeDefined()
      expect(weth.address).toBe('0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6')
      expect(weth.chainId).toBe(5)
    })

    it('has correct address for chainId 421611 (Arbitrum Rinkeby)', () => {
      const weth = WETH9[421611]
      expect(weth).toBeDefined()
      expect(weth.address).toBe('0xB47e6A5f8b33b3F17603C83a0535A9dcD7E32681')
      expect(weth.chainId).toBe(421611)
    })
  })

  describe('properties', () => {
    it('all WETH9 tokens have 18 decimals', () => {
      Object.values(WETH9).forEach((weth) => {
        expect(weth.decimals).toBe(18)
      })
    })

    it('all WETH9 tokens have symbol WETH', () => {
      Object.values(WETH9).forEach((weth) => {
        expect(weth.symbol).toBe('WETH')
      })
    })

    it('all WETH9 tokens have name Wrapped Ether', () => {
      Object.values(WETH9).forEach((weth) => {
        expect(weth.name).toBe('Wrapped Ether')
      })
    })

    it('all WETH9 tokens are NativeToken instances', () => {
      Object.values(WETH9).forEach((weth) => {
        expect(weth).toBeInstanceOf(NativeToken)
      })
    })
  })

  describe('undefined chains', () => {
    it('returns undefined for unsupported chainId', () => {
      expect(WETH9[999999]).toBeUndefined()
    })
  })
})
