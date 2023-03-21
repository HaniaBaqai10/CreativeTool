import classes from './Searchbar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
const Searchbar=()=>{
    return (
    
        <div className={classes['search-container'] }>
           
            <input type="text" placeholder="Search.." name="search">
 </input>
            <button className={classes.search} type="submit"><i><FontAwesomeIcon className={classes.searchbtn}icon={faSearch} height="2em"/></i></button>
            
        </div>
      
    );
}
export default Searchbar