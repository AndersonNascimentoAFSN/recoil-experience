import { Link, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div>
      <h1>Estudo React Recoil</h1>

      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/recoilAsync">Recoil Async</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
}
