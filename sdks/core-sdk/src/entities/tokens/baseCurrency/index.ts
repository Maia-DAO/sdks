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
  public abstract readonly isOFT: boolean
  /**
   * The address of the token's OFT adapter, if applicable
   */
  public abstract readonly oftAdapter?: string
  /**
   * The version of the OFT (Omnichain Fungible Token)
   */
  public abstract readonly oftVersion?: number
  /**
   * The version of the Layer Zero endpoint used
   */
  public abstract readonly endpointVersion?: number
  /**
   * The ID of the Layer Zero endpoint used
   */
  public abstract readonly endpointId?: number
  /**
   * The OFT's “lowest common denominator” of decimal precision across all chains in the OFT system
   */
  public abstract readonly oftSharedDecimals?: number
  /**
   * The OFT bridging fee per chain in bips, if applicable
   */
  public abstract readonly oftFee?: { [chain: number]: { oftFee?: number; minDstGas?: number } }
  /**
   * The OFT's connected peers
   */
  public abstract readonly oftPeers?: { [chain: number]: { tokenAddress?: string } }
  /**
   * The OFT's connected peers
   */
  public abstract readonly acrossInfo?: { [chain: number]: { tokenAddress?: string } }

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
   */
  protected constructor(chainId: number, decimals: number, symbol?: string, name?: string) {
    invariant(Number.isSafeInteger(chainId), 'CHAIN_ID')
    invariant(decimals >= 0 && decimals < 255 && Number.isInteger(decimals), 'DECIMALS')

    this.chainId = chainId
    this.decimals = decimals
    this.symbol = symbol
    this.name = name
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
