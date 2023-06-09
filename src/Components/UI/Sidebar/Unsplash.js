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
  const [userinput,setuserInput]=useState('')
  const [loading,setLoading]=useState(true)
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
      <Searchbar onInputsend={handleInput}/>
  {imageList.length === 0 ? (
  <p>No results found.</p>
) : (   <div className={classes.images}>
   
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
</div>)}

    </div>
  );
};

export default Splash;
