import { SupportedChainId } from './chainIds'
import {
  GOVERNANCE_BRAVO_ADDRESSES,
  GOVERNANCE_BRAVO_SEVERITY_1_ADDRESSES,
  GOVERNANCE_BRAVO_SEVERITY_2_ADDRESSES,
  GOVERNANCE_BRAVO_SEVERITY_3_ADDRESSES,
  GOVERNANCE_BRAVO_SEVERITY_4_ADDRESSES,
  GOVERNANCE_BRAVO_SEVERITY_5_ADDRESSES,
  TIMELOCK_ADDRESS,
  TIMELOCK_SEVERITY_1_ADDRESSES,
  TIMELOCK_SEVERITY_2_ADDRESSES,
  TIMELOCK_SEVERITY_3_ADDRESSES,
  TIMELOCK_SEVERITY_4_ADDRESSES,
  TIMELOCK_SEVERITY_5_ADDRESSES,
} from './governance'
import { isValidChecksummedAddress, expectChecksummedAddress } from './test-utils'

describe('GOVERNANCE_BRAVO_ADDRESSES', () => {
  it('has addresses for Arbitrum and Sepolia', () => {
    expect(GOVERNANCE_BRAVO_ADDRESSES[SupportedChainId.ARBITRUM_ONE]).toBeDefined()
    expect(GOVERNANCE_BRAVO_ADDRESSES[SupportedChainId.SEPOLIA]).toBeDefined()
  })

  it('all addresses are valid checksummed', () => {
    Object.entries(GOVERNANCE_BRAVO_ADDRESSES).forEach(([chainId, address]) => {
      expectChecksummedAddress(address, `GOVERNANCE_BRAVO_ADDRESSES[${chainId}]`)
    })
  })
})

describe('GOVERNANCE_BRAVO_SEVERITY_1_ADDRESSES', () => {
  it('has addresses for Arbitrum and Sepolia', () => {
    expect(GOVERNANCE_BRAVO_SEVERITY_1_ADDRESSES[SupportedChainId.ARBITRUM_ONE]).toBeDefined()
    expect(GOVERNANCE_BRAVO_SEVERITY_1_ADDRESSES[SupportedChainId.SEPOLIA]).toBeDefined()
  })

  it('all addresses are valid checksummed', () => {
    Object.entries(GOVERNANCE_BRAVO_SEVERITY_1_ADDRESSES).forEach(([chainId, address]) => {
      expectChecksummedAddress(address, `GOVERNANCE_BRAVO_SEVERITY_1_ADDRESSES[${chainId}]`)
    })
  })
})

describe('GOVERNANCE_BRAVO_SEVERITY_2_ADDRESSES', () => {
  it('has addresses for Arbitrum and Sepolia', () => {
    expect(GOVERNANCE_BRAVO_SEVERITY_2_ADDRESSES[SupportedChainId.ARBITRUM_ONE]).toBeDefined()
    expect(GOVERNANCE_BRAVO_SEVERITY_2_ADDRESSES[SupportedChainId.SEPOLIA]).toBeDefined()
  })

  it('all addresses are valid checksummed', () => {
    Object.entries(GOVERNANCE_BRAVO_SEVERITY_2_ADDRESSES).forEach(([chainId, address]) => {
      expectChecksummedAddress(address, `GOVERNANCE_BRAVO_SEVERITY_2_ADDRESSES[${chainId}]`)
    })
  })
})

describe('GOVERNANCE_BRAVO_SEVERITY_3_ADDRESSES', () => {
  it('has addresses for Arbitrum and Sepolia', () => {
    expect(GOVERNANCE_BRAVO_SEVERITY_3_ADDRESSES[SupportedChainId.ARBITRUM_ONE]).toBeDefined()
    expect(GOVERNANCE_BRAVO_SEVERITY_3_ADDRESSES[SupportedChainId.SEPOLIA]).toBeDefined()
  })

  it('all addresses are valid checksummed', () => {
    Object.entries(GOVERNANCE_BRAVO_SEVERITY_3_ADDRESSES).forEach(([chainId, address]) => {
      expectChecksummedAddress(address, `GOVERNANCE_BRAVO_SEVERITY_3_ADDRESSES[${chainId}]`)
    })
  })
})

