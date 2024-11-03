import React from "react";

type LogoProps = {
  collapsed: boolean;
}

const Logo: React.FC<LogoProps> = ({ collapsed }) => {
  return (
    <div
      className="bg-white bg-opacity-70 rounded-md m-4"
    >
      <div
        className={`logo ${collapsed ? 'h-12' : 'h-20'} ${collapsed ? 'hidden' : 'block'} flex flex-col items-center justify-center`}
      >
        <h1
          className={`text-2xl text-slate-900 text-center ${collapsed ? 'hidden' : 'block'}`}
        >
          Administración de vehículos
        </h1>
      </div>
      <div
        className={`logo ${collapsed ? 'h-12' : 'h-16'} flex flex-col items-center justify-center`}
      >
        <img
          className={`mx-4 p-2 transition-all duration-500 ease-in-out transform ${collapsed ? 'scale-100' : 'scale-75'}`}
          loading="lazy"
          width="150"
          height="400"
          src={collapsed ? "/indrod-cmyk-logo.png" : "/indrod-cmyk.svg"}
          title="Logo"
          alt="Logo"
        />
      </div>
    </div>
  );
}

export default Logo;
