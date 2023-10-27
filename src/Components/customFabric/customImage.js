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
    setOrigin(OriginX, OriginY) {
        this.set({OriginX, OriginY });
        this.setCoords();
    }

    _render(ctx) {
        if (this._element) {
            ctx.drawImage(this._element, 0, 0, this.width, this.height);
            ctx.beginPath();
            ctx.moveTo(30, 96);
            ctx.lineTo(70, 66);
            ctx.lineTo(103, 76);
            ctx.lineTo(170, 15);
            ctx.stroke();
        }
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