describe('GOVERNANCE_BRAVO_SEVERITY_4_ADDRESSES', () => {
  it('has addresses for Arbitrum and Sepolia', () => {
    expect(GOVERNANCE_BRAVO_SEVERITY_4_ADDRESSES[SupportedChainId.ARBITRUM_ONE]).toBeDefined()
    expect(GOVERNANCE_BRAVO_SEVERITY_4_ADDRESSES[SupportedChainId.SEPOLIA]).toBeDefined()
  })

  it('all addresses are valid checksummed', () => {
    Object.entries(GOVERNANCE_BRAVO_SEVERITY_4_ADDRESSES).forEach(([chainId, address]) => {
      expectChecksummedAddress(address, `GOVERNANCE_BRAVO_SEVERITY_4_ADDRESSES[${chainId}]`)
    })
  })
})

describe('GOVERNANCE_BRAVO_SEVERITY_5_ADDRESSES', () => {
  it('has addresses for Arbitrum and Sepolia', () => {
    expect(GOVERNANCE_BRAVO_SEVERITY_5_ADDRESSES[SupportedChainId.ARBITRUM_ONE]).toBeDefined()
    expect(GOVERNANCE_BRAVO_SEVERITY_5_ADDRESSES[SupportedChainId.SEPOLIA]).toBeDefined()
  })

  it('all addresses are valid checksummed', () => {
    Object.entries(GOVERNANCE_BRAVO_SEVERITY_5_ADDRESSES).forEach(([chainId, address]) => {
      expectChecksummedAddress(address, `GOVERNANCE_BRAVO_SEVERITY_5_ADDRESSES[${chainId}]`)
    })
  })
})

describe('TIMELOCK_ADDRESS', () => {
  it('has addresses for Arbitrum and Sepolia', () => {
    expect(TIMELOCK_ADDRESS[SupportedChainId.ARBITRUM_ONE]).toBeDefined()
    expect(TIMELOCK_ADDRESS[SupportedChainId.SEPOLIA]).toBeDefined()
  })

  it('all addresses are valid checksummed', () => {
    Object.entries(TIMELOCK_ADDRESS).forEach(([chainId, address]) => {
      expectChecksummedAddress(address, `TIMELOCK_ADDRESS[${chainId}]`)
    })
  })
})

describe('TIMELOCK_SEVERITY_1_ADDRESSES', () => {
  it('has addresses for Arbitrum and Sepolia', () => {
    expect(TIMELOCK_SEVERITY_1_ADDRESSES[SupportedChainId.ARBITRUM_ONE]).toBeDefined()
    expect(TIMELOCK_SEVERITY_1_ADDRESSES[SupportedChainId.SEPOLIA]).toBeDefined()
  })

  it('all addresses are valid checksummed', () => {
    Object.entries(TIMELOCK_SEVERITY_1_ADDRESSES).forEach(([chainId, address]) => {
      expectChecksummedAddress(address, `TIMELOCK_SEVERITY_1_ADDRESSES[${chainId}]`)
    })
  })
})

describe('TIMELOCK_SEVERITY_2_ADDRESSES', () => {
  it('has addresses for Arbitrum and Sepolia', () => {
    expect(TIMELOCK_SEVERITY_2_ADDRESSES[SupportedChainId.ARBITRUM_ONE]).toBeDefined()
    expect(TIMELOCK_SEVERITY_2_ADDRESSES[SupportedChainId.SEPOLIA]).toBeDefined()
  })

  it('all addresses are valid checksummed', () => {
    Object.entries(TIMELOCK_SEVERITY_2_ADDRESSES).forEach(([chainId, address]) => {
      expectChecksummedAddress(address, `TIMELOCK_SEVERITY_2_ADDRESSES[${chainId}]`)
    })
  })
})

describe('TIMELOCK_SEVERITY_3_ADDRESSES', () => {
  it('has addresses for Arbitrum and Sepolia', () => {
    expect(TIMELOCK_SEVERITY_3_ADDRESSES[SupportedChainId.ARBITRUM_ONE]).toBeDefined()
    expect(TIMELOCK_SEVERITY_3_ADDRESSES[SupportedChainId.SEPOLIA]).toBeDefined()
  })

  it('all addresses are valid checksummed', () => {
    Object.entries(TIMELOCK_SEVERITY_3_ADDRESSES).forEach(([chainId, address]) => {
      expectChecksummedAddress(address, `TIMELOCK_SEVERITY_3_ADDRESSES[${chainId}]`)
    })
  })
})

