import classes from './Texts.module.css';
import { fabric } from 'fabric';
import { useSelector } from 'react-redux';

import Searchbar from './Searchbar';

const Texts = () => {
  const canvas = useSelector((state) => state.ui.canvas);

  const addText = (textType) => {
    var Textbox = new fabric.Textbox('Enter text', {
      top: 70,
      left:70,
    });

    switch (textType) {
      case 'Heading': {
        Textbox.set({
          fontSize: 24,
          fontWeight: 600,
          
        });
        break;
      }
      case 'SubHeading': {
        Textbox.set({
          fontSize: 16,
          fontWeight: 400,
        });
        break;
      }
      case 'text': {
        Textbox.set({
          fontSize: 14,
          fontWeight: 100,
        });
        break;
      }
      default: {
        break;
      }
    }

    canvas.add(Textbox);
  };

  // function onDragStart(ev, textType) {
  //   ev.dataTransfer.setData('textType', textType);
  //   console.log(textType)
  // }

  // function onDragOver(ev) {
  //   ev.preventDefault();
  //   console.log(ev)
  // }

 
 
  return (
    <>
      <Searchbar />
      <div className={classes.buttonContainer}>
        {['Heading', 'SubHeading', 'text'].map((type) => (
          <button
            key={type}
            // draggable='true'
            // onDragStart={(e) => onDragStart(e, type)}
            // onDragOver={onDragOver}
           onClick={()=>addText(type)}
            className={`${classes[type.toLowerCase()]} ${classes.button}`}
          >
            {`Add a ${type.toLowerCase()}`}
          </button>
        ))}
      </div>
    </>
  );
};

export default Texts;
