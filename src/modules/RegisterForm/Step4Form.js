import React from 'react'
import { Button, Checkbox, Form, Progress, Radio, Select, Space } from 'antd'
import PropTypes from 'prop-types'
import TextArea from 'antd/es/input/TextArea'
import { Link } from 'react-router-dom'

const Step4Form = ({ next, prev, percentage, formData }) => {
  return (
    <>
      <p>Ci siamo quasi!</p>
      <p>Hai dei giorni e orari preferiti per il primo incontro gratuito con il nostro terapeuta?</p>
      <Form
        name="basic"
        layout="vertical"
        labelCol={{ span: 8 }}
        labelAlign={'left'}
        labelWrap={true}
        initialValues={formData}
        onFinish={next}
        autoComplete="off"
        requiredMark={false}
        colon={false}
      >
        <Form.Item
          name="preferedDay"
          label="Giorno preferito"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please select an item!',
            },
          ]}
        >
          <Select placeholder="Please select your answer">
            <Select.Option value="Lunedí">Lunedí</Select.Option>
            <Select.Option value="Martedí">Martedí</Select.Option>
            <Select.Option value="Mercoledí">Mercoledí</Select.Option>
            <Select.Option value="Giovedí">Giovedí</Select.Option>
            <Select.Option value="Venerdí">Venerdí</Select.Option>
            <Select.Option value="Non ho preferenze">Non ho preferenze</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="alternativePreferedDay" label="Giorno alternativo" hasFeedback>
          <Select placeholder="Please select your answer">
            <Select.Option value="Lunedí">Lunedí</Select.Option>
            <Select.Option value="Martedí">Martedí</Select.Option>
            <Select.Option value="Mercoledí">Mercoledí</Select.Option>
            <Select.Option value="Giovedí">Giovedí</Select.Option>
            <Select.Option value="Venerdí">Venerdí</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="time"
          label="Orario"
          rules={[
            {
              required: true,
              message: 'Please select an item!',
            },
          ]}
        >
          <Radio.Group>
            <Space direction="vertical">
              <Radio value="La mattina dalle 8:00 alle 13:00 (ora italiana)">
                La mattina dalle 8:00 alle 13:00 (ora italiana)
              </Radio>
              <Radio value="In pausa pranzo o nel pomeriggio dalle 13:00 alle 18:00 (ora italiana)">
                In pausa pranzo o nel pomeriggio dalle 13:00 alle 18:00 (ora italiana)
              </Radio>
              <Radio value="La sera dalle 18:00 alle 20:00 (ora italiana)">
                La sera dalle 18:00 alle 20:00 (ora italiana)
              </Radio>
              <Radio value="Non ho preferenze">Non ho preferenze</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="preference"
          label="Per me è importante..."
          rules={[
            {
              required: true,
              message: 'Please select an item!',
            },
          ]}
        >
          <Radio.Group>
            <Space direction="vertical">
              <Radio value="Che il mio psicologo sia uomo">Che il mio psicologo sia uomo</Radio>
              <Radio value="Che il mio psicologo sia donna">Che il mio psicologo sia donna</Radio>
              <Radio value="Che sia il più adatto a sostenermi">Che sia il più adatto a sostenermi</Radio>
              <Radio value="Non ho preferenze">Non ho preferenze</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="agePreference"
          label="È anche importante..."
          rules={[
            {
              required: true,
              message: 'Please select an item!',
            },
          ]}
        >
          <Radio.Group>
            <Space direction="vertical">
              <Radio value="Che il mio psicologo abbia più di 34 anni">Che il mio psicologo abbia più di 34 anni</Radio>
              <Radio value="Che il mio psicologo abbia meno di 34 anni">
                Che il mio psicologo abbia meno di 34 anni
              </Radio>
              <Radio value="Che sia il più adatto a sostenermi">Che sia il più adatto a sostenermi</Radio>
              <Radio value="Non ho preferenze">Non ho preferenze</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="requiredTime"
          label="Il mio psicologo deve essere disponibile..."
          rules={[
            {
              required: true,
              message: 'Please select an item!',
            },
          ]}
        >
          <Radio.Group>
            <Space direction="vertical">
              <Radio value="La mattina dalle 8:00 alle 13:00 (ora italiana)">
                La mattina dalle 8:00 alle 13:00 (ora italiana)
              </Radio>
              <Radio value="In pausa pranzo o nel pomeriggio dalle 13:00 alle 18:00 (ora italiana)">
                In pausa pranzo o nel pomeriggio dalle 13:00 alle 18:00 (ora italiana)
              </Radio>
              <Radio value="La sera dalle 18:00 alle 20:00 (ora italiana)">
                La sera dalle 18:00 alle 20:00 (ora italiana)
              </Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="referral"
          label="Come ci hai conosciuto?"
          rules={[
            {
              required: true,
              message: 'Please select an item!',
            },
          ]}
        >
          <Radio.Group>
            <Space direction="vertical">
              <Radio value="Ho visto una pubblicità su Facebook o Instagram">
                Ho visto una pubblicità su Facebook o Instagram
              </Radio>
              <Radio value="Ho visto la vostra pagina Facebook o Instagram">
                Ho visto la vostra pagina Facebook o Instagram
              </Radio>
              <Radio value="Ho fatto una ricerca su Google">Ho fatto una ricerca su Google</Radio>
              <Radio value="Sono stato consigliato da un amico, familiare o conoscente">
                Sono stato consigliato da un amico, familiare o conoscente
              </Radio>
              <Radio value="Altro">Altro</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="doubts_questions" label="Hai dubbi o domande per noi?">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="newsletter"
          label="Iscriviti alla newsletter?"
          rules={[
            {
              required: true,
              message: 'Please check item',
            },
          ]}
        >
          <Radio.Group>
            <Space direction="vertical">
              <Radio value="1">Si</Radio>
              <Radio value="0">No</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="ignore"
          label="Abbiamo bisogno del tuo consenso!"
          rules={[
            {
              required: true,
              message: 'Please check item',
            },
          ]}
        >
          <div className="acceptConditions">
            <Link to="/informativa-privacy">Informativa privacy</Link>-
            <Link to="/termini-e-condizioni">Termini e condizioni</Link>
          </div>
          <Checkbox.Group>
            <Space direction="vertical">
              <Checkbox value="Ho letto e accetto i Termini e condizioni e l'informativa sulla privacy">
                Ho letto e accetto i Termini e condizioni e l&apos;informativa sulla privacy
              </Checkbox>
            </Space>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item
          name="ignore"
          rules={[
            {
              required: true,
              message: 'Please check item',
            },
          ]}
        >
          <Checkbox.Group>
            <Space direction="vertical">
              <Checkbox value="Ai sensi degli art. 1341, comma 2 c.c. e art. 33 del d. lgs. 6 settembre 2005, n. 206, ho letto e accetto i seguenti articoli: art. 5, art. 9, art. 10, art. 13, art. 14.">
                Ai sensi degli art. 1341, comma 2 c.c. e art. 33 del d. lgs. 6 settembre 2005, n. 206, ho letto e
                accetto i seguenti articoli: art. 5, art. 9, art. 10, art. 13, art. 14.
              </Checkbox>
            </Space>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {prev && (
              <Button style={{ marginRight: '5px' }} type="primary" onClick={prev}>
                TORNA INDIETRO
              </Button>
            )}
            <Progress percent={percentage} />
            {next && (
              <Button type="primary" htmlType="submit">
                INVIA
              </Button>
            )}
          </div>
        </Form.Item>
      </Form>
    </>
  )
}
Step4Form.propTypes = {
  next: PropTypes.func,
  prev: PropTypes.func,
  percentage: PropTypes.number,
  formData: PropTypes.object,
}

export default Step4Form
