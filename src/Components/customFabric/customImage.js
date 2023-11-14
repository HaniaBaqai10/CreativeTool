import { fabric } from 'fabric';

class CustomFabricImage extends fabric.Group {
    constructor(objects, options) {
        super(objects, options);
        this.type = 'customFabricImage';
        this.setupImage();
        this.setupControls();
    }

    setupImage() {
        this._objects.forEach((obj) => {
            obj.set({
                left: obj.left || 0,
                top: obj.top || 0,
                height: obj.height || 0,
                width: obj.width || 0,
                scaleX: obj.scaleX || 1,
                scaleY: obj.scaleY || 1,
            });
        });
        this.setCoords();
    }

    setupControls() {
        const objectControls = fabric.Object.prototype.controls;
        this.controls = { ...objectControls };
        const imageControls = this.controls;
        imageControls.mr = new fabric.Control({
            x: 0.5,
            y: 0,
            borderColor: 'red',
            cornerColor: 'green',
            cornerSize: 12,
            transparentCorners: false,
            hasRotatingPoint: false,
        });
        console.log(imageControls.mr);
    }

    // render(ctx) {
    //     super.render(ctx);
    //     if (this.size() > 0) {
    //         const img = this.item(0);
    //         if (img) {
    //             ctx.drawImage(img._element, -img.width / 2, -img.height / 2, img.width, img.height);
    //         }
    //     }
    // }
}

export default CustomFabricImage;