import React from "react";

type LogoProps = {
  collapsed: boolean;
}

const Logo: React.FC<LogoProps> = ({ collapsed }) => {
  return (
    <div
      className={`logo ${collapsed ? 'h-12' : 'h-28'} m-4 bg-white bg-opacity-20 rounded-md flex items-center justify-center`}
    >
      <img
        className={`mx-4 transition-all duration-500 ease-in-out transform ${collapsed ? 'scale-100' : 'scale-75'}`}
        loading="lazy"
        width="32"
        height="32"
        src="/vite.svg"
        title="Logo"
        alt="Logo"
      />
      <h1
        className={`text-2xl text-slate-100 ${collapsed ? 'hidden' : 'block'}`}
      >
        Sistema de administración de vehículos y rutas
      </h1>
    </div>
  );
}

export default Logo;
