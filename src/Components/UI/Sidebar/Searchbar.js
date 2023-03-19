import classes from './Searchbar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
const Searchbar=()=>{
    return (
    
        <div className={classes['search-container'] }>
            <button className={classes.search} type="submit"><i><FontAwesomeIcon icon={faSearch} height="2em"/></i></button>
            <input type="text" placeholder="Search.." name="search"></input>
           
            
        </div>
      
    );
}
export default Searchbar