describe('TIMELOCK_SEVERITY_4_ADDRESSES', () => {
  it('has addresses for Arbitrum and Sepolia', () => {
    expect(TIMELOCK_SEVERITY_4_ADDRESSES[SupportedChainId.ARBITRUM_ONE]).toBeDefined()
    expect(TIMELOCK_SEVERITY_4_ADDRESSES[SupportedChainId.SEPOLIA]).toBeDefined()
  })

  it('all addresses are valid checksummed', () => {
    Object.entries(TIMELOCK_SEVERITY_4_ADDRESSES).forEach(([chainId, address]) => {
      expectChecksummedAddress(address, `TIMELOCK_SEVERITY_4_ADDRESSES[${chainId}]`)
    })
  })
})

describe('TIMELOCK_SEVERITY_5_ADDRESSES', () => {
  it('has addresses for Arbitrum and Sepolia', () => {
    expect(TIMELOCK_SEVERITY_5_ADDRESSES[SupportedChainId.ARBITRUM_ONE]).toBeDefined()
    expect(TIMELOCK_SEVERITY_5_ADDRESSES[SupportedChainId.SEPOLIA]).toBeDefined()
  })

  it('all addresses are valid checksummed', () => {
    Object.entries(TIMELOCK_SEVERITY_5_ADDRESSES).forEach(([chainId, address]) => {
      expectChecksummedAddress(address, `TIMELOCK_SEVERITY_5_ADDRESSES[${chainId}]`)
    })
  })
})

describe('All Governance Addresses', () => {
  const allGovernanceAddressMaps = [
    { name: 'GOVERNANCE_BRAVO_ADDRESSES', map: GOVERNANCE_BRAVO_ADDRESSES },
    { name: 'GOVERNANCE_BRAVO_SEVERITY_1_ADDRESSES', map: GOVERNANCE_BRAVO_SEVERITY_1_ADDRESSES },
    { name: 'GOVERNANCE_BRAVO_SEVERITY_2_ADDRESSES', map: GOVERNANCE_BRAVO_SEVERITY_2_ADDRESSES },
    { name: 'GOVERNANCE_BRAVO_SEVERITY_3_ADDRESSES', map: GOVERNANCE_BRAVO_SEVERITY_3_ADDRESSES },
    { name: 'GOVERNANCE_BRAVO_SEVERITY_4_ADDRESSES', map: GOVERNANCE_BRAVO_SEVERITY_4_ADDRESSES },
    { name: 'GOVERNANCE_BRAVO_SEVERITY_5_ADDRESSES', map: GOVERNANCE_BRAVO_SEVERITY_5_ADDRESSES },
    { name: 'TIMELOCK_ADDRESS', map: TIMELOCK_ADDRESS },
    { name: 'TIMELOCK_SEVERITY_1_ADDRESSES', map: TIMELOCK_SEVERITY_1_ADDRESSES },
    { name: 'TIMELOCK_SEVERITY_2_ADDRESSES', map: TIMELOCK_SEVERITY_2_ADDRESSES },
    { name: 'TIMELOCK_SEVERITY_3_ADDRESSES', map: TIMELOCK_SEVERITY_3_ADDRESSES },
    { name: 'TIMELOCK_SEVERITY_4_ADDRESSES', map: TIMELOCK_SEVERITY_4_ADDRESSES },
    { name: 'TIMELOCK_SEVERITY_5_ADDRESSES', map: TIMELOCK_SEVERITY_5_ADDRESSES },
  ]

  it('has exactly 12 governance address maps', () => {
    expect(allGovernanceAddressMaps).toHaveLength(12)
  })

  it('all governance addresses across all maps are valid checksummed', () => {
    allGovernanceAddressMaps.forEach(({ map }) => {
      Object.entries(map).forEach(([, address]) => {
        expect(isValidChecksummedAddress(address)).toBe(true)
      })
    })
  })
})
