import { formatBalance, formatGasFee } from "@src/utils/lib"


test('Format balance', () => {
  expect(formatBalance(1.23)).toBe('1.23')
  expect(formatBalance(1.0000000000023)).toBe('1')
  expect(formatBalance(1.000023234343)).toBe('1.000023')
  expect(formatBalance(100.2343434454545)).toBe('100.234343')
  expect(formatBalance(1.00030000023434)).toBe('1.0003')
  expect(formatBalance(1.0000302)).toBe('1.00003')
  expect(formatBalance(0.0000000001234)).toBe('0')
  expect(formatBalance(0.12)).toBe('0.12')
})


test('Format Gas', () => {
  expect(formatGasFee(1.23)).toBe('1.23')
  expect(formatGasFee(1.0000000000023)).toBe('1')
  expect(formatGasFee(1.000023234343)).toBe('1.00002323')
  expect(formatGasFee(100.2343434454545)).toBe('100.23434345')
  expect(formatGasFee(1.00030000023434)).toBe('1.0003')
  expect(formatGasFee(1.0000302)).toBe('1.0000302')
  expect(formatGasFee(0.0000000000000000001234)).toBe('<0.00000001')
  expect(formatGasFee(0.00000012)).toBe('0.00000012')
})