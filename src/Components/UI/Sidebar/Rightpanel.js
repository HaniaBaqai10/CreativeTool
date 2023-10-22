import classes from "./Rightpanel.module.css";
import { useSelector } from "react-redux";
import { fabric } from "fabric";
import { useState, useEffect } from "react";
const RightPanel = () => {
  const canvasState = useSelector((state) => state.ui.canvas);
  function handleAlignments(value) {
    const activeObject = canvasState.getActiveObject();
    if (activeObject) {
      switch (value) {
        case "left": {
          activeObject.set("left", 0);
          canvasState.renderAll();
          break;
        }
        case "right": {
          activeObject.set(
            "left",
            canvasState.width - activeObject.getScaledWidth()
          );
          canvasState.renderAll();
          break;
        }
        case "top": {
          activeObject.set("top", 0);
          canvasState.renderAll();
          break;
        }
        case "bottom": {
          activeObject.set(
            "top",
            canvasState.height - activeObject.getScaledHeight()
          );
          canvasState.renderAll();
          break;
        }
        case "center": {
          activeObject.set(
            "left",
            canvasState.width / 2 - activeObject.getScaledWidth() / 2
          );
          activeObject.set(
            "top",
            canvasState.height / 2 - activeObject.getScaledHeight() / 2
          );
          canvasState.renderAll();
          break;
        }
        default: {
          break;
        }
      }
    }
  }
  const Alignment = [
    { id: "left", name: "Left" },
    { id: "right", name: "Right" },
    { id: "center", name: "Center" },
    { id: "top", name: "Top" },
    { id: "bottom", name: "Bottom" },
  ];
  var fonts = [
    {id:"f0",name:"Times New Roman"},
    {id:"f1", name:"Inconsolata"},
   {id:"f2", name:"Pacifico"},
    {id:"f3",name:"Quicksand"},
    {id:"f4",name:"Roboto"},
    {id:"f5",name:"Rancho"},
    {id:"f6",name:"Tangerine"},
    {id:"f7",name:"VT323"},
  ];
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [width, setWidth] = useState("0");
  const [height, setHeight] = useState("0");
  const [color, setColor] = useState("#808080");
  const [strokeColor, setStrokeColor] = useState("#808080");
  const [strokeWidth, setStrokeWidth] = useState("0.1");
  const [angle, setAngle] = useState(1);
  const [fontsOptions, setFontsOptions] = useState('Times New Roman');
  const [uniformStroke, setuniformStroke]=useState(false)
  const [horizontalMovement, sethorizontalMovement]=useState(true)
  const [verticalMovement, setVerticalMovement]=useState(true)
  const [horizontalScaling, setHorizontalScaling]=useState(true)
  const [verticalScaling, setVerticalScaling]=useState(true)
  const [rotation, setRotation]=useState(true)
  const [scalingFlip, setScalingFlip]=useState(true)
  useEffect(() => {
    const activeObject = canvasState.getActiveObject();
    // console.log(canvasState);
    if (activeObject) {
      setX(activeObject.left);
      setY(activeObject.top);
      setFontsOptions(activeObject.fontFamily)
      const newHeight = activeObject.height * activeObject.scaleY;
      const newWidth = activeObject.width * activeObject.scaleX;
      
      setHeight(newHeight);
      setWidth(newWidth);
      document.onkeydown = function (event) {
        const key = event.key;
        if (key === "Delete") {
          if (activeObject) {
            canvasState.remove(activeObject);
            canvasState.renderAll();
          }
        }
      };
    }

    canvasState.on("object:selected", handleSelectedObject);
    canvasState.on("selection:created", handleSelectedObject);
    canvasState.on("selection:updated", handleSelectedObject);
    canvasState.on("before:transform", handleSelectedObject);
    canvasState.on("mouse:dblclick", handleSelectedObject);
    canvasState.on("mouse:up", handleSelectedObject);
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
      canvasState.off("object:scaling", handleObjectSize);

      canvasState.off("object:moving", handleSelectedObject);

      canvasState.off("object:rotating", handleObjectRotation);
    };
  }, []);

  const handleFonts=(e)=>{
  
      canvasState.getActiveObject().set("fontFamily",e);
    canvasState.renderAll()
    setFontsOptions(e)
    }
  
  const handleObjectRotation = (event) => {
    const activeObject = event.target;
    updateAngle(activeObject);
  };

  const handleSelectedObject = (event) => {
   
    const activeObject = event.target;
    if (activeObject) {
      document.onkeydown = function (event) {
        const key = event.key;
        if (key === "Delete") {
          canvasState.remove(activeObject);
          canvasState.renderAll();
        }
      };
    }

  
    if (activeObject) {
      canvasState.renderAll();
      setX(activeObject.left);
      setY(activeObject.top);
      const newHeight = activeObject.height * activeObject.scaleY;
      const newWidth = activeObject.width * activeObject.scaleX;
      setColor(activeObject.fill);
      setStrokeColor(activeObject.stroke);
      setStrokeWidth(activeObject.strokeWidth);
      setHeight(newHeight);
      setFontsOptions(fontsOptions)
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
    const activeObject = canvasState.getActiveObject();
    const scaling = newHeight / activeObject.height;
    activeObject.scaleY = scaling;
    canvasState.renderAll();
    setHeight(newHeight);
  };

  const handleInputWidth = (value) => {
    const newWidth = parseInt(value);
    const activeObject = canvasState.getActiveObject();
    const scaling = newWidth / activeObject.width;
    activeObject.scaleX = scaling;
    canvasState.renderAll();
    setWidth(newWidth);
  };

  const handleColor = (value) => {
    const activeObject = canvasState.getActiveObject();
    console.log(canvasState.getActiveObject());
    activeObject.set("fill", value);

    canvasState.renderAll();
    setColor(value);
  };
  const handleStrokeWidth = (value) => {
    const newWidth = parseInt(value);
    const activeObject = canvasState.getActiveObject();
    activeObject.set("strokeWidth", newWidth);
    canvasState.renderAll();
    setStrokeWidth(value);
  };
 const handleUniformStroke =(value)=>{
   setuniformStroke(!uniformStroke)
   const activeObject = canvasState.getActiveObject();
   activeObject.set("strokeUniform", uniformStroke);
   canvasState.renderAll();
 }
  const handleStrokeColor = (value) => {
    const activeObject = canvasState.getActiveObject();
    activeObject.set("stroke", value);
    canvasState.renderAll();
    setStrokeColor(value);
  };

 const handleHorizontalMovement=()=>{
   sethorizontalMovement(!horizontalMovement)
   const activeObject = canvasState.getActiveObject();
   activeObject.set("lockMovementX", horizontalMovement);
   canvasState.renderAll();
 }
 const handleVerticalMovement=()=>{
   setVerticalMovement(!verticalMovement)
   const activeObject = canvasState.getActiveObject();
   activeObject.set("lockMovementY", verticalMovement);
   canvasState.renderAll();
 }
 const handleHorizontalScaling=()=>{
   setHorizontalScaling(!horizontalScaling)
   const activeObject = canvasState.getActiveObject();
   activeObject.set("lockScalingX", horizontalScaling);
   canvasState.renderAll();
 }
 const handleVerticalScaling=()=>{
   setVerticalScaling(!verticalScaling)
   const activeObject = canvasState.getActiveObject();
   activeObject.set("lockScalingY", verticalScaling);
   canvasState.renderAll();
 }
 const handleRotationLock=()=>{
   setRotation(!rotation)
   const activeObject = canvasState.getActiveObject();
   activeObject.set("lockRotation", rotation);
   canvasState.renderAll();
 }
 const handleScalingFlip=()=>{
   setScalingFlip(!scalingFlip)
   const activeObject = canvasState.getActiveObject();
   activeObject.set("lockScalingFlip", scalingFlip);
   canvasState.renderAll();
 }


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
        <label className={classes.heading}>Alignment</label>

        <div className={classes.Alignment}>
          {Alignment.map((item) => (
            <button
              className={classes.btn}
              id={item.id}
              onClick={() => handleAlignments(item.id)}
            >
              {item.name}
            </button>
          ))}
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
        <label className={classes.heading} htmlFor="color">
          Color
        </label>
        <div className={classes.input}>
          <div className={classes.color}>
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
              min="0"
              step="0.1"
              value={strokeWidth}
              onChange={(e) => {
                handleStrokeWidth(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="uniformStroke">uniform Stroke</label>
            <input
                type="checkbox"
                name="stroke-uniform"
                checked={uniformStroke}
                onChange={e=> {
                  handleUniformStroke(e.target.value);
                }}
                />
          </div>

        </div>
        <div>
          <button onClick={handleHorizontalMovement}>Lock Horizontal Movement </button>
          <button onClick={handleVerticalMovement}>Lock Vertical Movement </button>
          <button onClick={handleHorizontalScaling}>Lock Horizontal Scaling </button>
          <button onClick={handleVerticalScaling}>Lock Vertical Scaling </button>
          <button onClick={handleRotationLock}>Lock Rotation </button>
          <button onClick={handleScalingFlip}>Lock Scaling Flip </button>
        </div>

        <label className={classes.heading} htmlFor="rotate">
          Rotate
        </label>

        <div className={classes.input}>
          <div className={classes.color}>
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
        <label Htmlfor="fonts">Fonts:</label>
        <select value={fontsOptions} onChange={(e)=>handleFonts(e.target.value)} name="fonts" id="fonts">
          {fonts.map((item)=>(<option   id={item.id}>{item.name}</option>))}
          
        </select>
      </div>
    </>
  );
};
export default RightPanel;
