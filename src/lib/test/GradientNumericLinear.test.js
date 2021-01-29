import GradientNumericLinear from "../GradientNumericLinear"


test('create a basic linear numeric gradient', () => {

    const mutator = new GradientNumericLinear("x", 0, 100, 2)

    expect(mutator.getValueForIndex(0)).toBe(0)
    expect(mutator.getValueForIndex(1)).toBe(100)

});

test('create a basic linear numeric gradient with 3 values', () => {

    const mutator = new GradientNumericLinear("x", 0, 120, 3)

    expect(mutator.getValueForIndex(0)).toBe(0)
    expect(mutator.getValueForIndex(1)).toBe(60)
    expect(mutator.getValueForIndex(2)).toBe(120)

});