
import Elements from './Elements';
import {useState} from 'react';
import Leftpanel from './Leftpanel';
import Sidebar from './Sidebar'
import classes from './Sidepanel.module.css'
import Texts from './Texts';
import Splash from './Unsplash';
const Sidepanel = (props) => {
  const [visibleComponent, setVisibleComponent] = useState('sideBarId-text');
  const isAtBottom=props.isAtBottom
  //function passed as a prop to the child
  const handleVisibilityChange = (id) => {
    setVisibleComponent(id);
  };
    return (
      <div className={classes.wrapper}>
       <Sidebar onVisibilityChange={handleVisibilityChange} />
      <Leftpanel  >

        {visibleComponent === 'sideBarId-text' && <Texts />}
        {visibleComponent === 'sideBarId-elements' && <Elements />}
        {visibleComponent === 'sideBarId-unsplash' && <Splash isAtBottom={isAtBottom}/>}
      </Leftpanel>
    </div>
    );
  };
  export default Sidepanel;