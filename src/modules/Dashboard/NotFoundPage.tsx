import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <img
        className='mt-8'
        loading="lazy"
        width="150"
        height="400"
        src="/indrod-cmyk.svg"
        title="Logo"
        alt="Logo"
      />
      <Result
        status="404"
        title="404"
        subTitle="Lo siento, la página que estás buscando no existe."
        extra={<Button type="default" onClick={goHome}>Volver al inicio</Button>}
      />
    </div>
  );
};

export default NotFoundPage;
