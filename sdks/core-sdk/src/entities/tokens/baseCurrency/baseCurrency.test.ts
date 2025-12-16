import { NativeToken } from '../nativeToken'
import type { OFTInfo, PriceSource, StargateInfo, UlyssesInfo, TokenExtensions } from '../../../types'

// Test addresses
const TEST_ADDRESS_ONE = '0x0000000000000000000000000000000000000001'
const TEST_ADDRESS_TWO = '0x0000000000000000000000000000000000000002'
const TEST_ADDRESS_THREE = '0x0000000000000000000000000000000000000003'

// Test helper: create a NativeToken with extensions
function createToken(extensions?: TokenExtensions): NativeToken {
  return new NativeToken(1, TEST_ADDRESS_ONE, 18, 'TEST', 'Test Token', true, extensions)
}

describe('BaseCurrency (via NativeToken)', () => {
  describe('constructor validation', () => {
    it('throws CHAIN_ID for non-safe integer chainId', () => {
      expect(() => new NativeToken(1.5, TEST_ADDRESS_ONE, 18, 'TEST', 'Test', true)).toThrow('CHAIN_ID')
      expect(() => new NativeToken(Number.MAX_SAFE_INTEGER + 1, TEST_ADDRESS_ONE, 18, 'TEST', 'Test', true)).toThrow(
        'CHAIN_ID'
      )
    })

    it('throws DECIMALS for negative decimals', () => {
      expect(() => new NativeToken(1, TEST_ADDRESS_ONE, -1, 'TEST', 'Test', true)).toThrow('DECIMALS')
    })

    it('throws DECIMALS for decimals >= 255', () => {
      expect(() => new NativeToken(1, TEST_ADDRESS_ONE, 255, 'TEST', 'Test', true)).toThrow('DECIMALS')
      expect(() => new NativeToken(1, TEST_ADDRESS_ONE, 300, 'TEST', 'Test', true)).toThrow('DECIMALS')
    })

    it('throws DECIMALS for non-integer decimals', () => {
      expect(() => new NativeToken(1, TEST_ADDRESS_ONE, 18.5, 'TEST', 'Test', true)).toThrow('DECIMALS')
    })

    it('allows valid decimals 0-254', () => {
      expect(createToken().decimals).toBe(18)
      expect(new NativeToken(1, TEST_ADDRESS_ONE, 0, 'TEST', 'Test', true).decimals).toBe(0)
      expect(new NativeToken(1, TEST_ADDRESS_ONE, 254, 'TEST', 'Test', true).decimals).toBe(254)
    })
  })

  describe('noLiquidityOnChain getter', () => {
    it('returns false when not set', () => {
      const token = createToken()
      expect(token.noLiquidityOnChain).toBe(false)
    })

    it('returns true when extension is true', () => {
      const token = createToken({ noLiquidityOnChain: true })
      expect(token.noLiquidityOnChain).toBe(true)
    })

    it('returns false when extension is false', () => {
      const token = createToken({ noLiquidityOnChain: false })
      expect(token.noLiquidityOnChain).toBe(false)
    })
  })

  describe('priceSource getter', () => {
    it('returns undefined when not set', () => {
      const token = createToken()
      expect(token.priceSource).toBeUndefined()
    })

    it('returns priceSource when set', () => {
      const priceSource: PriceSource = { chainId: 1, address: TEST_ADDRESS_ONE }
      const token = createToken({ priceSource })
      expect(token.priceSource).toEqual(priceSource)
    })
  })

  describe('OFT extension getters', () => {
    const mockOftInfo: OFTInfo[] = [
      {
        adapter: TEST_ADDRESS_ONE,
        version: 2,
        endpointId: 110,
        endpointVersion: 2,
        peers: {
          [1]: { address: TEST_ADDRESS_ONE, fee: 100 },
          [42161]: { address: TEST_ADDRESS_TWO, fee: 50 },
        },
      },
      {
        adapter: TEST_ADDRESS_TWO,
        version: 2,
        endpointId: 111,
        endpointVersion: 2,
        peers: {
          [10]: { address: TEST_ADDRESS_THREE, fee: 75, adapter: TEST_ADDRESS_THREE },
        },
      },
    ]

    it('isOFT returns false when no oftInfo', () => {
      const token = createToken()
      expect(token.isOFT).toBe(false)
    })

    it('isOFT returns true when oftInfo has entries', () => {
      const token = createToken({ oftInfo: mockOftInfo })
      expect(token.isOFT).toBe(true)
    })

    it('isOFT returns false when oftInfo is empty array', () => {
      const token = createToken({ oftInfo: [] })
      expect(token.isOFT).toBe(false)
    })

    it('oftInfo returns undefined when not set', () => {
      const token = createToken()
      expect(token.oftInfo).toBeUndefined()
    })

    it('oftInfo returns array when set', () => {
      const token = createToken({ oftInfo: mockOftInfo })
      expect(token.oftInfo).toEqual(mockOftInfo)
    })

    it('getOftInfo returns OFTInfo for matching adapter', () => {
      const token = createToken({ oftInfo: mockOftInfo })
      const info = token.getOftInfo(TEST_ADDRESS_ONE)
      expect(info).toBeDefined()
      expect(info?.adapter).toBe(TEST_ADDRESS_ONE)
    })

    it('getOftInfo returns undefined for non-matching adapter', () => {
      const token = createToken({ oftInfo: mockOftInfo })
      expect(token.getOftInfo('0x9999999999999999999999999999999999999999')).toBeUndefined()
    })

    it('getOftInfo is case-insensitive', () => {
      const token = createToken({ oftInfo: mockOftInfo })
      const info = token.getOftInfo(TEST_ADDRESS_ONE.toLowerCase())
      expect(info).toBeDefined()
    })

    it('getBestOftInfoForChain returns OFT with lowest fee', () => {
      const token = createToken({ oftInfo: mockOftInfo })
      const best = token.getBestOftInfoForChain(42161)
      expect(best).toBeDefined()
      expect(best?.peers[42161].fee).toBe(50)
    })

    it('getBestOftInfoForChain returns undefined when no peer for chain', () => {
      const token = createToken({ oftInfo: mockOftInfo })
      expect(token.getBestOftInfoForChain(999)).toBeUndefined()
    })

    it('getOftPeerInfo returns peer info', () => {
      const token = createToken({ oftInfo: mockOftInfo })
      const peerInfo = token.getOftPeerInfo(1, TEST_ADDRESS_ONE)
      expect(peerInfo).toBeDefined()
      expect(peerInfo?.address).toBe(TEST_ADDRESS_ONE)
      expect(peerInfo?.fee).toBe(100)
    })

    it('getOftPeerInfo returns undefined for non-matching adapter', () => {
      const token = createToken({ oftInfo: mockOftInfo })
      expect(token.getOftPeerInfo(1, '0x9999999999999999999999999999999999999999')).toBeUndefined()
    })

    it('getOftPeerAdapter returns adapter when present', () => {
      const token = createToken({ oftInfo: mockOftInfo })
      const peerWithAdapter = { address: TEST_ADDRESS_ONE, adapter: TEST_ADDRESS_TWO }
      expect(token.getOftPeerAdapter(peerWithAdapter)).toBe(TEST_ADDRESS_TWO)
    })

    it('getOftPeerAdapter returns address when no adapter', () => {
      const token = createToken({ oftInfo: mockOftInfo })
      const peerWithoutAdapter = { address: TEST_ADDRESS_ONE }
      expect(token.getOftPeerAdapter(peerWithoutAdapter)).toBe(TEST_ADDRESS_ONE)
    })

    it('getAllOftPeerChainIds returns unique chain IDs', () => {
      const token = createToken({ oftInfo: mockOftInfo })
      const chainIds = token.getAllOftPeerChainIds()
      expect(chainIds).toContain(1)
      expect(chainIds).toContain(42161)
      expect(chainIds).toContain(10)
      // Check for uniqueness (chain 1 appears in first OFT but should only be in result once)
      expect(chainIds.filter((id) => id === 1)).toHaveLength(1)
    })

    it('getAllOftPeerChainIds returns empty array when no oftInfo', () => {
      const token = createToken()
      expect(token.getAllOftPeerChainIds()).toEqual([])
    })

    it('getOftPeerChainIds returns chain IDs for specific adapter', () => {
      const token = createToken({ oftInfo: mockOftInfo })
      const chainIds = token.getOftPeerChainIds(TEST_ADDRESS_ONE)
      expect(chainIds).toContain(1)
      expect(chainIds).toContain(42161)
      expect(chainIds).not.toContain(10) // 10 is on different adapter
    })

    it('getOftPeerChainIds returns empty array for non-matching adapter', () => {
      const token = createToken({ oftInfo: mockOftInfo })
      expect(token.getOftPeerChainIds('0x9999999999999999999999999999999999999999')).toEqual([])
    })
  })

  describe('Stargate extension getters', () => {
    const mockStargateInfo: StargateInfo = {
      version: 2,
      pool: { address: TEST_ADDRESS_ONE, poolId: 1 },
      routes: {
        [1]: { address: TEST_ADDRESS_ONE, pool: TEST_ADDRESS_TWO },
        [42161]: { address: TEST_ADDRESS_TWO, pool: TEST_ADDRESS_THREE, minAmount: '100', maxAmount: '1000000' },
      },
    }

    it('isStargate returns false when no stargateInfo', () => {
      const token = createToken()
      expect(token.isStargate).toBe(false)
    })

    it('isStargate returns true when stargateInfo present', () => {
      const token = createToken({ stargateInfo: mockStargateInfo })
      expect(token.isStargate).toBe(true)
    })

    it('stargateInfo returns undefined when not set', () => {
      const token = createToken()
      expect(token.stargateInfo).toBeUndefined()
    })

    it('stargateInfo returns info when set', () => {
      const token = createToken({ stargateInfo: mockStargateInfo })
      expect(token.stargateInfo).toEqual(mockStargateInfo)
    })

    it('getStargateRoute returns route for valid chainId', () => {
      const token = createToken({ stargateInfo: mockStargateInfo })
      const route = token.getStargateRoute(42161)
      expect(route).toBeDefined()
      expect(route?.address).toBe(TEST_ADDRESS_TWO)
      expect(route?.minAmount).toBe('100')
    })

    it('getStargateRoute returns undefined for invalid chainId', () => {
      const token = createToken({ stargateInfo: mockStargateInfo })
      expect(token.getStargateRoute(999)).toBeUndefined()
    })

    it('getStargateRouteChainIds returns all route chain IDs', () => {
      const token = createToken({ stargateInfo: mockStargateInfo })
      const chainIds = token.getStargateRouteChainIds()
      expect(chainIds).toContain(1)
      expect(chainIds).toContain(42161)
      expect(chainIds).toHaveLength(2)
    })

    it('getStargateRouteChainIds returns empty array when no stargateInfo', () => {
      const token = createToken()
      expect(token.getStargateRouteChainIds()).toEqual([])
    })
  })

  describe('Ulysses extension getters', () => {
    const mockUlyssesInfo: UlyssesInfo = {
      globalAddress: TEST_ADDRESS_ONE,
      localAddresses: {
        [1]: TEST_ADDRESS_ONE,
        [42161]: TEST_ADDRESS_TWO,
        [10]: TEST_ADDRESS_THREE,
      },
    }

    it('isUlysses returns false when no ulyssesInfo', () => {
      const token = createToken()
      expect(token.isUlysses).toBe(false)
    })

    it('isUlysses returns true when ulyssesInfo present', () => {
      const token = createToken({ ulyssesInfo: mockUlyssesInfo })
      expect(token.isUlysses).toBe(true)
    })

    it('ulyssesInfo returns undefined when not set', () => {
      const token = createToken()
      expect(token.ulyssesInfo).toBeUndefined()
    })

    it('ulyssesInfo returns info when set', () => {
      const token = createToken({ ulyssesInfo: mockUlyssesInfo })
      expect(token.ulyssesInfo).toEqual(mockUlyssesInfo)
    })

    it('getUlyssesLocalAddress returns address for valid chainId', () => {
      const token = createToken({ ulyssesInfo: mockUlyssesInfo })
      expect(token.getUlyssesLocalAddress(42161)).toBe(TEST_ADDRESS_TWO)
    })

    it('getUlyssesLocalAddress returns undefined for invalid chainId', () => {
      const token = createToken({ ulyssesInfo: mockUlyssesInfo })
      expect(token.getUlyssesLocalAddress(999)).toBeUndefined()
    })

    it('getUlyssesChainIds returns all chain IDs', () => {
      const token = createToken({ ulyssesInfo: mockUlyssesInfo })
      const chainIds = token.getUlyssesChainIds()
      expect(chainIds).toContain(1)
      expect(chainIds).toContain(42161)
      expect(chainIds).toContain(10)
      expect(chainIds).toHaveLength(3)
    })

    it('getUlyssesChainIds returns empty array when no ulyssesInfo', () => {
      const token = createToken()
      expect(token.getUlyssesChainIds()).toEqual([])
    })
  })

  describe('combined extensions', () => {
    it('handles multiple extensions simultaneously', () => {
      const extensions: TokenExtensions = {
        noLiquidityOnChain: true,
        priceSource: { chainId: 1 },
        oftInfo: [
          {
            adapter: TEST_ADDRESS_ONE,
            version: 2,
            endpointId: 110,
            endpointVersion: 2,
            peers: { [42161]: { address: TEST_ADDRESS_TWO } },
          },
        ],
        stargateInfo: {
          version: 2,
          pool: { address: TEST_ADDRESS_ONE },
          routes: { [1]: { address: TEST_ADDRESS_TWO, pool: TEST_ADDRESS_THREE } },
        },
        ulyssesInfo: {
          globalAddress: TEST_ADDRESS_ONE,
          localAddresses: { [1]: TEST_ADDRESS_ONE },
        },
        acrossInfo: {
          [1]: { address: TEST_ADDRESS_ONE },
        },
      }

      const token = createToken(extensions)

      expect(token.noLiquidityOnChain).toBe(true)
      expect(token.priceSource).toBeDefined()
      expect(token.isOFT).toBe(true)
      expect(token.isStargate).toBe(true)
      expect(token.isUlysses).toBe(true)
      expect(token.isAcross).toBe(true)
    })
  })
})
