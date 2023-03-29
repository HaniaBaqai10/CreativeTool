import classes from './Searchbar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useRef,useEffect,useState } from 'react';
const Searchbar=({onInputsend})=>{
    const [userinput,setuserInput]=useState('')
   
    const inputRef=useRef();
    const focusInput = () => {
        inputRef.current.focus();
        
      };
     function sendInput(userinput){
        onInputsend(userinput);
     }
    
      
    
        
      
    return (
    
        <div className={classes['search-container'] }>
           
            <input ref={inputRef} value={userinput} type="text" placeholder="Search.." name="search" onChange={(e)=>{setuserInput(e.target.value);}} >
 </input>
            <button onClick={() => {sendInput(userinput); focusInput();}} className={classes.search} type="submit"><i><FontAwesomeIcon className={classes.searchbtn} icon={faSearch} height="2em"/></i></button>
            
        </div>
      
    );
}
export default Searchbar