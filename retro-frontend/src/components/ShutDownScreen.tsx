const ShutDownScreen = () => {
  return (
    <div
      className="fixed z-10 top-0 left-0 bottom-0 right-0 h-screen w-full bg-[#dfdfeb]"
      style={{
        background:
          "radial-gradient(circle, rgba(223, 223, 235, 1) 0%, rgba(0, 100, 255, 1) 25%, rgba(36, 20, 200, 1) 100%)",
      }}
    >
      <div className="flex w-full items-center justify-center flex-col h-full">
        <img
          src="/shutting-down-xp-logo.png"
          className="max-w-[400px] w-full object-cover"
          alt=""
        />
      </div>
    </div>
  );
};

export default ShutDownScreen;
