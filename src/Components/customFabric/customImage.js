import { fabric } from 'fabric';

class CustomFabricImage extends fabric.Group {
    constructor(canvas,objects) {
        console.log(canvas)
        super(objects);
        this.canvas=canvas
        this.type = 'customFabricImage';
        this.setupImage();
        this.setupControls();
        this.addBorder();
        this.handleScaling = this.handleScaling.bind(this);

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


    handleScaling(e, target) {
        const pointer = this.canvas.getPointer(e);
        const scaleX = (pointer.x - target.left) / target.width;
        const scaleY = (pointer.y - target.top) / target.height;

        this._objects.forEach((obj) => {
            const newLeft = obj.left * scaleX;
            const newTop = obj.top * scaleY;
            const newWidth = obj.width * scaleX;
            const newHeight = obj.height * scaleY;

            obj.set({
                left: newLeft,
                top: newTop,
                width: newWidth,
                height: newHeight,
            });
        });
        this.setCoords();
        this.canvas.requestRenderAll();
    }

    addBorder() {
        const newCtx = this.canvas.contextContainer;
        const img = newCtx.getImageData(0, 0, newCtx.canvas.width - 1, newCtx.canvas.height - 1);
        const opaqueAlpha = 255;

        for (let i = img.data.length; i > 0; i -= 4) {
            if (img.data[i + 3] > 0) {
                img.data[i + 3] = opaqueAlpha;
            }
        }
        newCtx.putImageData(img, 0, 0);
    }
    setupControls() {
        const objectControls = fabric.Object.prototype.controls;
        this.controls = { ...objectControls };
        const imageControls = this.controls;
        const scaleStyleHandler = fabric.controlsUtils.scaleCursorStyleHandler;

        imageControls.mr = new fabric.Control({
            x: 0.5,
            y: 0,
            borderColor: 'red',
            cornerColor: 'green',
            cornerSize: 102,
            cursorStyleHandler: scaleStyleHandler,
            transparentCorners: false,
            actionHandler: (e, target) => this.handleScaling(e, target),

    });
        console.log(imageControls.mr);
    }
}

export default CustomFabricImage;