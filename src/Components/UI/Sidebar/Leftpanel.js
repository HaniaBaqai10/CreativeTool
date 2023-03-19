import classes from "./Leftpanel.module.css";
import React, { useState,useRef } from 'react';

const Leftpanel = (props) => {
  const [isAtBottom, setIsAtBottom] = useState(false);
const containerRef = useRef(null);
function handleScroll() {
  const container = containerRef.current;
  if (!container) return;
  
  
  const scrollHeight = container.scrollHeight;
  const scrollTop = container.scrollTop;
  const clientHeight = container.clientHeight;
  const AtBottom = scrollTop + clientHeight === scrollHeight;
  setIsAtBottom(AtBottom);
  
}
return (
  <div className={classes.leftpanel} ref={containerRef} onScroll={handleScroll}>
    {React.Children.map(props.children, (child) => {
      if (!child) {
        return null;
      }
      return React.cloneElement(child, { isAtBottom: isAtBottom });
    })}
  </div>
);
};
export default Leftpanel;