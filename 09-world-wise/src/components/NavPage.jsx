import { NavLink } from "react-router-dom";

function NavPage() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/products">Products</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavPage;
