import { BigNumberish } from '@ethersproject/bignumber'
import invariant from 'tiny-invariant'

import { Permit2Permit } from '../../types'
import { ROUTER_AS_RECIPIENT, WETH_ADDRESS } from '../../utils/constants'
import { encodeInputTokenOptions } from '../../utils/inputTokens'
import { CommandType, RoutePlanner } from '../../utils/routerCommands'
import { Command, RouterTradeType, TradeConfig } from '../Command'

export class UnwrapWETH implements Command {
  readonly tradeType: RouterTradeType = RouterTradeType.UnwrapWETH
  readonly permit2Data: Permit2Permit | undefined
  readonly wethAddress: string
  readonly amount: BigNumberish

  constructor(amount: BigNumberish, chainId: number, permit2?: Permit2Permit) {
    this.wethAddress = WETH_ADDRESS(chainId)
    this.amount = amount

    if (!!permit2) {
      invariant(
        permit2.details.token.toLowerCase() === this.wethAddress.toLowerCase(),
        `must be permitting WETH address: ${this.wethAddress}`
      )
      invariant(permit2.details.amount >= amount, `Did not permit enough WETH for unwrapWETH transaction`)
      this.permit2Data = permit2
    }
  }

  encode(planner: RoutePlanner, _: TradeConfig): void {
    encodeInputTokenOptions(planner, {
      permit2Permit: this.permit2Data,
      permit2TransferFrom: {
        token: this.wethAddress,
        amount: this.amount.toString(),
      },
    })
    planner.addCommand(CommandType.UNWRAP_WETH, [ROUTER_AS_RECIPIENT, this.amount])
  }
}
