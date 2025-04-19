import nasdaqLogo from '../assets/images/Nasdaq-Logo.png';
import loadingGif from '../assets/images/loading.gif';

const SplashScreen = () => {
  return (
    <div className="width-[100vw] h-[100vh] flex justify-center items-center flex-col bg-white">
      <img
        className=" rounded-md100 p-2 h-20"
        src={nasdaqLogo}
        alt="nasdaq"
      />

      <img
        className=" rounded-md100 p-2 h-20"
        src={loadingGif}
        alt="nasdaq"
      />

      <h3>Ahmed Samir</h3>
    </div>
  );
};

export default SplashScreen;