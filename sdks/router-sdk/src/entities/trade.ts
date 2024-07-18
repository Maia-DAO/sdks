import {
  ComposableStablePool,
  ComposableStablePoolWrapper,
  IPool,
  Pair,
  Pool,
  Route as V3RouteSDK,
  Trade as V3TradeSDK,
  TradeType,
  V2RouteSDK,
  V2Trade as V2TradeSDK,
} from 'hermes-v2-sdk'
import { Currency, CurrencyAmount, Fraction, ONE, Percent, Price, ZERO } from 'maia-core-sdk'
import invariant from 'tiny-invariant'

import { ZERO_PERCENT } from '../constants'
import { MixedRouteSDK, TPool } from './mixedRoute/route'
import { MixedRouteTrade as MixedRouteTradeSDK } from './mixedRoute/trade'
import { Protocol } from './protocol'
import { IRoute, MixedRoute, RouteStable, RouteStableWrapper, RouteV2, RouteV3 } from './route'

export class Trade<TInput extends Currency, TOutput extends Currency, TTradeType extends TradeType> {
  public readonly routes: IRoute<TInput, TOutput, TPool>[]
  public readonly tradeType: TTradeType
  private _outputAmount: CurrencyAmount<TOutput> | undefined
  private _inputAmount: CurrencyAmount<TInput> | undefined

  /**
   * The swaps of the trade, i.e. which routes and how much is swapped in each that
   * make up the trade. May consist of swaps in v2 or v3.
   */
  public readonly swaps: {
    route: IRoute<TInput, TOutput, TPool>
    inputAmount: CurrencyAmount<TInput>
    outputAmount: CurrencyAmount<TOutput>
  }[]

  //  construct a trade across v2 and v3 routes from pre-computed amounts
  public constructor({
    v2Routes,
    v3Routes,
    stableRoutes,
    stableWrapperRoutes,
    tradeType,
    mixedRoutes,
    allowDifferentTokenRoutes,
  }: {
    v2Routes: {
      routev2: V2RouteSDK<TInput, TOutput>
      inputAmount: CurrencyAmount<TInput>
      outputAmount: CurrencyAmount<TOutput>
    }[]
    v3Routes: {
      routev3: V3RouteSDK<Pool, TInput, TOutput>
      inputAmount: CurrencyAmount<TInput>
      outputAmount: CurrencyAmount<TOutput>
    }[]
    stableRoutes: {
      routeStable: V3RouteSDK<ComposableStablePool, TInput, TOutput>
      inputAmount: CurrencyAmount<TInput>
      outputAmount: CurrencyAmount<TOutput>
    }[]
    stableWrapperRoutes: {
      routeStableWrapper: V3RouteSDK<ComposableStablePoolWrapper, TInput, TOutput>
      inputAmount: CurrencyAmount<TInput>
      outputAmount: CurrencyAmount<TOutput>
    }[]
    tradeType: TTradeType
    mixedRoutes?: {
      mixedRoute: MixedRouteSDK<TInput, TOutput>
      inputAmount: CurrencyAmount<TInput>
      outputAmount: CurrencyAmount<TOutput>
    }[]
    allowDifferentTokenRoutes?: boolean
  }) {
    this.swaps = []
    this.routes = []
    // wrap v2 routes
    for (const { routev2, inputAmount, outputAmount } of v2Routes) {
      const route = new RouteV2(routev2)
      this.routes.push(route)
      this.swaps.push({
        route,
        inputAmount,
        outputAmount,
      })
    }
    // wrap v3 routes
    for (const { routev3, inputAmount, outputAmount } of v3Routes) {
      const route = new RouteV3(routev3)
      this.routes.push(route)
      this.swaps.push({
        route,
        inputAmount,
        outputAmount,
      })
    }
    // wrap stable routes
    for (const { routeStable, inputAmount, outputAmount } of stableRoutes) {
      const route = new RouteStable(routeStable)
      this.routes.push(route)
      this.swaps.push({
        route,
        inputAmount,
        outputAmount,
      })
    }
    // wrap stable wrapper routes
    for (const { routeStableWrapper, inputAmount, outputAmount } of stableWrapperRoutes) {
      const route = new RouteStableWrapper(routeStableWrapper)
      this.routes.push(route)
      this.swaps.push({
        route,
        inputAmount,
        outputAmount,
      })
    }
    // wrap mixedRoutes
    if (mixedRoutes) {
      for (const { mixedRoute, inputAmount, outputAmount } of mixedRoutes) {
        const route = new MixedRoute(mixedRoute)
        this.routes.push(route)
        this.swaps.push({
          route,
          inputAmount,
          outputAmount,
        })
      }
    }

    if (this.swaps.length === 0) {
      throw new Error('No routes provided when calling Trade constructor')
    }

    this.tradeType = tradeType

    if (!allowDifferentTokenRoutes) {
      // each route must have the same input and output currency
      const inputCurrency = this.swaps[0].inputAmount.currency
      const outputCurrency = this.swaps[0].outputAmount.currency
      invariant(
        this.swaps.every(({ route }) => inputCurrency.wrapped.equals(route.input.wrapped)),
        'INPUT_CURRENCY_MATCH'
      )
      invariant(
        this.swaps.every(({ route }) => outputCurrency.wrapped.equals(route.output.wrapped)),
        'OUTPUT_CURRENCY_MATCH'
      )
    }

    // pools must be unique inter protocols
    const numPools = this.swaps.map(({ route }) => route.pools.length).reduce((total, cur) => total + cur, 0)
    const poolAddressSet = new Set<string>()
    for (const { route } of this.swaps) {
      for (const pool of route.pools) {
        if (pool instanceof Pool) {
          poolAddressSet.add(Pool.getAddress(pool.token0, pool.token1, pool.fee))
        } else if (pool instanceof Pair) {
          const pair = pool
          poolAddressSet.add(Pair.getAddress(pair.token0, pair.token1))
        } else if (pool instanceof ComposableStablePool) {
          poolAddressSet.add(pool.pool.id)
        } else if (pool instanceof ComposableStablePoolWrapper) {
          poolAddressSet.add(pool.vault().address)
        } else {
          throw new Error('Unexpected pool type in route when constructing trade object')
        }
      }
    }
    invariant(numPools == poolAddressSet.size, 'POOLS_DUPLICATED')
  }

