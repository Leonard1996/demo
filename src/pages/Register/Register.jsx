import React, { useMemo }  from 'react'
import './style.css'
import { Layout, Row, Col, message } from 'antd'
// import { UserOutlined, LockOutlined, QuestionOutlined } from '@ant-design/icons'

// import CopyRight from '../../shared/components/CopyRight/CopyRight'
import { Button, Divider, notification, Space } from 'antd';
const Context = React.createContext({
  name: 'Default',
});
import { register } from '../../services'
import { useNavigate } from 'react-router-dom'
import { HeaderMenu, RegisterForm } from '../../modules'

const IntroText = () => {
  return (
    <div className="intro">
      <div className="intro-head">Compila il questionario</div>
      <div className="intro-sub">Poche e semplici domande, per raccontarci qualcosa di te</div>
    </div>
  )
}

export const Register = () => {

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement) => {
    api.info({
      message: `Successo`,
      description: <Context.Consumer>{({ name }) => `Controlla la tua mail per completare la registrazione`}</Context.Consumer>,
      placement,
    });
  };
  const contextValue = useMemo(
    () => ({
      name: 'Ant Design',
    }),
    [],
  );
  const { Content } = Layout
  const navigate = useNavigate()

  const onFinish = async values => {
    const { error, msg } = await register(values)
    if (error) {
      return message.error(msg)
    }
    message.success(msg)
    openNotification('bottomLeft')
    // navigate('/login')
  }
  return (
    <Layout className="LoginLayout">
      <HeaderMenu />
      <Content style={{ marginTop: '120px' }}>
        <Row align="middle" justify="start">
          <Col style={{ textAlign: 'start' }} span={24}>
            <IntroText />
          </Col>
        </Row>
        <Row style={{ padding: '50px 200px', background: '#fff' }} align="middle" justify="center">
          <Col flex="740px" style={{ textAlign: 'start' }} span={24}>
            <RegisterForm onFinish={onFinish} />
          </Col>
        </Row>
      </Content>
      <Context.Provider value={contextValue}>
      {contextHolder}
      {/* <Space>
        <Button type="primary" onClick={() => openNotification('bottomLeft')}>
          <RadiusUpleftOutlined />
          topLeft
        </Button>
      </Space> */}
      </Context.Provider>
    </Layout>
  )
}

export default Register
