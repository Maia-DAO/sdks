import { mulDivUp } from './math'

describe('mulDivUp', () => {
  it('returns exact result when divisible', () => {
    expect(mulDivUp(BigInt(10), BigInt(2), BigInt(2))).toBe(BigInt(10))
    expect(mulDivUp(BigInt(100), BigInt(5), BigInt(10))).toBe(BigInt(50))
    expect(mulDivUp(BigInt(6), BigInt(4), BigInt(8))).toBe(BigInt(3))
  })

  it('rounds up when not divisible', () => {
    // 10 * 3 / 4 = 7.5, rounds up to 8
    expect(mulDivUp(BigInt(10), BigInt(3), BigInt(4))).toBe(BigInt(8))

    // 7 * 2 / 3 = 4.666..., rounds up to 5
    expect(mulDivUp(BigInt(7), BigInt(2), BigInt(3))).toBe(BigInt(5))

    // 1 * 1 / 2 = 0.5, rounds up to 1
    expect(mulDivUp(BigInt(1), BigInt(1), BigInt(2))).toBe(BigInt(1))
  })

  it('handles zero numerator', () => {
    expect(mulDivUp(BigInt(0), BigInt(100), BigInt(50))).toBe(BigInt(0))
  })

  it('handles zero multiplier', () => {
    expect(mulDivUp(BigInt(100), BigInt(0), BigInt(50))).toBe(BigInt(0))
  })

  it('handles large numbers', () => {
    const large = BigInt('1000000000000000000') // 1e18
    expect(mulDivUp(large, BigInt(2), BigInt(2))).toBe(large)

    // large * 3 / 2 = 1.5e18, exactly divisible so no rounding needed
    expect(mulDivUp(large, BigInt(3), BigInt(2))).toBe(BigInt('1500000000000000000'))

    // large * 4 / 3 = 1333333333333333333, rounds up
    expect(mulDivUp(large, BigInt(4), BigInt(3))).toBe(BigInt('1333333333333333334'))
  })

  it('handles edge case: mul % div === 0', () => {
    // 4 * 3 / 12 = 1 (exact)
    expect(mulDivUp(BigInt(4), BigInt(3), BigInt(12))).toBe(BigInt(1))
  })

  it('handles edge case: mul % div !== 0', () => {
    // 4 * 3 / 11 = 1.09..., rounds up to 2
    expect(mulDivUp(BigInt(4), BigInt(3), BigInt(11))).toBe(BigInt(2))
  })

  it('handles case where remainder is 1 less than divisor', () => {
    // 5 * 2 / 3 = 3.333..., rounds up to 4
    expect(mulDivUp(BigInt(5), BigInt(2), BigInt(3))).toBe(BigInt(4))
  })
})