  public get inputAmount(): CurrencyAmount<TInput> {
    if (this._inputAmount) {
      return this._inputAmount
    }

    const inputCurrency = this.swaps[0].inputAmount.currency
    const totalInputFromRoutes = this.swaps
      .map(({ inputAmount }) => inputAmount)
      .reduce((total, cur) => total.add(cur), CurrencyAmount.fromRawAmount(inputCurrency, 0))

    this._inputAmount = totalInputFromRoutes
    return this._inputAmount
  }

  public get outputAmount(): CurrencyAmount<TOutput> {
    if (this._outputAmount) {
      return this._outputAmount
    }

    const outputCurrency = this.swaps[0].outputAmount.currency
    const totalOutputFromRoutes = this.swaps
      .map(({ outputAmount }) => outputAmount)
      .reduce((total, cur) => total.add(cur), CurrencyAmount.fromRawAmount(outputCurrency, 0))

    this._outputAmount = totalOutputFromRoutes
    return this._outputAmount
  }

  private _executionPrice: Price<TInput, TOutput> | undefined

  /**
   * The price expressed in terms of output amount/input amount.
   */
  public get executionPrice(): Price<TInput, TOutput> {
    return (
      this._executionPrice ??
      (this._executionPrice = new Price(
        this.inputAmount.currency,
        this.outputAmount.currency,
        this.inputAmount.quotient,
        this.outputAmount.quotient
      ))
    )
  }

  /**
   * Returns the sell tax of the input token
   */
  public get inputTax(): Percent {
    return ZERO_PERCENT

    // TODO: Review if adding tax is needed
    // const inputCurrency = this.inputAmount.currency
    // if (inputCurrency.isNative || !inputCurrency.wrapped.sellFeeBps) return ZERO_PERCENT

    // return new Percent(inputCurrency.wrapped.sellFeeBps.toNumber(), 10000)
  }

  /**
   * Returns the buy tax of the output token
   */
  public get outputTax(): Percent {
    return ZERO_PERCENT

    // TODO: Review if adding tax is needed
    // const outputCurrency = this.outputAmount.currency
    // if (outputCurrency.isNative || !outputCurrency.wrapped.buyFeeBps) return ZERO_PERCENT

    // return new Percent(outputCurrency.wrapped.buyFeeBps.toNumber(), 10000)
  }

