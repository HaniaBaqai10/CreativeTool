//
// import {fabric} from 'fabric';
// import {useSelector} from "react-redux";
// const controlsUtils = fabric.controlsUtils;
// fabric.CustomFabricImage = CustomFabricImage
// const canvas = useSelector((state) =>  state.ui.canvas)
//
// if(fabric.CustomFabricImage) {
//
//     const scaleStyleHandler = fabric.controlsUtils.scaleCursorStyleHandler;
//     const objectControls = fabric.Object.prototype.controls;
//     fabric.CustomFabricImage.prototype.controls = { ...objectControls };
//     const imageControls = fabric.CustomFabricImage.prototype.controls;
//     imageControls.mr = new fabric.Control({
//         x: 0.5,
//         y: 0,
//         borderColor: 'red',
//         cornerColor: 'green',
//         cornerSize: 12,
//         transparentCorners: false,
//         hasRotatingPoint: false,
//     });
//     console.log(imageControls.mr);
// }
