import React from "react";

function Banner() {
  return (
    <div
      className="h-[20vh] md:h-[75vh] bg-cover bg-center bg-no-repeat flex items-end"
      style={{
        backgroundImage: `url(https://www.designbolts.com/wp-content/uploads/2019/01/Avengers-Endgame-2019-Desktop-Movie-Wallpapers-HD-4-1.jpg)`,
      }}
    >
      <div className="text-white text-2xl text-center w-full bg-gray-900/60 p-4">
        Avengers Endgame
      </div>
    </div>
  );
}

export default Banner;
