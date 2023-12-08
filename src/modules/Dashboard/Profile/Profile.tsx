import React, { Suspense, lazy } from 'react';
import { Layout, Card, Spin } from 'antd';
import { UserProfile } from '../../../api/models/UserProfile';

const { Header, Content, Footer } = Layout;

const ProfileDescriptions = lazy(() => import('./ProfileDescriptions'));

type ProfileProps = {
  userProfile: UserProfile | undefined;
}

const Profile: React.FC<ProfileProps> = ({ userProfile }) => {
  return (
    <Layout className="site-layout">
      <Header className="flex top-0 w-full  items-center justify-center print:hidden">
        <h2 className="text-sm sm:text-base md:text-lg lg:text-xl text-white text-opacity-80 text-ellipsis">
          Perfil
        </h2>
      </Header>
      <Content>
        <Card
          className="max-w-xs"
          title="Información del perfil"
        >
          <Suspense fallback={<Spin />}>
            <ProfileDescriptions userProfile={userProfile} />
          </Suspense>
        </Card>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        WanWayTech © {new Date().getFullYear()}
      </Footer>
    </Layout>
  );
}

export default Profile;
