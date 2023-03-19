import classes from "./Rightpanel.module.css";
import { useSelector } from "react-redux";
import { fabric } from "fabric";
import { useState, useEffect } from "react";
const RightPanel = () => {
  const canvasState = useSelector((state) => state.ui.canvas);

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [color, setColor] = useState("#808080");
  const [strokeColor, setStrokeColor] = useState("#808080");
  const [strokeWidth, setStrokeWidth] = useState(1);
  const [angle, setAngle] = useState(1);

  useEffect(() => {
    const activeObject = canvasState.getActiveObject();
    console.log(canvasState)
    if (activeObject) {
     setX(activeObject.left)
     setY(activeObject.top)
     const newHeight = activeObject.height * activeObject.scaleY;
     const newWidth = activeObject.width * activeObject.scaleX;
     console.log(newHeight)
     setHeight(newHeight);
     setWidth(newWidth);
    
    }

    canvasState.on("object:selected", handleSelectedObject);
    canvasState.on("selection:created", handleSelectedObject);
    canvasState.on("selection:updated", handleSelectedObject);
    canvasState.on("before:transform", handleSelectedObject);
    canvasState.on("mouse:dblclick", handleSelectedObject);
    canvasState.on("mouse:up", handleSelectedObject);
    canvasState.on("after:render", handleSelectedObject);
    canvasState.on("object:moving", handleSelectedObject);
    canvasState.on("object:scaling", handleObjectSize);
    canvasState.on("object:rotating", handleObjectRotation);
    return () => {
    canvasState.off("object:selected", handleSelectedObject);
    canvasState.off("selection:created", handleSelectedObject);
    canvasState.off("before:transform", handleSelectedObject);
    canvasState.off("selection:updated", handleSelectedObject);
    canvasState.off("mouse:dblclick", handleSelectedObject);
    canvasState.off("mouse:up", handleSelectedObject);
    canvasState.off("after:render", handleSelectedObject);
    canvasState.off("object:scaling", handleObjectSize);
    
      canvasState.off("object:moving", handleSelectedObject);
      
      canvasState.off("object:rotating", handleObjectRotation);
    };
  }, []);

  const handleObjectRotation = (event) => {
    const activeObject = event.target;
    updateAngle(activeObject);
  };
const handleSelectedObject = (event) => {
    const activeObject = event.target;
    
    if (activeObject) {
        canvasState.renderAll();
      setX(activeObject.left);
      setY(activeObject.top);
      const newHeight = activeObject.height * activeObject.scaleY;
      const newWidth = activeObject.width * activeObject.scaleX;
      setColor(activeObject.fill)
      setStrokeColor(activeObject.stroke)
      setStrokeWidth(activeObject.strokeWidth)
      setHeight(newHeight);
      setWidth(newWidth);
      setAngle(activeObject.angle);
    }
   
  };
  const updateAngle = (object) => {
    if (object) {
      setAngle(object.angle);
      setX(object.left);
      setY(object.top);
    }
  
  };
  const handleRotation = (value) => {
    const activeObject = canvasState.getActiveObject();

    activeObject.angle = parseInt(value);
    canvasState.renderAll();
    setAngle(value);
    setX(activeObject.left);
      setY(activeObject.top);
  };
  const handleInputX = (value) => {
    const activeObject = canvasState.getActiveObject();

    activeObject.left = parseInt(value);
    canvasState.renderAll();
    setX(activeObject.left);
   
  };
  const handleInputY = (value) => {
    const activeObject = canvasState.getActiveObject();
    activeObject.top = parseInt(value);
    canvasState.renderAll();
    setY(activeObject.top);
  };

  const handleObjectSize = (event) => {
    handleSelectedObject(event);
    const activeObject = event.target;
    if (activeObject) {
      const newHeight = activeObject.height * activeObject.scaleY;
      const newWidth = activeObject.width * activeObject.scaleX;
      setHeight(newHeight);
      setWidth(newWidth);
      canvasState.renderAll();
    }
  };


  const handleInputHeight = (value) => {
    const newHeight = parseInt(value);
    setHeight(newHeight);
    const activeObject = canvasState.getActiveObject();
    activeObject.scaleToHeight(newHeight);
    canvasState.renderAll();
  };

  const handleInputWidth = (value) => {
    const newWidth = parseInt(value);
    setWidth(newWidth);
    const activeObject = canvasState.getActiveObject();
    activeObject.scaleToWidth(newWidth);
    canvasState.renderAll();
  };

  const handleColor = (value) => {
    // console.log(value);
    const activeObject = canvasState.getActiveObject();
    console.log(canvasState.getActiveObject());
    activeObject.set("fill", value);
    // console.log(activeObject)
    canvasState.renderAll();
    setColor(value);
  };
  const handleStrokeWidth = (value) => {
    const activeObject = canvasState.getActiveObject();
    activeObject.set("strokeWidth", value);
    canvasState.renderAll();
    setStrokeWidth(value);
  };
  const handleStrokeColor = (value) => {
    const activeObject = canvasState.getActiveObject();
    activeObject.set("stroke", value);
    canvasState.renderAll();
    setStrokeColor(value);
  };

  return (
    <>
      <div className={classes.rightPanel}>
        <label className={classes.heading} htmlFor="position">
          Position
        </label>

        <div className={classes.input}>
          <div>
            <label htmlFor="xaxis">X</label>
            <input
              id="xaxis"
              type="number"
              value={x}
              onChange={(e) => {
                handleInputX(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="yaxis">Y</label>
            <input
              id="yaxis"
              type="number"
              value={y}
              onChange={(e) => {
                handleInputY(e.target.value);
              }}
            />
          </div>
        </div>

        <label className={classes.heading} htmlFor="Size">
          Size
        </label>

        <div className={classes.input}>
          <div>
            <label htmlFor="height">Height</label>
            <input
              id="height"
              type="number"
              value={height}
              onChange={(e) => {
                handleInputHeight(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="width">Width</label>
            <input
              id="width"
              type="number"
              value={width}
              onChange={(e) => {
                handleInputWidth(e.target.value);
              }}
            />
          </div>
        </div>
         <div className={classes.input}>
          <div>
            <label htmlFor="color">Color</label>
            <input
              id="color"
              type="color"
              value={color}
              onChange={(e) => {
                handleColor(e.target.value);
              }}
            />
          </div>
        </div>

       <label className={classes.heading} htmlFor="Stroke">
          Stroke
        </label>

        <div className={classes.input}>
          <div>
            <label htmlFor="strokeColor">Stroke Color</label>
            <input
              id="strokeColor"
              type="color"
              value={strokeColor}
              onChange={(e) => {
                handleStrokeColor(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="strokeWidth">Stroke Width</label>
            <input
              id="strokeWidth"
              type="number"
              value={strokeWidth}
              onChange={(e) => {
                handleStrokeWidth(e.target.value);
              }}
            />
          </div>
        </div>
        <div className={classes.input}>
          <div>
            <label htmlFor="rotate">Rotate</label>
            <input
              id="rotate"
              type="number"
              value={angle}
              onChange={(e) => {
                handleRotation(e.target.value);
              }}
            />
          </div>
        </div> 
      </div>
    </>
  );
};
export default RightPanel;
