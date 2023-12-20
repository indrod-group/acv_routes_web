import React, { useState, useEffect } from 'react';
import { Tree, Modal, Form, Input } from 'antd';

import { useTreeAccount, useProfile } from '../../../api/hooks';
import type { UserProfile } from '../../../api/models';

interface DataNode {
  title: string;
  key: string;
  isLeaf?: boolean;
  children?: DataNode[];
}

const userProfileToDataNode = (userProfile: UserProfile): DataNode => ({
  title: userProfile.first_name + ' ' + userProfile.last_name,
  key: userProfile.uuid,
  children: userProfile.child_accounts ? userProfile.child_accounts.map(userProfileToDataNode) : undefined,
});

const findInTree = (tree: UserProfile, uuid: string): UserProfile | null => {
  if (tree.uuid === uuid) {
    return tree;
  }
  for (const child of tree.child_accounts ?? []) {
    const found = findInTree(child, uuid);
    if (found) {
      return found;
    }
  }
  return null;
};

const TreeAccount: React.FC = () => {
  const { userProfile } = useProfile();
  const [treeData, setTreeData] = useState<DataNode[]>([]);
  const { treeAccounts } = useTreeAccount(userProfile?.uuid as string);

  useEffect(() => {
    if (userProfile && treeAccounts) {
      setTreeData([userProfileToDataNode(treeAccounts)]);
    }
  }, [userProfile, treeAccounts]);

  const onSelect = (selectedKeys: React.Key[], info: unknown) => {
    // Aquí puedes buscar el nodo seleccionado en treeAccounts y mostrar su información en un modal
    const selectedNode = treeAccounts && findInTree(treeAccounts, selectedKeys[0] as string);
    Modal.info({
      title: 'Información de la cuenta',
      content: `Has seleccionado la cuenta: ${selectedNode?.first_name as string} ${selectedNode?.last_name as string}`,
    });
    console.log(info);
  };

  const onRightClick = ({ node, event }: { node: DataNode, event: React.MouseEvent }) => {
    // Aquí puedes mostrar un menú contextual con opciones para editar o eliminar la cuenta
    // Por ahora, solo mostraremos un modal con un formulario de prueba para editar la cuenta
    Modal.confirm({
      title: 'Editar cuenta',
      content: (
        <Form>
          <Form.Item label="Nombre">
            <Input defaultValue={node.title} />
          </Form.Item>
          <Form.Item label="Correo electrónico">
            <Input defaultValue="test@example.com" />
          </Form.Item>
        </Form>
      ),
      onOk() {
        // Aquí puedes llamar a tu API para actualizar la cuenta
        console.log('Actualizar cuenta', event);
      },
    });
  };

  return (
    <Tree
      treeData={treeData}
      onSelect={onSelect}
      onRightClick={onRightClick}
    />
  );
};

export default TreeAccount;
