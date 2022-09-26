import React from 'react'
import { Button, Col, Layout, Row, message, Upload } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { HeaderMenu, SideMenu } from '../../modules'
import { getToken, getUser } from '../../shared/utils'
import { getMe } from '../../services'
import { useNavigate } from 'react-router-dom'
export const Consent = () => {
  const user = getUser()
  const navigate = useNavigate()
  const props = {
    showUploadList: false,
    name: 'consent',
    action: 'http://ec2-34-244-164-93.eu-west-1.compute.amazonaws.com:4500/patients/consent',
    headers: {
      authorization: `Bearer ${getToken()}`,
    },

    async onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }

      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`)
        const { error } = await getMe()
        if (!error) return navigate('/consent')
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }

  const handleDownload = async () => {
    window.open('http://localhost:8080/consent.pdf', 'blank')
    // axios.get('http://localhost:5002/users/consent').then(response => {
    //   // create file link in browser's memory
    //   window.open('http://localhost:8080/consent.pdf', 'blank')
    //   const href = URL.createObjectURL(response.data)
    //
    //   // create "a" HTLM element with href to file & click
    //   const link = document.createElement('a')
    //   link.href = href
    //   // link.setAttribute('download', 'consent.pdf') //or any other extension
    //   document.body.appendChild(link)
    //   link.click()
    //
    //   // clean up "a" element & remove ObjectURL
    //   document.body.removeChild(link)
    //   URL.revokeObjectURL(href)
    // })
    // console.log(data)
    // window.open(data, '_blank', {})
  }
  const handleSignedDownload = async () => {
    window.open(consent)
  }
  const { consent } = user.patient || {}
  return (
    <Layout style={{ height: '100vh' }}>
      <HeaderMenu />
      <Layout style={{ marginTop: '120px', padding: '0 50px' }}>
        <SideMenu />
        <Content>
          <Row style={{ paddingTop: '150px' }} align="middle" justify="center">
            <Col style={{ textAlign: 'start' }} flex="740px">
              {/*<Space direction="vertical">*/}
              <p style={{ marginBottom: '10px' }}>
                MOSTRA E COMPILA IL PDF DEL CONSENSO INFORMATO PER PARTECIPARE ALLE SEDUTE CON IL TUO PSICOTERAPEUTA
              </p>
              <Button style={{ marginBottom: '30px' }} type="primary" onClick={handleDownload}>
                MOSTRA
              </Button>
              <p style={{ marginBottom: '10px' }}>CARICA IL PDF DEL CONSENSO INFORMATO DA TE COMPILATO.</p>
              <Upload {...props}>
                <Button style={{ marginBottom: '30px' }} type="primary">
                  UPLOAD
                </Button>
              </Upload>

              <p style={{ marginBottom: '10px' }}>
                MOSTRA IL PDF DEL CONSENSO INFORMATO FIRMATO DAL TUO PSICOTERAPEUTA
              </p>
              <Button
                style={{ marginBottom: '30px' }}
                type="primary"
                disabled={!consent}
                onClick={handleSignedDownload}
              >
                MOSTRA
              </Button>
              {/*</Space>*/}
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  )
}
