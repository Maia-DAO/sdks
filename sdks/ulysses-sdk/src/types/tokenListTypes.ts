type ExtensionValue = string | number | boolean | null | undefined

type Extensions = {
  readonly [key: string]: ExtensionValue | Extensions
}

export interface TokenInfo {
  readonly chainId: number
  readonly globalAddress: string
  readonly localAddress?: { [key: number]: string }
  readonly underlyingAddress: string
  readonly name: string
  readonly decimals: number
  readonly symbol: string
  readonly logoURI?: string
  readonly tags?: string[]
  readonly extensions?: Extensions
  readonly isAcross?: boolean
  readonly isOFT?: boolean
  readonly oftAdapter?: string
  readonly oftVersion?: number
  readonly endpointVersion?: number
  readonly endpointId?: number
  readonly oftSharedDecimals?: number
  readonly noLiquidityOnChain?: boolean
}

export interface RootTokenInfo {
  readonly chainId: number
  readonly address: string
  readonly name: string
  readonly decimals: number
  readonly symbol: string
  readonly logoURI?: string
  readonly tags?: string[]
  readonly extensions?: Extensions
  readonly isAcross?: boolean
  readonly isOFT?: boolean
  readonly oftAdapter?: string
  readonly oftVersion?: number
  readonly endpointVersion?: number
  readonly endpointId?: number
  readonly oftSharedDecimals?: number
  readonly noLiquidityOnChain?: boolean
}

export interface Version {
  readonly major: number
  readonly minor: number
  readonly patch: number
}

export interface Tags {
  readonly [tagId: string]: {
    readonly name: string
    readonly description: string
  }
}

export interface TokenList {
  readonly name: string
  readonly timestamp: string
  readonly version: Version
  readonly tokens: TokenInfo[]
  readonly rootTokens: RootTokenInfo[]
  readonly keywords?: string[]
  readonly tags?: Tags
  readonly logoURI?: string
}

export interface RootTokenList {
  readonly name: string
  readonly timestamp: string
  readonly version: Version
  readonly tokens: RootTokenInfo[]
  readonly tokenMap?: {
    readonly [key: string]: TokenInfo
  }
  readonly keywords?: string[]
  readonly tags?: Tags
  readonly logoURI?: string
}
