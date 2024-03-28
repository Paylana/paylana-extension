function sub(a: number, b: number) {
    return a - b
  }
  
  test('adds 1 - 2 to equal 3', () => {
    expect(sub(1, 2)).toBe(3)
  })
  