import classes from './Elements.module.css'
import Searchbar from './Searchbar';
import { fabric } from 'fabric'

import { useSelector } from "react-redux";
const Elements = () => {
  const canvas = useSelector((state) =>  state.ui.canvas)
  const elementslist=['Arrow','Line','Circle','Heart','Gradient','Square','Shadow'];
  const shapes=[
  {
    id:'square',
    source:require('../../../assets/square.svg').default,
    alt:'square'
  },
  {
    id:'circle',
    source:require('../../../assets/circle.svg').default,
    alt:'circle'
  },
  {
    id:'triangle',
    source:require('../../../assets/triangle.svg').default,
    alt:'triangle'
  },
  {
    id:'dotted-line',
    source:require('../../../assets/dottedline.svg').default,
    alt:'dotted-line'
  },
  {
    id:'blue-curve',
    source:require('../../../assets/curvedline.svg').default,
    alt:'blue-curve'
  },
  {
    id:'rounded-square',
    source:require('../../../assets/roundedsquare.svg').default,
    alt:'rounded-square'
  },
  {
    id:'rectangle',
    source:require('../../../assets/rectangle.svg').default,
    alt:'rectangle'
  },
  {
    id:'line',
    source:require('../../../assets/line.svg').default,
    alt:'line'
  },

]

const addShapes=(source)=>{
  fabric.loadSVGFromURL(source, function(objects, options) {
    var svg = fabric.util.groupSVGElements(objects, options);
    canvas.add(svg);
  });
}

  return (
    <div>   
      <Searchbar/>
         <div className={classes['scroll-container']}>
      <div className={classes['scroll-items']}>
        {elementslist.map((item)=>(
              <div  className={classes['scroll-items']}>{item}</div>
        ))}
        </div>
        
        </div>
        <div className={classes.shapes}>           
           <div className={classes['shape-row']}>
            <div className={classes['shape-container']}>
           {shapes.map((items)=>( <img onClick={()=>addShapes(items.source)} key={items.id} src={items.source} alt={items.alt}/>))}
            </div>
          </div>
          </div>
      </div>


  
  );
};

export default Elements;
