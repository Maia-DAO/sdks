import { Currency, NativeToken } from 'maia-core-sdk'

/**
 *
 * A virtualized token is any token native to the chain or not, and is being used in the ulysses system.
 * This includes local and global tokens.
 * @export
 * @abstract
 * @class BaseVirtualizedToken
 * @extends {NativeToken} - This just means that the token is not a gas token.
 */
export abstract class BaseVirtualizedToken extends NativeToken {
  /**
   * Underlying currency that the virtualized token represents.
   *
   * @type {Currency}
   * @memberof BaseVirtualizedToken
   */
  public readonly underlyingCurrency: Currency

  /**
   * Contructor for VirtualizedToken
   * @param address address of the virtualized token
   * @param chainId chainId where the token resides
   * @param decimals decimals of the token
   * @param symbol symbol of the token
   * @param name name of the token
   */
  constructor(
    address: string,
    chainId: number,
    decimals: number,
    underlyingCurrency: Currency,
    symbol?: string,
    name?: string,
    bypassChecksum?: boolean
  ) {
    super(chainId, address, decimals, symbol, name, bypassChecksum)
    this.underlyingCurrency = underlyingCurrency
  }
}
