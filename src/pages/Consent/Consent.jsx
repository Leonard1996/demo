import React from 'react'
import { Button, Col, Layout, Row, message, Upload } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { HeaderMenu, SideMenu } from '../../modules'
import axios from 'axios'
import { getToken } from '../../shared/utils'
export const Consent = () => {
  const props = {
    showUploadList: false,
    name: 'consent',
    action: 'http://localhost:5002/patients/consent',
    headers: {
      authorization: `Bearer ${getToken()}`,
    },

    async onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }

      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }

  const handleDownload = async () => {
    const result = await axios.get('http://localhost:5002/users/consent')
    console.log({ result })
    window.open('/Users/user/workspace/psiqo/src/static-files/consent.pdf')
  }

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
                SCARICA E COMPILA IL PDF DEL CONSENSO INFORMATO PER PARTECIPARE ALLE SEDUTE CON IL TUO PSICOTERAPEUTA
              </p>
              <Button style={{ marginBottom: '30px' }} type="primary" onClick={handleDownload}>
                DOWNLOAD
              </Button>
              <p style={{ marginBottom: '10px' }}>CARICA IL PDF DEL CONSENSO INFORMATO DA TE COMPILATO.</p>
              <Upload {...props}>
                <Button style={{ marginBottom: '30px' }} type="primary">
                  UPLOAD
                </Button>
              </Upload>

              <p style={{ marginBottom: '10px' }}>
                SCARICA IL PDF DEL CONSENSO INFORMATO FIRMATO DAL TUO PSICOTERAPEUTA
              </p>
              <Button style={{ marginBottom: '30px' }} type="primary" disabled={true} i>
                DOWNLOAD
              </Button>
              {/*</Space>*/}
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  )
}
