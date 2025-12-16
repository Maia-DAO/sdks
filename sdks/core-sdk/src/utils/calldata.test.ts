import JSBI from 'jsbi'

import { toHex } from './calldata'

describe('toHex', () => {
  it('converts 0 to 0x00', () => {
    expect(toHex(0)).toBe('0x00')
    expect(toHex('0')).toBe('0x00')
    expect(toHex(JSBI.BigInt(0))).toBe('0x00')
  })

  it('converts small numbers correctly', () => {
    expect(toHex(1)).toBe('0x01')
    expect(toHex(15)).toBe('0x0f')
    expect(toHex(16)).toBe('0x10')
    expect(toHex(255)).toBe('0xff')
  })

  it('pads odd-length hex with leading zero', () => {
    // 256 = 0x100, but we want 0x0100 to ensure even length
    expect(toHex(256)).toBe('0x0100')
    expect(toHex(4095)).toBe('0x0fff') // 0xfff -> 0x0fff
    expect(toHex(4096)).toBe('0x1000')
  })

  it('converts JSBI BigInt correctly', () => {
    expect(toHex(JSBI.BigInt(255))).toBe('0xff')
    expect(toHex(JSBI.BigInt(256))).toBe('0x0100')
    expect(toHex(JSBI.BigInt('1000000'))).toBe('0x0f4240')
  })

  it('converts number correctly', () => {
    expect(toHex(1000)).toBe('0x03e8')
    expect(toHex(65535)).toBe('0xffff')
    expect(toHex(65536)).toBe('0x010000')
  })

  it('converts string number correctly', () => {
    expect(toHex('1000')).toBe('0x03e8')
    expect(toHex('65535')).toBe('0xffff')
    expect(toHex('65536')).toBe('0x010000')
  })

  it('handles large values', () => {
    // 1e18 in hex
    const oneEther = '1000000000000000000'
    expect(toHex(oneEther)).toBe('0x0de0b6b3a7640000')

    // Max uint256-like large number
    const largeNumber = JSBI.BigInt('115792089237316195423570985008687907853269984665640564039457584007913129639935')
    const result = toHex(largeNumber)
    expect(result.startsWith('0x')).toBe(true)
    expect(result.length).toBe(66) // 0x + 64 hex chars
  })

  it('always returns lowercase hex', () => {
    const result = toHex(255)
    expect(result).toBe('0xff')
    expect(result).not.toBe('0xFF')
  })

  it('always starts with 0x prefix', () => {
    expect(toHex(0).startsWith('0x')).toBe(true)
    expect(toHex(1).startsWith('0x')).toBe(true)
    expect(toHex(1000000).startsWith('0x')).toBe(true)
  })
})
