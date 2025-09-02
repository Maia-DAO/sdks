import invariant from 'tiny-invariant'

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
   * True if token is supported by Across
   */
  public abstract readonly isAcross: boolean
  /**
   * True if token is an OFT (Omnichain Fungible Token)
   */
  public readonly isOFT: boolean
  /**
   * The address of the token's OFT adapter, if applicable
   */
  public readonly oftAdapter?: string
  /**
   * The version of the OFT (Omnichain Fungible Token)
   */
  public readonly oftVersion?: number
  /**
   * The version of the Layer Zero endpoint used
   */
  public readonly endpointVersion?: number
  /**
   * The ID of the Layer Zero endpoint used
   */
  public readonly endpointId?: number
  /**
   * The OFT's “lowest common denominator” of decimal precision across all chains in the OFT system
   */
  public readonly oftSharedDecimals?: number
  /**
   * The OFT bridging fee per chain in bips, if applicable
   */
  public readonly oftFee?: { [chain: number]: { oftFee?: number; minDstGas?: number } }
  /**
   * The OFT's connected peers
   */
  public readonly oftPeers?: { [chain: number]: { tokenAddress?: string } }
  /**
   * The OFT's connected peers
   */
  public abstract readonly acrossInfo?: { [chain: number]: { address: string; decimals?: number } }
  /**
   * The price source for the token, if applicable
   */
  public readonly priceSource?: { address?: string; chainId: number }
  /**
   * True if there is no liquidity for that token
   */
  public readonly noLiquidityOnChain: boolean

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
   * Constructs an instance of the base class `BaseCurrency`.
   * @param chainId the chain ID on which this currency resides
   * @param decimals decimals of the currency
   * @param symbol symbol of the currency
   * @param name of the currency
   * @param isOFT If true, the token is an OFT (Omnichain Fungible Token)
   * @param oftAdapter The address of the token's OFT adapter, if applicable
   * @param oftVersion The version of the OFT (Omnichain Fungible Token)
   * @param endpointVersion The version of the Layer Zero endpoint used
   * @param endpointId The ID of the Layer Zero endpoint used
   * @param oftSharedDecimals The OFT's “lowest common denominator” of decimal precision across all chains in the OFT system.
   * @param oftFee The OFT bridging fee and minimum destination gas per chain in bips, if applicable
   * @param oftPeers The OFT's connected peers
   * @param priceSource The price source for the token, if applicable
   * @param noLiquidityOnChain True if there is no liquidity for that token
   */
  protected constructor(
    chainId: number,
    decimals: number,
    symbol?: string,
    name?: string,
    isOFT?: boolean,
    oftAdapter?: string,
    oftVersion?: number,
    endpointVersion?: number,
    endpointId?: number,
    oftSharedDecimals?: number,
    oftFee?: { [chain: number]: { oftFee?: number; minDstGas?: number } },
    oftPeers?: { [chain: number]: { tokenAddress?: string } },
    priceSource?: { address?: string; chainId: number },
    noLiquidityOnChain?: boolean
  ) {
    invariant(Number.isSafeInteger(chainId), 'CHAIN_ID')
    invariant(decimals >= 0 && decimals < 255 && Number.isInteger(decimals), 'DECIMALS')

    this.chainId = chainId
    this.decimals = decimals
    this.symbol = symbol
    this.name = name

    this.priceSource = priceSource ?? undefined
    this.noLiquidityOnChain = noLiquidityOnChain ?? false

    this.isOFT = isOFT ?? false

    this.oftAdapter = oftAdapter ?? undefined
    this.oftVersion = oftVersion ?? undefined
    this.endpointVersion = endpointVersion ?? undefined
    this.oftSharedDecimals = oftSharedDecimals ?? undefined
    this.endpointId = endpointId ?? undefined
    this.oftFee = oftFee ?? undefined
    this.oftPeers = oftPeers ?? undefined
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
