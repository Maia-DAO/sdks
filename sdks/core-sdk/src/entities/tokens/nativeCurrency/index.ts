import { BaseCurrency } from '../baseCurrency'

/**
 * Represents the native currency of the chain on which it resides, e.g. eth on Mainnet.
 */
export abstract class NativeCurrency extends BaseCurrency {
  public readonly isNative: true = true as const
  public readonly isToken: false = false as const

  public readonly isGlobal: false = false as const

  public readonly isAcross: false = false as const

  public readonly priceSource = undefined

  public readonly isOFT: false = false as const
  public readonly oftAdapter = undefined
  public readonly oftVersion = undefined
  public readonly endpointVersion = undefined
  public readonly endpointId = undefined
  public readonly oftSharedDecimals = undefined
  public readonly oftFee = undefined
  public readonly oftPeers = undefined
  public readonly acrossInfo = undefined
}
