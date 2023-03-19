
import { useState } from "react";
import classes from "./Sidebar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThLarge, faTextWidth, faImage } from "@fortawesome/free-solid-svg-icons";


const Sidebar = ({ onVisibilityChange }) => {
  const [activeId, setActiveId] = useState(""); 

  const StateHandler = (id) => {
    setActiveId(id); 
    onVisibilityChange(id); 
  };

  const SidebarItems = [
    {
      id: "sideBarId-text",
      name: "Text",
      Icon: faTextWidth,
    },
    {
      id: "sideBarId-elements",
      name: "Elements",
      Icon: faThLarge,
    },
    {
      id: "sideBarId-unsplash",
      name: "Unsplash",
      Icon: faImage,
    },
  ];

  return (
    <div className={classes.sidebar}>
      <div className={classes.items}>
        {SidebarItems.map((item) => (
          <button
            key={item.id}
            className={`${classes.item} ${
              activeId === item.id ? classes.active : ""  }`}
            onClick={() => StateHandler(item.id)}
          >
            <FontAwesomeIcon icon={item.Icon} height="2em" />
            <p>{item.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
