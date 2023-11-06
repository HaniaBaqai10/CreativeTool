import { fabric } from 'fabric'


class customFabricImage extends fabric.Group {
    constructor(image,options) {
        super(options);
        this.type = 'customFabricImage';

        if (options && options.image) {
            this.initialize(options.image, options);
        }
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
