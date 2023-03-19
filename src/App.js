import Navbar from "./Components/UI/Navbar";
import Whitebar from "./Components/UI/Whitebar";
import Sidepanel from './Components/UI/Sidebar/Sidepanel'
import CanvasComponent from "./Components/UI/Canvas";
import { useSelector } from 'react-redux';
import Options from "./Components/UI/Sidebar/Options";
import RightPanel from "./Components/UI/Sidebar/Rightpanel";
function App() {
  
  const showOptions=useSelector(state=>state.ui.optionsIsVisible)
  
  return (
    <div>
      <Navbar></Navbar>
      <Whitebar>
    
      {showOptions && <Options/>}
      <Sidepanel></Sidepanel>
     { showOptions &&  <RightPanel/>}
      </Whitebar>
    
      <CanvasComponent></CanvasComponent>
    </div>
  );
}

export default App;
