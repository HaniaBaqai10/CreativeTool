import classes from "./Navbar.module.css";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
const Navbar = () => {
  const canvasState = useSelector((state) => state.ui.canvas);
  const handleExport=(type)=>{
    switch(type){
      case 'png':{
        var dataURL = canvasState.toDataURL({
          format: 'png',
          quality: 0.8
        });
        const link = document.createElement('a');
        link.href = dataURL;
      link.download = 'canvas.png';
     
      link.click();
      break;
      }
      case 'svg':{
        var svg = canvasState.toSVG();
        let url="data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
        const link = document.createElement('a');
        link.href = url;
      link.download = 'canvas.svg';
     
      link.click();
      break
      }
      default:{
        break;
      }
    }
  }


  return (
    <div className={classes.navbar}>
      <div className={classes.items}>
        <a className={classes.item} href="http://localhost:3000/">
          Home
        </a>
      </div>
      <div className={classes.dropdown}>
     
      <button className={classes.button} >
        <FontAwesomeIcon icon={faUpload} height="1.3em" />
        <span style={{ paddingLeft: "10px" }}>Export</span>
       
      </button>
      <div className={classes['dropdown-content']} >
{        <button onClick={()=>{handleExport('png')}} >PNG</button>

}      <button onClick={()=>{handleExport('svg')}} >SVG</button>
      </div>
    </div>
    </div>
  );
};
export default Navbar;
