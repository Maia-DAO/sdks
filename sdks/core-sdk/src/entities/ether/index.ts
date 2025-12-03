import invariant from 'tiny-invariant'

import type { BaseTokenExtensions } from '../../types'
import type { Currency } from '../tokens/currency'
import { NativeCurrency } from '../tokens/nativeCurrency'
import { NativeToken } from '../tokens/nativeToken'
import { WETH9 } from '../weth9'

/**
 * Ether is the main usage of a 'native' currency, i.e. for Ethereum mainnet and all testnets
 */
export class Ether extends NativeCurrency {
  protected constructor(chainId: number, extensions?: BaseTokenExtensions) {
    super(chainId, 18, 'ETH', 'Ether', extensions)
  }

  public get wrapped(): NativeToken {
    const weth9 = WETH9[this.chainId]
    invariant(!!weth9, 'WRAPPED')
    return weth9
  }

  private static _etherCache: { [chainId: number]: Ether } = {}

  public static onChain(chainId: number, extensions?: BaseTokenExtensions): Ether {
    return this._etherCache[chainId] ?? (this._etherCache[chainId] = new Ether(chainId, extensions))
  }

  public equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }
}