  /**
   * The cached result of the price impact computation
   * @private
   */
  private _priceImpact: Percent | undefined

  /**
   * Returns the percent difference between the route's mid price and the expected execution price
   * In order to exclude token taxes from the price impact calculation, the spot price is calculated
   * using a ratio of values that go into the pools, which are the post-tax input amount and pre-tax output amount.
   */
  public get priceImpact(): Percent {
    if (this._priceImpact) {
      return this._priceImpact
    }

    // // returns 0% price impact even though this may be inaccurate as a swap may have occured.
    // // because we're unable to derive the pre-buy-tax amount, use 0% as a placeholder.
    // if (this.outputTax.equalTo(ONE_HUNDRED_PERCENT)) return ZERO_PERCENT

    let spotOutputAmount = CurrencyAmount.fromRawAmount(this.outputAmount.currency, 0)
    for (const { route, inputAmount } of this.swaps) {
      const midPrice = route.midPrice
      // const postTaxInputAmount = inputAmount.multiply(new Fraction(ONE).subtract(this.inputTax))
      spotOutputAmount = spotOutputAmount.add(midPrice.quote(inputAmount))
    }

    // if the total output of this trade is 0, then most likely the post-tax input was also 0, and therefore this swap
    // does not move the pools' market price
    if (spotOutputAmount.equalTo(ZERO)) return ZERO_PERCENT

    // const preTaxOutputAmount = this.outputAmount.divide(new Fraction(ONE).subtract(this.outputTax))
    const priceImpact = spotOutputAmount.subtract(this.outputAmount).divide(spotOutputAmount)

    this._priceImpact = new Percent(priceImpact.numerator, priceImpact.denominator)

    return this._priceImpact
  }

  /**
   * Get the minimum amount that must be received from this trade for the given slippage tolerance
   * @param slippageTolerance The tolerance of unfavorable slippage from the execution price of this trade
   * @returns The amount out
   */
  public minimumAmountOut(slippageTolerance: Percent, amountOut = this.outputAmount): CurrencyAmount<TOutput> {
    invariant(!slippageTolerance.lessThan(ZERO), 'SLIPPAGE_TOLERANCE')
    if (this.tradeType === TradeType.EXACT_OUTPUT) {
      return amountOut
    } else {
      const slippageAdjustedAmountOut = new Fraction(ONE)
        .add(slippageTolerance)
        .invert()
        .multiply(amountOut.quotient).quotient
      return CurrencyAmount.fromRawAmount(amountOut.currency, slippageAdjustedAmountOut)
    }
  }

  /**
   * Get the maximum amount in that can be spent via this trade for the given slippage tolerance
   * @param slippageTolerance The tolerance of unfavorable slippage from the execution price of this trade
   * @returns The amount in
   */
  public maximumAmountIn(slippageTolerance: Percent, amountIn = this.inputAmount): CurrencyAmount<TInput> {
    invariant(!slippageTolerance.lessThan(ZERO), 'SLIPPAGE_TOLERANCE')
    if (this.tradeType === TradeType.EXACT_INPUT) {
      return amountIn
    } else {
      const slippageAdjustedAmountIn = new Fraction(ONE).add(slippageTolerance).multiply(amountIn.quotient).quotient
      return CurrencyAmount.fromRawAmount(amountIn.currency, slippageAdjustedAmountIn)
    }
  }

  /**
   * Return the execution price after accounting for slippage tolerance
   * @param slippageTolerance the allowed tolerated slippage
   * @returns The execution price
   */
  public worstExecutionPrice(slippageTolerance: Percent): Price<TInput, TOutput> {
    return new Price(
      this.inputAmount.currency,
      this.outputAmount.currency,
      this.maximumAmountIn(slippageTolerance).quotient,
      this.minimumAmountOut(slippageTolerance).quotient
    )
  }

