import { TalosAddressesType } from '../../types'
import { SupportedChainId } from '../chainIds'

/**
 * TalosAddresses is a mapping of supported chain IDs to their respective Talos addresses.
 *
 * This object uses the SupportedChainId enum to map each supported chain to its corresponding
 * Talos addresses. It implements the TalosAddressesType type, ensuring it has the required structure.
 *
 * @type {TalosAddressesType}
 * @property {object} [SupportedChainId.ARBITRUM_ONE] - Addresses for the Arbitrum network
 * @property {string} [SupportedChainId.ARBITRUM_ONE].TalosStrategyStakedFactory - Address of the TalosStrategyStakedFactory contract on Arbitrum
 * @property {string} [SupportedChainId.ARBITRUM_ONE].OptimizerFactory - Address of the OptimizerFactory contract on Arbitrum
 * @property {string} [SupportedChainId.ARBITRUM_ONE].BoostAggregatorFactory - Address of the BoostAggregatorFactory contract on Arbitrum
 * @property {string} [SupportedChainId.ARBITRUM_ONE].TalosManagerFactory - Address of the TalosManagerFactory contract on Arbitrum
 * @property {string} [SupportedChainId.ARBITRUM_ONE].FlywheelCoreInstant - Address of the FlywheelCoreInstant contract on Arbitrum
 * @property {string} [SupportedChainId.ARBITRUM_ONE].TransferAll - Address of the TransferAll contract on Arbitrum
 * @property {object} [SupportedChainId.SEPOLIA] - Addresses for the Sepolia network
 * @property {string} [SupportedChainId.SEPOLIA].TalosStrategyStakedFactory - Address of the TalosStrategyStakedFactory contract on Sepolia
 * @property {string} [SupportedChainId.SEPOLIA].OptimizerFactory - Address of the OptimizerFactory contract on Sepolia
 * @property {string} [SupportedChainId.SEPOLIA].BoostAggregatorFactory - Address of the BoostAggregatorFactory contract on Sepolia
 * @property {string} [SupportedChainId.SEPOLIA].TalosManagerFactory - Address of the TalosManagerFactory contract on Sepolia
 * @property {string} [SupportedChainId.SEPOLIA].FlywheelCoreInstant - Address of the FlywheelCoreInstant contract on Sepolia
 * @property {string} [SupportedChainId.SEPOLIA].TransferAll - Address of the TransferAll contract on Sepolia
 *
 * @example
 * ```ts
 * import { TalosAddresses } from './TalosAddresses'
 * import { SupportedChainId } from '../chainIds'
 *
 * // Accessing the Talos addresses for the Arbitrum network
 * const arbitrumAddresses = TalosAddresses[SupportedChainId.ARBITRUM_ONE]
 * console.log(arbitrumAddresses.TalosStrategyStakedFactory) // Outputs: '0x17B4f847f9B071298f3eF0DAd5FCB20453bd537D'
 *
 * // Accessing the Talos addresses for the Sepolia network
 * const sepoliaAddresses = TalosAddresses[SupportedChainId.SEPOLIA]
 * console.log(sepoliaAddresses.TalosStrategyStakedFactory) // Outputs: '0xA483A5FB7974Dcdc4480a976fECD4e5d21312E20'
 * ```
 */
export const TalosAddresses: TalosAddressesType = {
  [SupportedChainId.ARBITRUM_ONE]: {
    TalosStrategyStakedFactory: '0x17B4f847f9B071298f3eF0DAd5FCB20453bd537D',
    OptimizerFactory: '0x000000005De908d83F4b6072D388e3e9Fc543557',
    BoostAggregatorFactory: '0x223F3862F28848784432dc48346d133aBA94fbD4',
    TalosManagerFactory: '0x6D8Cd89C13a34020e6cF4D42B4eB86D60c31571C',
    FlywheelCoreInstant: '0xfA7d81256a4fe221A2FD4abb090F2a33a2F956C5',
    TransferAll: '0x000067eadd040000d8ee00c1b9ca41ef920c005c',
  },

  [SupportedChainId.SEPOLIA]: {
    TalosStrategyStakedFactory: '0xA483A5FB7974Dcdc4480a976fECD4e5d21312E20',
    OptimizerFactory: '0xE5534Af145B1F539a89F0a8c210c1213539Aa0Bc',
    BoostAggregatorFactory: '0xA6605f5Ade7eA775535a7e0B54833b7EE6eE98C6',
    TalosManagerFactory: '0x09e2877026cC748c992612b999c4b8A10bfE8Eea',
    FlywheelCoreInstant: '0x090BB8B6a6f8daa1cD1e3153F030F2E7609D4321',
    TransferAll: '0x000bE6db68E716106dAb57190c6A1bF6D3F4cBAf',
  },
}
