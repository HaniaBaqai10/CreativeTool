import { fabric } from 'fabric'


class customFabricImage extends fabric.Group {
    constructor(objects, options) {
        super(objects, options);
        this.type = 'customFabricImage';
        this.setupImage();
    }

    setupImage() {
        this._objects.forEach((obj) => {

            obj.set({
                left: obj.left,
                top: obj.top,
                height:obj.height,
                width:obj.width,
                scaleX:obj.scaleX,
                scaleY:obj.scaleY
            });
        });
        this.setCoords();
    }
    _render(ctx) {
        super._render(ctx);
        if (this.size() > 0) {
            const img = this.item(0);
            ctx.drawImage(this.image._element, -img.width / 2, -img.height / 2, img.width, img.height);
            }
    }
}

export default customFabricImage;
