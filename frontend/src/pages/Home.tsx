// Components
import Navbar from "../components/layout/Navbar";

function Home() {
  const redirect = () => {
    window && window.location.replace("signin");
  };

  redirect();

  return (
    <div>
      <Navbar />
      <h1>Home Page</h1>
      <br />
      <p>Lorem ipsum dolor sit amet</p>
    </div>
  );
}

export default Home;
