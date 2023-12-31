const Navbar = () => {
    return (
        <div className="row">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#"></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <a class="nav-item nav-link active" href="#">Dashboard<span class="sr-only"></span></a>
      <a class="nav-item nav-link" href="#">SignIn</a>
      <a class="nav-item nav-link" href="#">SignUp</a>
      {/* <a class="nav-item nav-link disabled" href="#">Disabled</a> */}
    </div>
  </div>
</nav>
        </div>
    )
  };
  
  export default Navbar;