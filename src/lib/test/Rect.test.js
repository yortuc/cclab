import Rect from "../Rect"

test('render a basic rectangle', () => {

    const rect = new Rect(0, 0, 100, 100, 0)
    const sdlFromRect = rect.sdl()

    expect(sdlFromRect.w).toEqual(100)

});
