import { BHermesGauges, TDecrementGaugeParams } from 'hermes-v2-sdk'
import { HermesAddresses, ROOT_CHAIN_ID, SupportedChainId, ZERO_ADDRESS } from 'maia-core-sdk'

import { IAction, IActionResult } from '../../../../utils/action'

/**
 * @title DecrementGaugeAction class
 * @notice Provides a set of function to encode calldata for the decrement gauge action in bHermesGauges contract.
 * @author MaiaDAO
 */
export class DecrementGaugeAction implements IAction<TDecrementGaugeParams, IActionResult<void>> {
  params: TDecrementGaugeParams
  chainId?: SupportedChainId

  /**
   * Constructor for the DecrementGaugeAction class.
   * @param params the parameters for the decrement gauge action in bHermesGauges.
   * @returns a new instance of DecrementGaugeAction.
   * @notice the constructor is used to set the parameters for the decrement gauge action in bHermesGauges.
   */
  constructor(params: TDecrementGaugeParams, chainId?: SupportedChainId) {
    this.params = params
    this.chainId = chainId
  }

  /**
   * Encodes the contract interaction calldata to decrement a gauge in bHermesGauges.
   * @param params the parameters for the decrement gauge action in bHermesGauges.
   * @returns the target contract, encoded calldata and message value to send onchain for the decrement gauge action.
   */
  public encode(params: TDecrementGaugeParams): IActionResult<IActionResult<void>> {
    return {
      target: HermesAddresses[this.chainId ?? ROOT_CHAIN_ID]?.bHermesGauges ?? ZERO_ADDRESS,
      params: { calldata: BHermesGauges.encodeDecrementGaugeCalldata(params), value: '0' },
    }
  }
}
