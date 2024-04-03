import React, { useState, Suspense } from 'react';
import { Button, Modal, Spin } from 'antd';

const ChangePassword = React.lazy(() => import('./ChangePassword'));

const ChangePasswordModal: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Cambiar Contraseña
      </Button>
      <Modal className="flex justify-center" title="Cambiar Contraseña" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Suspense fallback={<Spin tip="Cargando datos..." />}>
          <ChangePassword />
        </Suspense>
      </Modal>
    </>
  );
}

export default ChangePasswordModal;
