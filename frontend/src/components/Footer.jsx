import React from "react";
import webFont from "webfontloader";

const Footer = () => {
  React.useEffect(() => {
    webFont.load({
      google: {
        families: ["Nunito", "Roboto", "sans-serif"],
      },
    });
  }, []);
  return (
    <div className="flex justify-between px-4 font-['Roboto'] bg-[#3C486B] py-8 text-[#F0F0F0] sm:flex-col sm:gap-8 sm:px-2">
      <div className="flex flex-col  items-center w-[33%] sm:w-full">
        <h2 className="text-2xl mb-8">Download our App</h2>
        <img
          className="w-[60%] sm:w-[80%]"
          src="https://guide-entreprise.fr/wp-content/uploads/2021/08/Google-et-Apple-dans-le-viseur-de-l-Open-App-Markets-Act.png"
          alt=""
        />
      </div>
      <div className="flex flex-col items-center justify-center w-[33%] gap-4 sm:w-full">
        <h1 className="text-4xl text-[#F45050] font-bold font-['Nunito']">
          GetSome.
        </h1>
        <p>Discover Endless Possibilities with GetSome</p>
        <p>Copyrights 2023 &copy; Nishant </p>
      </div>
      <div className="flex flex-col gap-4 items-center justify-around w-[33%] sm:w-full">
        <h2 className="text-2xl ">Follow us.</h2>
        <div className="flex flex-col text-lg items-center gap-4 sm:flex-row">
          <p className="hover:text-[#F45050] hover:underline  cursor-pointer">
            Youtube
          </p>
          <p className="hover:text-[#F45050] hover:underline  cursor-pointer">
            LinkedIn
          </p>
          <p className="hover:text-[#F45050] hover:underline  cursor-pointer">
            Instagram
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