  public static async fromRoutes<TInput extends Currency, TOutput extends Currency, TTradeType extends TradeType>(
    v2Routes: {
      routev2: V2RouteSDK<TInput, TOutput>
      amount: TTradeType extends TradeType.EXACT_INPUT ? CurrencyAmount<TInput> : CurrencyAmount<TOutput>
    }[],
    v3Routes: {
      routev3: V3RouteSDK<Pool, TInput, TOutput>
      amount: TTradeType extends TradeType.EXACT_INPUT ? CurrencyAmount<TInput> : CurrencyAmount<TOutput>
    }[],
    stableRoutes: {
      routeStable: V3RouteSDK<ComposableStablePool, TInput, TOutput>
      amount: TTradeType extends TradeType.EXACT_INPUT ? CurrencyAmount<TInput> : CurrencyAmount<TOutput>
    }[],
    stableWrapperRoutes: {
      routeStableWrapper: V3RouteSDK<ComposableStablePoolWrapper, TInput, TOutput>
      amount: TTradeType extends TradeType.EXACT_INPUT ? CurrencyAmount<TInput> : CurrencyAmount<TOutput>
    }[],
    tradeType: TTradeType,
    mixedRoutes?: {
      mixedRoute: MixedRouteSDK<TInput, TOutput>
      amount: TTradeType extends TradeType.EXACT_INPUT ? CurrencyAmount<TInput> : CurrencyAmount<TOutput>
    }[]
  ): Promise<Trade<TInput, TOutput, TTradeType>> {
    const populatedV2Routes: {
      routev2: V2RouteSDK<TInput, TOutput>
      inputAmount: CurrencyAmount<TInput>
      outputAmount: CurrencyAmount<TOutput>
    }[] = []

    const populatedV3Routes: {
      routev3: V3RouteSDK<Pool, TInput, TOutput>
      inputAmount: CurrencyAmount<TInput>
      outputAmount: CurrencyAmount<TOutput>
    }[] = []

    const populatedStableRoutes: {
      routeStable: V3RouteSDK<ComposableStablePool, TInput, TOutput>
      inputAmount: CurrencyAmount<TInput>
      outputAmount: CurrencyAmount<TOutput>
    }[] = []

    const populatedStableWrapperRoutes: {
      routeStableWrapper: V3RouteSDK<ComposableStablePoolWrapper, TInput, TOutput>
      inputAmount: CurrencyAmount<TInput>
      outputAmount: CurrencyAmount<TOutput>
    }[] = []

    const populatedMixedRoutes: {
      mixedRoute: MixedRouteSDK<TInput, TOutput>
      inputAmount: CurrencyAmount<TInput>
      outputAmount: CurrencyAmount<TOutput>
    }[] = []

    for (const { routev2, amount } of v2Routes) {
      const v2Trade = new V2TradeSDK(routev2, amount, tradeType)
      const { inputAmount, outputAmount } = v2Trade

      populatedV2Routes.push({
        routev2,
        inputAmount,
        outputAmount,
      })
    }

    for (const { routev3, amount } of v3Routes) {
      const v3Trade = await V3TradeSDK.fromRoute(routev3, amount, tradeType)
      const { inputAmount, outputAmount } = v3Trade

      populatedV3Routes.push({
        routev3,
        inputAmount,
        outputAmount,
      })
    }

    for (const { routeStable, amount } of stableRoutes) {
      const stableTrade = await V3TradeSDK.fromRoute(routeStable, amount, tradeType)
      const { inputAmount, outputAmount } = stableTrade

      populatedStableRoutes.push({
        routeStable,
        inputAmount,
        outputAmount,
      })
    }

    for (const { routeStableWrapper, amount } of stableWrapperRoutes) {
      const stableWrapperTrade = await V3TradeSDK.fromRoute(routeStableWrapper, amount, tradeType)
      const { inputAmount, outputAmount } = stableWrapperTrade

      populatedStableWrapperRoutes.push({
        routeStableWrapper,
        inputAmount,
        outputAmount,
      })
    }

    if (mixedRoutes) {
      for (const { mixedRoute, amount } of mixedRoutes) {
        const mixedRouteTrade = await MixedRouteTradeSDK.fromRoute(mixedRoute, amount, tradeType)
        const { inputAmount, outputAmount } = mixedRouteTrade

        populatedMixedRoutes.push({
          mixedRoute,
          inputAmount,
          outputAmount,
        })
      }
    }

    return new Trade({
      v2Routes: populatedV2Routes,
      v3Routes: populatedV3Routes,
      stableRoutes: populatedStableRoutes,
      stableWrapperRoutes: populatedStableWrapperRoutes,
      mixedRoutes: populatedMixedRoutes,
      tradeType,
    })
  }

