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

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current);
    dispatch(uiActions.setCanvas(canvas));
    window.fabCanvas = canvas;
    console.log('window.fabCanvas', window.fabCanvas);

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
    <div className={classes['canvas-container']}>
      <canvas className={classes['center-canvas']} ref={canvasRef} width={500} height={500} />
    </div>
  );
};

export default CanvasComponent;
