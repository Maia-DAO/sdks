import { getAddress } from '@ethersproject/address'

/**
 * Validates that an address is a valid EIP-55 checksummed Ethereum address
 */
export const isValidChecksummedAddress = (address?: string): boolean => {
  if (!address) return false
  try {
    return getAddress(address) === address
  } catch {
    return false
  }
}

/**
 * Validates that a hash is a valid bytes32 format (64 hex characters)
 */
export const isValidBytes32 = (hash?: string): boolean => {
  if (!hash) return false
  return /^0x[0-9a-fA-F]{64}$/.test(hash)
}

/**
 * Checks if a field is an address (not a hash or other value)
 */
export const isAddressField = (key: string, value: string): boolean => {
  if (key.toLowerCase().includes('hash') || key.toLowerCase().includes('initcode')) {
    return false
  }
  return value.startsWith('0x') && value.length === 42
}

/**
 * Asserts that an address is checksummed with a clear error message
 */
export const expectChecksummedAddress = (address: string, context: string) => {
  const isValid = isValidChecksummedAddress(address)
  if (!isValid) {
    let expectedChecksum = 'invalid address'
    try {
      expectedChecksum = getAddress(address)
    } catch {
      // address is not valid at all
    }
    throw new Error(
      `${context}: Address is not checksummed.\n` +
        `  Received: ${address}\n` +
        `  Expected: ${expectedChecksum}`
    )
  }
}
