import classes from "./Navbar.module.css";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload,faShare } from "@fortawesome/free-solid-svg-icons";
import { FacebookShareButton, FacebookIcon } from 'react-share';

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
      <div style={{display:"flex"}}>

      <div className={classes.dropdown}>
          <div>
              <ShareOnFacebook url="ngrok.com/early-access" title="Your Title"
                               image="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Bachelor%27s_button%2C_Basket_flower%2C_Boutonniere_flower%2C_Cornflower_-_3.jpg/1200px-Bachelor%27s_button%2C_Basket_flower%2C_Boutonniere_flower%2C_Cornflower_-_3.jpg" />
          </div>
      <div className={classes['dropdown-content']} >
{        <button onClick={()=>{handleExport('png')}} >PNG</button>

}      <button onClick={()=>{handleExport('svg')}} >SVG</button>
      </div>
      </div>
      <button className={classes.button} >
        <FontAwesomeIcon icon={faShare} height="1.3em" />
        <span style={{ paddingLeft: "10px" }}>Share</span>

      </button>
      </div>

    </div>
  );
};
export default Navbar;


export const ShareOnFacebook = ({ url, title, image }) => {
  return (
      <FacebookShareButton url={url} quote={title} hashtag="#YourHashtag">
        <FacebookIcon size={32} round />
      </FacebookShareButton>
  );
};

