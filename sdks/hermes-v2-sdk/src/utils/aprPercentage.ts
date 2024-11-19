import { YEAR as YEAR_IN_SECONDS } from '../constants/constants'

type Row = {
  tokenPriceUSD: number
  fullRangeLiquidityUSD: number
  reward: number
  activeLiquidityUSD: number
  startTime: number
  endTime: number
}

export function aprPercentage(row: Row): string {
  if (row.tokenPriceUSD == 0) return '0% - 0%'

  // 31536000 = 365 days in seconds
  const multiplier = (YEAR_IN_SECONDS / (row.endTime - row.startTime)) * 100
  const rewardsUSD = row.reward * row.tokenPriceUSD

  const firstPercentage =
    (row.fullRangeLiquidityUSD > 0 && (apr(rewardsUSD, row.fullRangeLiquidityUSD, multiplier) * 0.4).toFixed(2)) || '0'

  const secondPercentage =
    (row.activeLiquidityUSD > 0 && apr(rewardsUSD, row.activeLiquidityUSD, multiplier).toFixed(2)) || '0'

  return `${firstPercentage}% - ${secondPercentage}%`
}

function apr(rewardsUSD: number, liquidityUSD: number, multiplier: number): number {
  return (rewardsUSD / liquidityUSD) * multiplier
}
