import React, { useState } from 'react'
import { Button, Checkbox, Form, Progress, Space } from 'antd'
import PropTypes from 'prop-types'

const Step3Form = ({ next, prev, percentage, formData }) => {
  const [data, setData] = useState(formData)

  const onChange = value => {
    setData(value)
  }
  return (
    <>
      <p>Ancora qualche domanda, per capire più a fondo le tue difficoltà. Come ti senti ora?</p>
      <Form
        name="basic"
        layout="vertical"
        labelAlign={'left'}
        labelWrap={true}
        initialValues={formData}
        onFinish={next}
        autoComplete="off"
        requiredMark={false}
        colon={false}
        onValuesChange={(_, allFields) => {
          onChange(allFields)
        }}
      >
        <Form.Item
          name="question_1"
          label="Seleziona una o più scelte che rispecchiano la tua situazione"
          rules={[
            {
              required: true,
              message: 'Please pick an item!',
            },
          ]}
        >
          <Checkbox.Group>
            <Space direction="vertical">
              <Checkbox value="Provo spesso ansia o stress">Provo spesso ansia o stress</Checkbox>
              <Checkbox value="Mi sento spesso triste">Mi sento spesso triste</Checkbox>
              <Checkbox value="Ho difficoltà correlate alla mia esperienza di espatrio">
                Ho difficoltà correlate alla mia esperienza di espatrio
              </Checkbox>
              <Checkbox value="Vivo difficoltà connesse alla mia vita lavorativa">
                Vivo difficoltà connesse alla mia vita lavorativa
              </Checkbox>
              <Checkbox value="Non mi sento sereno rispetto alla mia vita affettiva">
                Non mi sento sereno rispetto alla mia vita affettiva
              </Checkbox>
              <Checkbox value="Sento il bisogno di un intraprendere un percorso di crescita personale">
                Sento il bisogno di un intraprendere un percorso di crescita personale
              </Checkbox>
              <Checkbox value="Nessuna di queste rispecchia la mia situazione">
                Nessuna di queste rispecchia la mia situazione
              </Checkbox>
            </Space>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item
          name="question_2"
          label="Seleziona una o più scelte che rispecchiano la tua situazione"
          rules={[
            {
              required: true,
              message: 'Please pick an item!',
            },
          ]}
        >
          <Checkbox.Group>
            <Space direction="vertical">
              <Checkbox value="Non ho un buon rapporto con il mio corpo e/o con il cibo">
                Non ho un buon rapporto con il mio corpo e/o con il cibo
              </Checkbox>
              <Checkbox value="Vorrei risolvere alcuni problemi legati alla sfera sessuale">
                Vorrei risolvere alcuni problemi legati alla sfera sessuale
              </Checkbox>
              <Checkbox value="Sento di aver sviluppato una dipendenza">
                Sento di aver sviluppato una dipendenza
              </Checkbox>
              <Checkbox value="Ho vissuto un evento scioccante o spaventoso che non riesco a superare">
                Ho vissuto un evento scioccante o spaventoso che non riesco a superare
              </Checkbox>
              <Checkbox value="Vorrei vedere le cose da un'altra prospettiva o credere di più in me stesso">
                Vorrei vedere le cose da un&apos;altra prospettiva o credere di più in me stesso
              </Checkbox>
              <Checkbox value="Soffro a causa di problemi fisici o di salute, miei o di un mio caro">
                Soffro a causa di problemi fisici o di salute, miei o di un mio caro
              </Checkbox>
              <Checkbox valu="Nessuna di queste rispecchia la mia situazione">
                Nessuna di queste rispecchia la mia situazione
              </Checkbox>
            </Space>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item
          name="question_3"
          label="Seleziona una o più scelte che rispecchiano la tua situazione"
          rules={[
            {
              required: true,
              message: 'Please pick an item!',
            },
          ]}
        >
          <Checkbox.Group>
            <Space direction="vertical">
              <Checkbox value="Vorrei conoscermi meglio">Vorrei conoscermi meglio</Checkbox>
              <Checkbox value="Vorrei migliorare la mia autostima">Vorrei migliorare la mia autostima</Checkbox>
              <Checkbox value="Ho bisogno di una dare una svolta alla mia vita">
                Ho bisogno di una dare una svolta alla mia vita
              </Checkbox>
              <Checkbox value="Vorrei vedere le cose da un'altra prospettiva">
                Vorrei vedere le cose da un&apos;altra prospettiva
              </Checkbox>
              <Checkbox value="Vorrei credere di più in me stessa/o"> Vorrei credere di più in me stessa/o</Checkbox>
              <Checkbox value="Ci sono aspetti del mio passato che non capisco o non riesco ad accettare">
                Ci sono aspetti del mio passato che non capisco o non riesco ad accettare
              </Checkbox>
              <Checkbox value="Nessuna di queste rispecchia la mia situazione">
                Nessuna di queste rispecchia la mia situazione
              </Checkbox>
            </Space>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item
          name="question_4"
          label="Seleziona una o più scelte che rispecchiano la tua situazione"
          rules={[
            {
              required: true,
              message: 'Please pick an item!',
            },
          ]}
        >
          <Checkbox.Group>
            <Space direction="vertical">
              <Checkbox value="Vorrei conoscermi meglio">Vorrei conoscermi meglio</Checkbox>
              <Checkbox value="Devo prendere delle decisioni importanti e sono indeciso">
                Devo prendere delle decisioni importanti e sono indeciso
              </Checkbox>
              <Checkbox value="Credo che le mie difficoltà siano principalmente legate a questioni lavorative">
                Credo che le mie difficoltà siano principalmente legate a questioni lavorative
              </Checkbox>
              <Checkbox value="Credo che le mie difficoltà siano principalmente legate alla mia vita all'estero">
                Credo che le mie difficoltà siano principalmente legate alla mia vita all&apos;estero
              </Checkbox>
              <Checkbox value="Vorrei migliorare la mia autostima e la percezione che ho di me">
                Vorrei migliorare la mia autostima e la percezione che ho di me
              </Checkbox>
              <Checkbox value="È da un po' che vorrei fare terapia e credo sia il momento giusto">
                È da un po&apos; che vorrei fare terapia e credo sia il momento giusto
              </Checkbox>
              <Checkbox value="Nessuna di queste rispecchia la mia situazione">
                Nessuna di queste rispecchia la mia situazione
              </Checkbox>
            </Space>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {prev && (
              <Button style={{ marginRight: '5px' }} type="primary" onClick={() => prev(data)}>
                TORNA INDIETRO
              </Button>
            )}
            <Progress percent={percentage} />
            {next && (
              <Button type="primary" htmlType="submit">
                PROSEGUI
              </Button>
            )}
          </div>
        </Form.Item>
      </Form>
    </>
  )
}
Step3Form.propTypes = {
  next: PropTypes.func,
  prev: PropTypes.func,
  percentage: PropTypes.number,
  formData: PropTypes.object,
}

export default Step3Form
