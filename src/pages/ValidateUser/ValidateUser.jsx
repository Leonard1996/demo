import React from 'react'
import { Button, Form, Input, Layout, message } from 'antd'
import { HeaderMenu } from '../../modules'
import { useLocation, useNavigate } from 'react-router-dom'
import { validateUser } from '../../services'
// import { getUser } from '../../shared/utils'
// import { getMe } from '../../services'
// import { useNavigate } from 'react-router-dom'
function useQuery() {
  const { search } = useLocation()
  return React.useMemo(() => new URLSearchParams(search), [search])
}

export const ValidateUser = () => {
  const navigate = useNavigate()
  let query = useQuery()
  console.log(query.get('email'))
  const onFinish = async ({ verificationCode }) => {
    const email = query.get('email')
    const { error, msg } = await validateUser({ email, verificationCode })
    if (error) {
      return message.error(msg)
    }
    message.success('User validated!\n You will be redirected to login page.')
    setTimeout(() => {
      navigate('/login')
    }, 1000)
  }
  // const user = getUser()
  // const navigate = useNavigate()

  return (
    <Layout style={{ height: '100vh' }}>
      <HeaderMenu />
      <Layout style={{ marginTop: '220px', padding: '0 50px' }}>
        <Form
          name="basic"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 4 }}
          onFinish={onFinish}
          autoComplete="off"
          requiredMark={false}
        >
          <Form.Item
            label="Codice"
            name="verificationCode"
            rules={[{ required: true, message: 'Please input your code from email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 10, span: 4 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Layout>
    </Layout>
  )
}
