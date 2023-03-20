import classes from './Options.module.css'
import { useSelector } from 'react-redux';
const Options=()=>{
    const canvasState = useSelector((state) => state.ui.canvas);

    function handleTopClick() {
      const activeObject = canvasState.getActiveObject();
      if (activeObject) {
        activeObject.set('top', 0);
        canvasState.renderAll();
      }
    }
    function handleLeftClick() {
        const activeObject = canvasState.getActiveObject();
        if (activeObject) {
          activeObject.set('left',0);
          canvasState.renderAll();
        }
      }
      function handleRightClick() {
        const activeObject = canvasState.getActiveObject();
        if (activeObject) {
          activeObject.set('left',canvasState.width-activeObject.getScaledWidth());
          canvasState.renderAll();
        }
      }
      function handleBottomClick() {
        const activeObject = canvasState.getActiveObject();
        if (activeObject) {
          activeObject.set('top',canvasState.width-activeObject.getScaledHeight() );
          canvasState.renderAll();
        }
      }
      function handleCenterClick() {
        const activeObject = canvasState.getActiveObject();
        if (activeObject) {
          activeObject.set('left', ((canvasState.width/2)-(activeObject.getScaledWidth())/2) );
          activeObject.set('top', ((canvasState.height/2)-(activeObject.getScaledHeight())/2) );
          canvasState.renderAll();
        }
      }
      const handleDeleteObject=()=>{
        const activeObject = canvasState.getActiveObject();
        if(activeObject){
            canvasState.remove(activeObject)
            canvasState.renderAll();
        }
      }

    return(
        <>
    <div className={classes.options}>
  <div className={classes.suboptions}>
    <button >Fonts
    </button>
    <div className={classes['dropdown-content']}>
      <button href="#">Link 1</button>
      <button href="#">Link 2</button>
      <button href="#">Link 3</button>
    </div>
  </div> 
  <input type="number" min="1" max="100" />
  <div className={classes.suboptions}>
    <button >Color
      
    </button>
    <div className={classes['dropdown-content']}>
      <button href="#">Link 1</button>
      <button href="#">Link 2</button>
      <button href="#">Link 3</button>
    </div>
  </div> 
  <button >Bold</button>
  <button onClick={handleDeleteObject}>Delete</button>
  
  <div className={classes.suboptions}>
    <button >Position
     
    </button>
    <div className={classes['dropdown-content']}>
      <button onClick={handleLeftClick}>Left</button>
      <button onClick={handleRightClick}>Right</button>
      <button onClick={handleTopClick}>Top</button>
      <button onClick={handleBottomClick}>Bottom</button>
      <button onClick={handleCenterClick}>Center</button>
    </div>
  </div> 
</div>

        </>
    )
}
export default Options;