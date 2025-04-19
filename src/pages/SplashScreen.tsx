const SplashScreen = () => {
  return (
    <div className="width-[100vw] h-[100vh] flex justify-center items-center flex-col bg-white">
      <img
        className=" rounded-md100 p-2 h-20"
        src="/src/assets/images/Nasdaq-Logo.png"
        alt="nasdaq"
      />

      <img
        className=" rounded-md100 p-2 h-20"
        src="/src/assets/images/loading.gif"
        alt="nasdaq"
      />

      <h3>Ahmed Samir</h3>
    </div>
  );
};

export default SplashScreen;