  public static async fromRoute<TInput extends Currency, TOutput extends Currency, TTradeType extends TradeType>(
    route: V2RouteSDK<TInput, TOutput> | V3RouteSDK<IPool, TInput, TOutput> | MixedRouteSDK<TInput, TOutput>,
    amount: TTradeType extends TradeType.EXACT_INPUT ? CurrencyAmount<TInput> : CurrencyAmount<TOutput>,
    tradeType: TTradeType
  ): Promise<Trade<TInput, TOutput, TTradeType>> {
    let v2Routes: {
      routev2: V2RouteSDK<TInput, TOutput>
      inputAmount: CurrencyAmount<TInput>
      outputAmount: CurrencyAmount<TOutput>
    }[] = []

    let v3Routes: {
      routev3: V3RouteSDK<Pool, TInput, TOutput>
      inputAmount: CurrencyAmount<TInput>
      outputAmount: CurrencyAmount<TOutput>
    }[] = []

    let stableRoutes: {
      routeStable: V3RouteSDK<ComposableStablePool, TInput, TOutput>
      inputAmount: CurrencyAmount<TInput>
      outputAmount: CurrencyAmount<TOutput>
    }[] = []

    const stableWrapperRoutes: {
      routeStableWrapper: V3RouteSDK<ComposableStablePoolWrapper, TInput, TOutput>
      inputAmount: CurrencyAmount<TInput>
      outputAmount: CurrencyAmount<TOutput>
    }[] = []

    let mixedRoutes: {
      mixedRoute: MixedRouteSDK<TInput, TOutput>
      inputAmount: CurrencyAmount<TInput>
      outputAmount: CurrencyAmount<TOutput>
    }[] = []

    if (route instanceof V2RouteSDK) {
      const v2Trade = new V2TradeSDK(route, amount, tradeType)
      const { inputAmount, outputAmount } = v2Trade
      v2Routes = [{ routev2: route, inputAmount, outputAmount }]
    } else if (route instanceof V3RouteSDK) {
      if (Trade.routeProtocol(route) === Protocol.V3) {
        const v3Trade = await V3TradeSDK.fromRoute(route, amount, tradeType)
        const { inputAmount, outputAmount } = v3Trade
        v3Routes = [{ routev3: route as V3RouteSDK<Pool, TInput, TOutput>, inputAmount, outputAmount }]
      } else if (Trade.routeProtocol(route) === Protocol.BAL_STABLE) {
        const stableTrade = await V3TradeSDK.fromRoute(route, amount, tradeType)
        const { inputAmount, outputAmount } = stableTrade
        stableRoutes = [
          { routeStable: route as V3RouteSDK<ComposableStablePool, TInput, TOutput>, inputAmount, outputAmount },
        ]
      } else if (Trade.routeProtocol(route) === Protocol.BAL_STABLE_WRAPPER) {
        const stableWrapperTrade = await V3TradeSDK.fromRoute(route, amount, tradeType)
        const { inputAmount, outputAmount } = stableWrapperTrade
        stableWrapperRoutes.push({
          routeStableWrapper: route as V3RouteSDK<ComposableStablePoolWrapper, TInput, TOutput>,
          inputAmount,
          outputAmount,
        })
      } else {
        throw new Error('Invalid route type')
      }
    } else if (route instanceof MixedRouteSDK) {
      const mixedRouteTrade = await MixedRouteTradeSDK.fromRoute(route, amount, tradeType)
      const { inputAmount, outputAmount } = mixedRouteTrade
      mixedRoutes = [{ mixedRoute: route, inputAmount, outputAmount }]
    } else {
      throw new Error('Invalid route type')
    }

    return new Trade({
      v2Routes,
      v3Routes,
      stableRoutes,
      stableWrapperRoutes,
      mixedRoutes,
      tradeType,
    })
  }

  public static tradeProtocol(trade: V3TradeSDK<IPool, any, any, any>): Protocol {
    return Trade.routeProtocol(trade.swaps[0].route)
  }

  public static routeProtocol(route: V3RouteSDK<IPool, any, any>): Protocol {
    if (route.pools.length == 0) throw new Error('INVALID_ROUTE')

    if (route.pools[0] instanceof Pool) return Protocol.V3
    else if (route.pools[0] instanceof ComposableStablePool) return Protocol.BAL_STABLE
    else if (route.pools[0] instanceof ComposableStablePoolWrapper) return Protocol.BAL_STABLE_WRAPPER

    throw new Error('UNSUPPORTED_PROTOCOL')
  }
}
