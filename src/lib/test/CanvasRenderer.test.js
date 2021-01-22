import CanvasRenderer from "../CanvasRenderer"

const ctxMock = () => ({
    save: jest.fn(),
    beginPath: jest.fn(),
    translate: jest.fn(),
    arc: jest.fn(),
    fill: jest.fn(),
    rotate: jest.fn(),
    fillRect: jest.fn(),
    restore: jest.fn()
})


test('render a rect', () => {

    const mockedCtx = ctxMock()
    const c = new CanvasRenderer(mockedCtx, 800, 600)

    c.drawRect({
        name: "rect",
        x: 120, y: 200, w: 80, h: 90, 
        angle: 12, opacity: 0.8, color: [10, 20, 30]
    })

    // first translate of CanvasRenderer is for anti-aliasing
    expect(mockedCtx.translate.mock.calls[0]).toEqual([0.5, 0.5])
    
    // translate to rect x,y
    expect(mockedCtx.translate.mock.calls[1]).toEqual([120, 200])
    
    // fill the actual rectangle
    expect(mockedCtx.fillRect.mock.calls[0]).toEqual([0, 0, 80, 90])
});


test('render a group', () => {

    const mockedCtx = ctxMock()
    const c = new CanvasRenderer(mockedCtx, 800, 600, true)

    c.drawGroup({
        name: "group",
        x: 144, y: 256, 
        angle: 34,
        objects: [],
        rotationPoint: [-100, 50],
        color: [0,0,0],
        opacity: 0.9
    })
    
    // first translate of CanvasRenderer is for anti-aliasing
    expect(mockedCtx.translate.mock.calls[0]).toEqual([0.5, 0.5])
    
    // save the context in required places
    expect(mockedCtx.save.mock.calls.length).toBe(4)
    
    // translate to group anchor point
    expect(mockedCtx.translate.mock.calls[1]).toEqual([144, 256])
    
    // translate to group rotation point
    expect(mockedCtx.translate.mock.calls[2]).toEqual([-100, 50])

    // rotate group
    expect(mockedCtx.rotate.mock.calls[0][0]).toBe(34 * Math.PI/180.0)

    // go back to origin
    expect(mockedCtx.translate.mock.calls[3]).toEqual([100, -50])
});
