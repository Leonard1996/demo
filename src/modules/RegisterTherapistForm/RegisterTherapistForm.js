import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Col, DatePicker, Form, Input, Radio, Row, Select, Upload } from 'antd'
import PropTypes from 'prop-types'
import moment from 'moment'
import TextArea from 'antd/es/input/TextArea'
import { PrefixSelector } from '../../shared/components'
import { COUNTRY_REGIONS } from '../../shared/utils'
import { UploadOutlined } from '@ant-design/icons'

export const RegisterTherapistForm = ({ onFinish, onFinishFailed }) => {
  const [country, setCountry] = useState('Italy')
  const [regionOptions, setRegionOptions] = useState([])
  useEffect(() => {
    const regions = COUNTRY_REGIONS.filter(c => c.countryName === country)[0].regions
    setRegionOptions(
      regions.map(reg => (
        <Select.Option key={reg.name} value={reg.name}>
          {reg.name}
        </Select.Option>
      )),
    )
  }, [country])
  const disabledDate = current => {
    return current && current > moment().subtract(18, 'years').endOf('day')
  }
  const defaultPickerValue = moment().subtract(18, 'years')

  const [showUpload, setShowUpload] = useState(true)

  const dummyReq = async ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok')
    })
  }
  const fileUploadChanges = async ({ fileList }) => {
    fileList.length === 0 ? setShowUpload(true) : setShowUpload(false)
  }
  const stateOptions = COUNTRY_REGIONS.map(country => (
    <Select.Option key={country.countryName} value={country.countryName}>
      {country.countryName}
    </Select.Option>
  ))
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      labelAlign={'left'}
      labelWrap={true}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true, prefix: '+39' }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      requiredMark={false}
      colon={false}
    >
      <Form.Item label="NOME" name="name" rules={[{ required: true, message: 'Per favore inserisci il tuo nome!' }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="COGNOME"
        name="lastName"
        rules={[{ required: true, message: 'Per favore inserisci il tuo cognome!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="phone"
        label="NUMERO DI TELEFONO"
        rules={[
          {
            required: true,
            message: 'Per favore inserisci il tuo numero di telefono!',
          },
        ]}
      >
        <Input
          addonBefore=<PrefixSelector />
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      <Form.Item
        label="DATA DI NASCITA"
        name="birthday"
        rules={[{ required: true, message: 'Per favore inserisci il tuo data di nascita!' }]}
      >
        <DatePicker
          placeholder="Selezionare data"
          format="DD-MM-YYYY"
          style={{ width: '100%' }}
          disabledDate={disabledDate}
          defaultPickerValue={defaultPickerValue}
        />
      </Form.Item>

      <Form.Item
        name="gender"
        label="GENERE"
        rules={[
          {
            required: true,
            message: 'Per favore scegli un articolo!',
          },
        ]}
      >
        <Radio.Group>
          <Radio value="male">UOMO</Radio>
          <Radio value="female">DONNA</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="type"
        label="APPROCCIO TERAPEUTICO"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Per favore scegli un articolo!',
          },
        ]}
      >
        <Select placeholder="Seleziona la tipologia">
          <Select.Option value="COGNITIVO-COMPORTAMENTALE">APPROCCIO COGNITIVO-COMPORTAMENTALE</Select.Option>
          <Select.Option value="SISTEMICO">APPROCCIO SISTEMICO</Select.Option>
          <Select.Option value="PSICODINAMICO">APPROCCIO PSICODINAMICO</Select.Option>
          <Select.Option value="UMANISTICO-ESISTENZIALE">APPROCCIO UMANISTICO-ESISTENZIALE</Select.Option>
          <Select.Option value="ALTRO">ALTRO</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="state"
        label="PAESE DI RESIDENZA"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Per favore seleziona il tuo paese!',
          },
        ]}
      >
        <Select onSelect={setCountry} placeholder="Seleziona la tipologia">
          {stateOptions}
        </Select>
      </Form.Item>

      <Form.Item
        name="province"
        label="REGIONE DI RESIDENZA"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Per favore seleziona la province!',
          },
        ]}
      >
        <Select placeholder="Seleziona la province">{regionOptions}</Select>
      </Form.Item>

      <Form.Item
        name="iva"
        label="HAI PARTITA IVA?"
        rules={[
          {
            required: true,
            message: 'Per favore scegli un articolo!',
          },
        ]}
      >
        <Radio.Group>
          <Radio value="1">SI</Radio>
          <Radio value="0">NO</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="enpap"
        label="SEI ISCRITTO ALL'ENPAP?"
        rules={[
          {
            required: true,
            message: 'Per favore scegli un articolo!',
          },
        ]}
      >
        <Radio.Group>
          <Radio value="1">SI</Radio>
          <Radio value="0">NO</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="ordine"
        label="SEI ISCRITTO ALL'ORDINE DEGLI PSICOLOGI?"
        rules={[
          {
            required: true,
            message: 'Per favore scegli un articolo!',
          },
        ]}
      >
        <Radio.Group>
          <Radio value="1">SI</Radio>
          <Radio value="0">NO</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="school"
        label="HAI TERMINATO LA SCUOLA DI SPECIALIZZAZIONE DI PSICOTERAPIA / SEI ISCRITTO ALMENO AL 4°?"
        rules={[
          {
            required: true,
            message: 'Per favore scegli un articolo!',
          },
        ]}
      >
        <Radio.Group>
          <Radio value="1">SI</Radio>
          <Radio value="0">NO</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="experiences"
        label="AREE DI INTERVENTO"
        rules={[
          {
            required: true,
            message: 'Per favore scegli un articolo!',
          },
        ]}
      >
        <Checkbox.Group>
          <Row>
            <Col span={12}>
              <Checkbox value="DIFFICOLTÀ RELAZIONALI">DIFFICOLTÀ RELAZIONALI</Checkbox>
            </Col>
            <Col span={12}>
              <Checkbox value="DISTURBI D'ANSIA E/O PANICO">DISTURBI D&apos;ANSIA E/O PANICO</Checkbox>
            </Col>

            <Col span={12}>
              <Checkbox value="IPOCONDRIA, DISTURBO OSSESSIVO COMPULSIVO">
                IPOCONDRIA, DISTURBO OSSESSIVO COMPULSIVO
              </Checkbox>
            </Col>
            <Col span={12}>
              <Checkbox value="DISTURBI DELL'UMORE, DEPRESSIONE">DISTURBI DELL&apos;UMORE, DEPRESSIONE</Checkbox>
            </Col>

            <Col span={12}>
              <Checkbox value="DISTURBI DELL'ALIMENTAZIONE">DISTURBI DELL&apos;ALIMENTAZIONE</Checkbox>
            </Col>
            <Col span={12}>
              <Checkbox value="DISTURBI PSICOSOMATICI">DISTURBI PSICOSOMATICI</Checkbox>
            </Col>

            <Col span={12}>
              <Checkbox value="PROBLEMI SESSUALI">PROBLEMI SESSUALI</Checkbox>
            </Col>
            <Col span={12}>
              <Checkbox value="PROBLEMI DI SALUTE">PROBLEMI DI SALUTE</Checkbox>
            </Col>

            <Col span={12}>
              <Checkbox value="DIFFICOLTÀ LAVORATIVE">DIFFICOLTÀ LAVORATIVE</Checkbox>
            </Col>
            <Col span={12}>
              <Checkbox value="GENITORIALITÀ">GENITORIALITÀ</Checkbox>
            </Col>

            <Col span={12}>
              <Checkbox value="LUTTO, TRAUMA">LUTTO, TRAUMA</Checkbox>
            </Col>
            <Col span={12}>
              <Checkbox value="DIPENDENZE COMPORTAMENTALI">DIPENDENZE COMPORTAMENTALI</Checkbox>
            </Col>

            <Col span={12}>
              <Checkbox value="DIPENDENZA DA SOSTANZE">DIPENDENZA DA SOSTANZE</Checkbox>
            </Col>
            <Col span={12}>
              <Checkbox value="DISTURBI PSICHIATRICI">DISTURBI PSICHIATRICI</Checkbox>
            </Col>

            <Col span={12}>
              <Checkbox value="PROBLEMI DI COPPIA">PROBLEMI DI COPPIA</Checkbox>
            </Col>
            <Col span={12}>
              <Checkbox value="ALTRO">
                ALTRO{' '}
                <Form.Item style={{ float: 'right' }} name="experiences_other">
                  <Input
                    name="experiences_other"
                    style={{
                      width: 140,
                      marginLeft: 10,
                    }}
                  />
                </Form.Item>
              </Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
      </Form.Item>

      <Form.Item label="CARICA IL TUO CV" name="cv" valuePropName="fileCV">
        <Upload onChange={fileUploadChanges} multiple={false} customRequest={dummyReq} listType="text">
          {/*<Input />*/}
          {showUpload && <Button icon={<UploadOutlined />}>Clic per caricare</Button>}
        </Upload>
      </Form.Item>

      <Form.Item name="cover_letter" label="LETTERA DI PRESENTAZIONE">
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item label="EMAIL" name="email" rules={[{ required: true, message: 'Per favore inserisci la tua email!' }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="PASSWORD"
        name="password"
        rules={[{ required: true, message: 'Per favore inserisci la tua password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="CONFERMA PASSWORD"
        name="confirmPassword"
        dependencies={['password']}
        rules={[
          {
            required: true,
            message: 'Si prega di confermare la password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }

              return Promise.reject(new Error('Le due password che hai inserito non corrispondono!'))
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label={' '}
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) => (value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement'))),
          },
        ]}
      >
        <Checkbox>ACCETTO PRIVACY E TERMINI E CONDIZIONI</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
RegisterTherapistForm.propTypes = {
  onFinish: PropTypes.func,
  onFinishFailed: PropTypes.func,
}
