import Searchbar from "./Searchbar";
import classes from "./Unsplash.module.css";
import { useState, useEffect } from "react";
import { fabric } from 'fabric'

import { useSelector } from "react-redux";

const Splash = (props) => {

  const canvas = useSelector((state) =>  state.ui.canvas)
 
  const [imageList, setImageList] = useState([]);
  const [page,setPage]=useState(1)
  const isAtBottom=props.isAtBottom
 
  const [loading,setLoading]=useState(true)

useEffect(() => {
  setLoading(true);
  fetch(
    `https://api.unsplash.com/photos/?page=${page}&client_id=eVGMjRH6CvD-A0PfeLxDSCZgc6D35jze83T_UK1407A`
  )
    .then((response) => response.json())
    .then((data) => {
      const urls = data.map((item) => item.urls.small);
      setImageList((prevState) => [...prevState, ...urls]);
      setLoading(false);
    })
    .catch((error) => console.log(error));
}, [page]);

const addImage = (url) => {
  fabric.Image.fromURL(url, function (image) {
    canvas.add(image);
   
  },{crossOrigin: "Anonymous"});
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
      <Searchbar />
     <div className={classes.images}>
   
    <div className={classes["images-row"]}>
      <div  className={classes["images-container"]}>
        {imageList.map((url, index) => (
          <img  onClick={()=>addImage(url)}src={url} key={index} alt="unsplashImage" />
        ))}
      </div>
    </div>
    {loading ? (
    <p>Loading...</p>
  ) :<></>
}
</div>

    </div>
  );
};

export default Splash;
