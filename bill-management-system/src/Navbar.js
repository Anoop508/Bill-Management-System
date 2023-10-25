import { Link } from "react-router-dom";
const Navbar = () =>{
    return(
        <div className="nav">
            <Link to="/addProduct">AddProduct</Link>
            <Link to="/Registration">Registration</Link>
            <Link to="/showproduct">Product List</Link>
        </div>
    )
}
export default Navbar;