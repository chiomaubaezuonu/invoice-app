function App() {
  return (
    <div>
      <div className="container">
        <div className="sidebar">
          <div className="logo-div">
            <img src="/images/logo.svg" className="logo" alt="" />
          </div>
          <div className="sidebar-content-div">
            <div className="moon-div">
              <img
                src="/images/icon-moon.svg"
                className="moon-img"
                alt="moon"
              />
            </div>
            <div className="user-div">
              <img src="/images/user.jpg" alt="user" className="user-img" />
            </div>
          </div>
        </div>
        <div className="main">
          <div className="main-navbar">
            <div>
              <h1>Invoices</h1>
              <p>There are 8 total invoices </p>
            </div>
            <div></div>
            <div></div>
            <button>New Invoice</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
