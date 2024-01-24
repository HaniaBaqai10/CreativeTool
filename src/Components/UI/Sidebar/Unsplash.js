import Searchbar from "./Searchbar";
import classes from "./Unsplash.module.css";
import { useState, useEffect } from "react";
import { fabric } from 'fabric'

import { useSelector } from "react-redux";
import customFabricImage from "../../customFabric/customImage";

const Splash = (props) => {

  const canvas = useSelector((state) =>  state.ui.canvas)

  const [imageList, setImageList] = useState([]);
  const [page,setPage]=useState(1)
  const isAtBottom=props.isAtBottom
  const [userinput,setuserInput]=useState('')
  const [loading,setLoading]=useState(true)
  const imageUrl= 'https://images.rawpixel.com/image_png_600/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTEwL3JtNTg2LWZyb3duaW5nZmFjZS0wM18zLWw5ZDNieHByLnBuZw.png'

  const handleInput=(userinput)=>{
setuserInput(userinput)
setPage(1);
setImageList([]);
console.log(userinput)
}

useEffect(() => {
  setLoading(true);
  let url
  if (userinput === "") {

    url = `https://api.unsplash.com/photos/?page=${page}&client_id=eVGMjRH6CvD-A0PfeLxDSCZgc6D35jze83T_UK1407A`;
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const urls = data.map((item) => item.urls.regular);
      setImageList((prevState) => [...prevState, ...urls]);
      setLoading(false);
    })
    .catch((error) => console.log(error));
  }
  else {
    url = `https://api.unsplash.com/search/photos?page=${page}&query=${userinput}&client_id=eVGMjRH6CvD-A0PfeLxDSCZgc6D35jze83T_UK1407A`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const urls = data.results.map((item) => item.urls.regular);
      setImageList((prevState) => [...prevState, ...urls]);
      setLoading(false);
    })
    .catch((error) => console.log(error));
  }
}, [page,userinput]);


  const addImage = (url) => {
    fabric.Image.fromURL(url, function (img) {
      img.crossOrigin = "anonymous";
      const newWidth = 200;
      const newHeight = 200;
      const scaleX = newWidth / img.width;
      const scaleY = newHeight / img.height;
      const minScale = Math.min(scaleX, scaleY);

      img.set('left', 0);
      img.set('top', 0);
      img.set('width', img.width);
      img.set('height', img.height);
      img.set('scaleX', minScale);
      img.set('scaleY', minScale);
      const customImg = new customFabricImage(canvas,[img]);
      canvas.add(customImg);
      canvas.renderAll();
    });
  };
  const addNewImage = (url) => {
    const newImage = new Image();
    newImage.src = url;

    newImage.onload = () => {
      const left = 50;
      const top = 50;
      const width = 200;
      const height = 150;
      const borderWidth = 0.001;

      newImage.crossOrigin = "anonymous";

      const mainCanvasCtx = canvas.getContext('2d');
      mainCanvasCtx.shadowColor = '#0f0';
      mainCanvasCtx.shadowBlur = 10;
      mainCanvasCtx.shadowOffsetX = 0;
      mainCanvasCtx.shadowOffsetY = 0;

      mainCanvasCtx.drawImage(newImage, left, top, width, height);

      var img = mainCanvasCtx.getImageData(0,0, mainCanvasCtx.canvas.width - 1, mainCanvasCtx.canvas.height - 1);
      var opaqueAlpha = 255;

      for (var i = img.data.length; i > 0; i -= 4) {
        if (img.data[i+3] > 0) {
          img.data[i+3] = opaqueAlpha;
        }
      }
      mainCanvasCtx.putImageData(img, 0, 0);
    };
  };

useEffect(() => {
  try{
    if(isAtBottom){
      setPage(Prev=>Prev+1)
    }
  }catch(error){
    console.log(error)
  }
}, [isAtBottom]);

  return (
    <div>
      <Searchbar onInputsend={handleInput}/>
  {imageList.length === 0 ? (
  <p>No results found.</p>
) : (   <div className={classes.images}>

    <div className={classes["images-row"]}>
      <div  className={classes["images-container"]}>
        <img  onClick={()=>addNewImage(imageUrl)}src={imageUrl} alt="Image" />
        {imageList.map((url, index) => (
          <img  onClick={()=>addNewImage(url)}src={url} key={index} alt="unsplashImage" />
        ))}
      </div>
    </div>
    {loading ? (
    <p>Loading...</p>
  ) :<></>
}
</div>)}

    </div>
  );
};

export default Splash;
