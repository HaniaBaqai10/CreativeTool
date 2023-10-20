import { fabric } from 'fabric'


class  customImage extends fabric.Group{
    constructor(options) {
        super();
        this.type="customFabricImage";
        this.customProperty = options.customProperty || null;

    }
    resize(width, height) {
        this.set({ width, height });
        this.setCoords();
    }
    setPosition(left, top) {
        this.set({left, top });
        this.setCoords();
    }
}
export const customImageObject= new customImage([],{
    height:80,
    width:80,
    selectable:true,
    originX: 'left',
    originY: 'top',
    customProperty:"tryingCustom"
})