import { AcrossInfo, PriceSource, OFTInfo, StargateInfo, UlyssesInfo, BridgeInfo } from 'maia-core-sdk'

// =============================================================================
// Extension Types - Strongly typed extension structures for token metadata
// =============================================================================

/**
 * Base extension value types for generic extensions
 */
type ExtensionValue = string | number | boolean | null | undefined

/**
 * Generic extensions type for arbitrary nested data
 */
type GenericExtensions = {
  readonly [key: string]: ExtensionValue | GenericExtensions | ExtensionValue[] | GenericExtensions[]
}

/**
 * All possible extension value types for index signature
 */
type AllExtensionValues =
  | ExtensionValue
  | GenericExtensions
  | ExtensionValue[]
  | GenericExtensions[]
  | PriceSource
  | OFTInfo[]
  | StargateInfo
  | StargateInfo[]
  | UlyssesInfo
  | BridgeInfo
  | AcrossInfo
  | undefined

/**
 * All token extensions grouped by category
 * Includes index signature for arbitrary additional properties
 */
export interface TokenExtensions {
  readonly noLiquidityOnChain?: boolean
  readonly coingeckoId?: string
  readonly coinMarketCapId?: string
  readonly bridgeInfo?: BridgeInfo
  readonly ulyssesInfo?: UlyssesInfo
  readonly oftInfo?: OFTInfo[]
  readonly acrossInfo?: AcrossInfo
  readonly stargateInfo?: StargateInfo
  readonly priceSource?: PriceSource
  // Allow additional arbitrary extensions
  readonly [key: string]: AllExtensionValues
}

// =============================================================================
// Token List Types
// =============================================================================

/**
 * Token information entry in a token list
 */
export interface TokenInfo {
  readonly chainId: number
  readonly address: string
  readonly name: string
  readonly decimals: number
  readonly symbol: string
  readonly logoURI?: string
  readonly tags?: string[]
  readonly extensions?: TokenExtensions
}

/**
 * Token list version following semver
 */
export interface Version {
  readonly major: number
  readonly minor: number
  readonly patch: number
}

/**
 * Tag definitions for categorizing tokens
 */
export interface Tags {
  readonly [tagId: string]: {
    readonly name: string
    readonly description: string
  }
}

/**
 * Complete token list structure
 */
export interface TokenList {
  readonly name: string
  readonly timestamp: string
  readonly version: Version
  readonly tokens: readonly TokenInfo[]
  readonly keywords?: readonly string[]
  readonly tags?: Tags
  readonly logoURI?: string
}
