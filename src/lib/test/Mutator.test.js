import Mutator from "../Mutator"
import Rect from "../Rect"
import GradientNumericLinear from "../GradientNumericLinear"

test('just clone ref object with empy mutator list', () => {

    const refRect = new Rect(0, 0, 100, 100)
    const mutator = new Mutator(refRect, 4, [])

    expect(mutator.objects.length).toBe(4)

});

test('mutate clones with given property', () => {

    const changeX = new GradientNumericLinear("x", 0, 300, 4)
    const refRect = new Rect(0, 0, 100, 100)
    const mutator = new Mutator(refRect, 4, [changeX])

    const xVals = mutator.objects.map(o=> o.x)
    const yVals = mutator.objects.map(o=> o.y)

    expect(xVals).toStrictEqual([0, 100, 200, 300])
    expect(yVals).toStrictEqual([0, 0, 0, 0])
});

