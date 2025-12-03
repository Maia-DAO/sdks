import invariant from 'tiny-invariant'

import type { BaseTokenExtensions, OFTInfo, PeerInfo, PriceSource, StargateInfo, UlyssesInfo } from '../../../types'
import type { Currency } from '../currency'
import { NativeToken } from '../nativeToken'

/**
 * A currency is any fungible financial instrument, including Ether, all ERC20 tokens, and other chain-native currencies
 */
export abstract class BaseCurrency {
  /**
   * Returns whether the currency is native to the chain and must be wrapped (e.g. Ether)
   */
  public abstract readonly isNative: boolean
  /**
   * Returns whether the currency is a token that is usable in Uniswap without wrapping
   */
  public abstract readonly isToken: boolean
  /**
   * Returns whether the currency is a global token that has wrappers on different chains
   */
  public abstract readonly isGlobal: boolean

  /**
   * The chain ID on which this currency resides
   */
  public readonly chainId: number
  /**
   * The decimals used in representing currency amounts
   */
  public readonly decimals: number
  /**
   * The symbol of the currency, i.e. a short textual non-unique identifier
   */
  public readonly symbol?: string
  /**
   * The name of the currency, i.e. a descriptive textual non-unique identifier
   */
  public readonly name?: string

  /**
   * Token extensions containing bridging info, pricing, and other metadata
   */
  public readonly extensions?: BaseTokenExtensions

  /**
   * Constructs an instance of the base class `BaseCurrency`.
   * @param chainId the chain ID on which this currency resides
   * @param decimals decimals of the currency
   * @param symbol symbol of the currency
   * @param name of the currency
   * @param extensions token extensions containing bridging info, pricing, and other metadata
   */
  protected constructor(
    chainId: number,
    decimals: number,
    symbol?: string,
    name?: string,
    extensions?: BaseTokenExtensions
  ) {
    invariant(Number.isSafeInteger(chainId), 'CHAIN_ID')
    invariant(decimals >= 0 && decimals < 255 && Number.isInteger(decimals), 'DECIMALS')

    this.chainId = chainId
    this.decimals = decimals
    this.symbol = symbol
    this.name = name
    this.extensions = extensions
  }

  // =============================================================================
  // Extension Getters
  // =============================================================================

  /**
   * True if there is no liquidity for that token on this chain
   */
  public get noLiquidityOnChain(): boolean {
    return this.extensions?.noLiquidityOnChain ?? false
  }

  /**
   * The price source for the token, if applicable
   */
  public get priceSource(): PriceSource | undefined {
    return this.extensions?.priceSource
  }

  /**
   * True if token has OFT (Omnichain Fungible Token) configurations
   */
  public get isOFT(): boolean {
    return !!this.extensions?.oftInfo && this.extensions.oftInfo.length > 0
  }

  /**
   * Get all OFT configurations for this token
   */
  public get oftInfo(): readonly OFTInfo[] | undefined {
    return this.extensions?.oftInfo
  }

  /**
   * Get OFT Info for a specific adapter address
   * @param adapterAddress the adapter address used for LayerZero messaging
   */
  public getOftInfo(adapterAddress: string): OFTInfo | undefined {
    return this.extensions?.oftInfo?.find((oft) => oft.adapter?.toLowerCase() === adapterAddress?.toLowerCase())
  }

  /**
   * Get OFT peer info for a specific chain
   * @param chainId the target chain ID
   * @param adapterAddress the adapter address used for LayerZero messaging
   */
  public getOftPeerInfo(chainId: number, adapterAddress: string): PeerInfo | undefined {
    return this.extensions?.oftInfo?.find((oft) => oft.adapter?.toLowerCase() === adapterAddress?.toLowerCase())?.peers[
      chainId
    ]
  }

  /**
   * Get all chain IDs that have OFT peers for this token
   */
  public getAllOftPeerChainIds(): number[] {
    return Array.from(new Set(this.extensions?.oftInfo?.flatMap((oft) => Object.keys(oft.peers).map(Number)) ?? []))
  }

  /**
   * Get all chain IDs that have OFT peers for this token
   * @param adapterAddress the adapter address used for LayerZero messaging
   */
  public getOftPeerChainIds(oftIndex: number = 0): number[] {
    const peers = this.extensions?.oftInfo?.[oftIndex]?.peers
    return peers ? Object.keys(peers).map(Number) : []
  }

  /**
   * True if token has Stargate bridge configurations
   */
  public get isStargate(): boolean {
    return !!this.extensions?.stargateInfo && this.extensions.stargateInfo.length > 0
  }

  /**
   * Get all Stargate configurations for this token
   */
  public get stargateInfo(): StargateInfo | undefined {
    return this.extensions?.stargateInfo
  }

  /**
   * Get Stargate route info for a specific destination chain
   * @param chainId the destination chain ID
   */
  public getStargateRoute(chainId: number): StargateInfo['routes'][number] | undefined {
    return this.extensions?.stargateInfo?.routes[chainId]
  }

  /**
   * Get all chain IDs that have Stargate routes for this token
   */
  public getStargateRouteChainIds(): number[] {
    const routes = this.extensions?.stargateInfo?.routes
    return routes ? Object.keys(routes).map(Number) : []
  }

  /**
   * True if token has Ulysses bridging info
   */
  public get isUlysses(): boolean {
    return !!this.extensions?.ulyssesInfo
  }

  /**
   * Get Ulysses bridging info
   */
  public get ulyssesInfo(): UlyssesInfo | undefined {
    return this.extensions?.ulyssesInfo
  }

  /**
   * Get Ulysses local address for a specific chain
   * @param chainId the target chain ID
   */
  public getUlyssesLocalAddress(chainId: number): string | undefined {
    return this.extensions?.ulyssesInfo?.localAddresses[chainId]
  }

  /**
   * Get all chain IDs that have Ulysses local addresses
   */
  public getUlyssesChainIds(): number[] {
    const localAddresses = this.extensions?.ulyssesInfo?.localAddresses
    return localAddresses ? Object.keys(localAddresses).map(Number) : []
  }

  /**
   * Returns whether this currency is functionally equivalent to the other currency
   * @param other the other currency
   */
  public abstract equals(other: Currency): boolean

  /**
   * Return the wrapped version of this currency that can be used with the Uniswap contracts. Currencies must
   * implement this to be used in Uniswap
   */
  public abstract get wrapped(): NativeToken
}
