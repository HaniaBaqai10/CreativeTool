import React, { useEffect, useRef } from 'react';
import classes from './Canvas.module.css';
import { fabric } from 'fabric';

import uiSlice, { uiActions } from '../../store/ui-slice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const CanvasComponent = () => {
  const canvasRef = useRef(null);
  const dispatch = useDispatch();
  const canvasState = useSelector((state) => state.ui.canvas);

  // function onDrop({ e }) {
  //   e.preventDefault();
  //   const textType = e.dataTransfer.getData('textType');

  //   const { clientX, clientY } = e;
  //   const position = {
  //     x: clientX,
  //     y: clientY,
  //   };
  //   console.log(position);
  //   // addText(textType, position);
  // }
  // useEffect(()=>{
  
  // },[])

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current,{
      backgroundColor:'white',
      border:'black'
      
    });
    
    dispatch(uiActions.setCanvas(canvas));
   
    window.fabCanvas = canvas;
    console.log('window.fabCanvas', window.fabCanvas);
    customizeFabric(canvas);
    canvas.on('selection:created', () => {
     
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
            dispatch(uiActions.toggleOptions({ optionsIsVisible: true }));
        } 
       
       
      });
    canvas.on('selection:cleared', () => {
        const activeObject = canvas.getActiveObject();
        if (!activeObject) {
            dispatch(uiActions.toggleOptions({ optionsIsVisible: false}));
        } 
       
      });
      console.log("canvas", canvas);
      canvas.on("object:scaled", (o)=>{

        console.log("object:scaled",o);
      })

    return () => {
      canvas.dispose();
    };
  }, [dispatch]);

  // useEffect(() => {
  //   if (!canvasState) return;

  //   canvasState.on('drop', onDrop);

  //   return () => {
  //     canvasState.off('drop', onDrop);
  //   };
  // }, [canvasState]);

  return (
    <div className={classes['canvas-container']} style={{ position: 'relative', top: '20px' }}>
      <canvas ref={canvasRef} width={500} height={400} setTop={30} />
    </div>
  );
};

export default CanvasComponent;


const customizeFabric = (canvasState)=>{


  fabric.CustomObject = fabric.util.createClass(fabric.Group, {
    type: "customObject",
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    fill: "#000000",
    textObj: null,
    rectObj: null,
    originX: "center",
 
    originY: "center",
    
    objectCaching: false,
    // noScaleCache: true,
    lockScalingFlip: true,
    cacheProperties: fabric.Text.prototype.cacheProperties.concat(),
    
    initialize: function (options) {
      this.set(options);
      this.rectObj = new fabric.Rect({
        top: 10,
        left: 10,
        width: 100,
        height: 50,
        fill: "#ff0000"
      });

      this.textObj = new fabric.Textbox("text", {
      
        top: 10,
        left: 10,
      });

      this._objects = [this.rectObj, this.textObj];
      this._calcBounds();
    this._updateObjectsCoords();
      this._setCustomProperties(options);
      // this.canvas = canvasState;
      // this.canvas.renderAll();

    //  this.on("scaled", (e) => {
    //   // console.log(e)
    //   // console.log(e.transform.scaleY)
    //   // console.log(e.transform.target.height)

    //   // const newheight=e.transform.target.height*e.transform.scaleY
    //   // console.log(newheight)

    //   //event will fire if this custom object is scaled
    //   });
      this.on("scaling", (e) => {
        console.log("scaling")
        //event will fire if this custom object is scaling
        // this.scaleY=1
        // this.scaleX=1
        // console.log(e.transform.scaleX)
        // console.log(this.scaleX)
        // console.log(e.transform.target.height)
        // const newheight=e.transform.target.height*e.transform.scaleY
        // const newWidth=e.transform.target.width*e.transform.scaleX
        // this.set('width', newWidth);
        // this.set('height', newheight);
        // this.set('scaleX', 1);
        // this.set('scaleY', 1);
        const newheight=e.transform.target.height*this.scaleY
        const newWidth=e.transform.target.width*this.scaleX
        
        // const newobjectwidth=this.width*this.scaleX
        this.set('width', newWidth);
        this.set('height', newheight);
        this.set('scaleX', 1);
        this.set('scaleY', 1);
        // console.log(e.transform.target.height)
        // this._updateObjectsCoords()
        // console.log(newheight)
       
      });
      // this.on("scaled", (e) => {
        
      //   // console.log(e.transform.target.height)
      //   const newheight=this.height*this.scaleY
      //   const newWidth=this.width*this.scaleX
      //   this.set('width', newWidth);
      //   this.set('height', newheight);
      //   console.log(newheight)
       
      // }); 
    },
    
    _setCustomProperties(options) {
      let text = this.textObj;
      text.set({
        fill: options.fill,
      });
    },

    toObject: function (propertiesToInclude) {
      var obj = this.callSuper(
        "toObject",
        [
          "objectCaching",
        ].concat(propertiesToInclude)
      );

      delete obj.objects;
      return obj;
    },
    _render: function (ctx) {
    this.callSuper('_render', ctx);
  }
    
  });

  fabric.CustomObject.fromObject = function (object, callback) {
    // This function is used for deserialize json and convert object json into button object again. (called when we call loadFromJson() fucntion on canvas)
    return fabric.Object._fromObject("CustomObject", object, callback);
  };

  fabric.CustomObject.async = true;
  
  var customObj = new fabric.CustomObject({
    fill: "#00ff00",
     left: 20,
    top: 20,
    width:100,
    height:100
  });
  canvasState.add(customObj);
 

}