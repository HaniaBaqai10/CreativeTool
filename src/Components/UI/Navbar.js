import classes from './Navbar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload,faUndo,faRedo, faCloudUpload,faAngleLeft } from '@fortawesome/free-solid-svg-icons'
const Navbar = () => {
  
  return (
    
      <div className={classes.navbar}>
        <div className={classes.items}>
          
            <a className={classes.item} href="http://localhost:3000/"><FontAwesomeIcon icon={faAngleLeft} height="1.3em"/></a>
            <a className={classes.item} href="http://localhost:3000/">Home</a>
            <a  className={classes.item} href="http://localhost:3000/">File</a>
            <a className={classes.item} href="http://localhost:3000/">Resize</a>
            <a className={classes.item} href="http://localhost:3000/" ><FontAwesomeIcon icon={faUndo} height="1.3em"/></a>
            <a className={classes.item} href="http://localhost:3000/"><FontAwesomeIcon icon={faRedo} height="1.3em"/></a>
            <a className={classes.item} href="http://localhost:3000/"><FontAwesomeIcon icon={faCloudUpload} height="1.3em"/></a>
        </div>
        <button className={classes.button}><FontAwesomeIcon icon={faUpload} height="1.3em"/><span style={{paddingLeft: '10px'}}>Share</span></button>
      </div>
    
  );
};
export default Navbar;
