import { BalancerAddressesType, HermesAddressesType, MaiaAddressesType, TalosAddressesType } from './protocols'

export interface IArbitrumProtocols {
  Hermes: HermesAddressesType
  Maia: MaiaAddressesType
  Talos: TalosAddressesType
  Balancer: BalancerAddressesType
}
