// =============================================================================
// Token Extension Types - Grouped extension structures for token metadata
// =============================================================================

/**
 * Ulysses bridging info - global token with local addresses on each chain
 */
export interface UlyssesInfo {
  readonly globalAddress: string
  readonly localAddresses: { readonly [chainId: number]: string }
}

/**
 * Bridge info - token addresses on different chains for bridging and aggregating balances
 */
export interface BridgeInfo {
  readonly [chainId: number]: { readonly address: string }
}

/**
 * Peer information for OFT cross-chain connections
 */
export interface PeerInfo {
  readonly address: string
  readonly adapter?: string
  readonly minGas?: number
  readonly fee?: number
  readonly noLiquidityOnChain?: boolean
}

/**
 * OFT (Omnichain Fungible Token) configuration for LayerZero bridging
 */
export interface OFTInfo {
  readonly peers: {
    readonly [chainId: number]: PeerInfo
  }
  readonly adapter?: string
  readonly version: number
  readonly endpointId: number
  readonly endpointVersion: number
  readonly sharedDecimals?: number
}

/**
 * Across bridge info - token addresses and decimals on different chains
 */
export interface AcrossInfo {
  readonly [chainId: number]: {
    readonly address: string
    readonly decimals?: number
  }
}

/**
 * Stargate pool information for bridging
 */
export interface StargatePoolInfo {
  readonly address: string
  readonly poolId?: number
  readonly endpointId?: number
  readonly router?: string
  readonly sharedDecimals?: number
}

/**
 * Stargate route information for destination chains
 */
export interface StargateRouteInfo {
  readonly address: string
  readonly pool: string
  readonly poolId?: number
  readonly minAmount?: string
  readonly maxAmount?: string
}

/**
 * Stargate bridging configuration
 */
export interface StargateInfo {
  readonly version?: 1 | 2
  readonly pool?: StargatePoolInfo
  readonly routes: {
    readonly [chainId: number]: StargateRouteInfo
  }
}

/**
 * Price source configuration for token pricing
 */
export interface PriceSource {
  readonly address?: string
  readonly chainId: number
}

/**
 * Base token extensions - common extensions for all tokens
 * Used by BaseCurrency and NativeCurrency (Ether)
 */
export interface BaseTokenExtensions {
  readonly noLiquidityOnChain?: boolean
  readonly priceSource?: PriceSource
  readonly oftInfo?: OFTInfo[]
  readonly stargateInfo?: StargateInfo
  readonly ulyssesInfo?: UlyssesInfo
}

/**
 * Full token extensions - includes Across bridge info for ERC20 tokens
 * Used by NativeToken
 * Note: bridgeInfo, coingeckoId, coinMarketCapId are only needed at token list level
 */
export interface TokenExtensions extends BaseTokenExtensions {
  readonly acrossInfo?: AcrossInfo
}
