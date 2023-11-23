const Banner = () => {
  return (
    <div>
      <div
        className="hero h-[50vh] md:h-[80vh]"
        style={{
          backgroundImage:
            "url(https://i.ibb.co/n0sSsbt/drinks-8316514-1280.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60 h-[50vh] md:h-[80vh]"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 md:text-5xl font-medium  md:font-bold">You deserve the best coffee in the world</h1>
            <p className="mb-5">
            You’ll be able to enjoy your favorite drink anytime, anywhere. Gone are the days of bad coffee
            </p>
            <button className="btn btn-ghost border-none">
              Explore More...
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
