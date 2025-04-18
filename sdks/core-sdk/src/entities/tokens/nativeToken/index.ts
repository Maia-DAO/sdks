import { BaseNativeToken } from '../baseNativeToken'

/**
 * Represents an ERC20 token with a unique address and some metadata native to a given chain.
 */
export class NativeToken extends BaseNativeToken {
  public readonly isGlobal: false = false as const
  public readonly isOFT: boolean
  public readonly isAcross: boolean

  /**
   *
   * @param chainId {@link BaseCurrency#chainId}
   * @param address The contract address on the chain on which this token lives.
   * @param decimals {@link BaseCurrency#decimals}
   * @param symbol {@link BaseCurrency#symbol}
   * @param name {@link BaseCurrency#name}
   * @param bypassChecksum If true it only checks for length === 42, startsWith 0x and contains only hex characters.
   */
  public constructor(
    chainId: number,
    address: string,
    decimals: number,
    symbol?: string,
    name?: string,
    bypassChecksum?: boolean,
    isOFT?: boolean,
    isAcross?: boolean
  ) {
    super(chainId, address, decimals, symbol, name, bypassChecksum)

    this.isOFT = isOFT ?? false
    this.isAcross = isAcross ?? false
  }

  /**
   * Return this token, which does not need to be wrapped
   */
  public get wrapped(): this {
    return this
  }
}
