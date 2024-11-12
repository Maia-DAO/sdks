import { MAX_RANGE } from '../constants/constants'
import { convertBasedOnEfficiency, getAmountsCurrentTickUSD } from './tvl'

export function calculateLiquidityData(
  pool?: any,
  incentive?: any,
  token0USD?: any,
  token1USD?: any
): { activeLiquidityUSD: any; fullRangeLiquidityUSD: any } {
  const activeTickLiquidityUSD = getAmountsCurrentTickUSD(
    Number(pool?.sqrtPrice),
    Number(pool?.tick),
    Number(pool?.liquidity),
    Number(pool?.feeTier),
    Number(pool?.token0?.decimals),
    Number(pool?.token1?.decimals),
    Number(token0USD),
    Number(token1USD)
  )
  const activeLiquidityUSD = convertBasedOnEfficiency(activeTickLiquidityUSD, pool?.feeTier, incentive?.minWidth ?? 0)
  const fullRangeLiquidityUSD = convertBasedOnEfficiency(activeTickLiquidityUSD, pool?.feeTier, MAX_RANGE)

  return {
    activeLiquidityUSD,
    fullRangeLiquidityUSD,
  }
}
//range must be a number equivalent to the range of the pool
export function calculateCustomLiquidityData(
  pool: any,
  incentive: any,
  token0USD?: any,
  token1USD?: any,
  range?: any
): { activeLiquidityUSD: any; customRangeLiquidityUSD: any } {
  const activeTickLiquidityUSD = getAmountsCurrentTickUSD(
    Number(pool?.sqrtPrice),
    Number(pool?.tick),
    Number(pool?.liquidity),
    Number(pool?.feeTier),
    Number(pool?.token0?.decimals),
    Number(pool?.token1?.decimals),
    Number(token0USD),
    Number(token1USD)
  )
  const activeLiquidityUSD = convertBasedOnEfficiency(activeTickLiquidityUSD, pool?.feeTier, incentive?.minWidth ?? 0)

  // Calculate custom range liquidity based on the provided range
  const customRangeLiquidityUSD = convertBasedOnEfficiency(activeTickLiquidityUSD, pool?.feeTier, range)

  return {
    activeLiquidityUSD,
    customRangeLiquidityUSD,
  }
}
