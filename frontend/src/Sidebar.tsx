import { useGlobalContext } from "./globalContext";

const Sidebar = () => {
  const { theme, toggleTheme } = useGlobalContext();
  return (
    // <div>
      <div className="sidebar">
        <div className="logo-div">
          <img src="/images/logo.svg" className="logo" alt="" />
        </div>
        <div className="sidebar-content-div">
          <div className="moon-div">
            {theme ? (
              <img
                src="/images/icon-moon.svg"
                className="moon-img"
                alt="moon"
                onClick={() => toggleTheme()}
              />
            ) : (
              <img
                src="/images/icon-sun.svg"
                className="sun-img"
                alt="sun"
                onClick={() => toggleTheme()}
              />
            )}
          </div>
          <div className="user-div">
            <img src="/images/user.jpg" alt="user" className="user-img" />
          </div>
        </div>
      </div>
    // </div>
  );
};

export default Sidebar;
