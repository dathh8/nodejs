import { Outlet, Link } from "react-router-dom";
import './Header.css'

const Header = () => {
    return (
        <div class="header">
        <a href="#default" class="logo">CompanyLogo</a>
        <div class="header-right">
          <a class="active"><Link to="/">Home</Link></a>
          <a><Link to="/user">User</Link></a>
          <a><Link to="/login">Login</Link></a>
        
        </div>
      </div>
    )
}

export default Header;