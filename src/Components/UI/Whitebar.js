import classes from './Whitebar.module.css'
const Whitebar=(props)=>{

    return(
        <div className={classes.box}>
           {props.children}
        </div>
    )
}
export default Whitebar;