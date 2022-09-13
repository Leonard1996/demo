import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Button } from 'antd'

export const NextSession = ({ session, confirm }) => {
  const actionButton = (
    <Button
      onClick={confirm}
      type="text"
      style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '10px', padding: '0', color: '#9a77cf' }}
    >
      {session.isConfirmed ? 'ACCEDI ALLA VIDEOCALL' : 'IN ATTESA DI CONFERMA'}
    </Button>
  )
  return (
    <div>
      <div>PROSSIMA SEDUTA</div>
      <div>{moment(session.startTime).format('LLLL')}</div>
      <div>
        <span style={{ textTransform: 'capitalize' }}>{session.name}</span>{' '}
        <span style={{ textTransform: 'capitalize' }}>{session.lastName}</span>
      </div>
      {actionButton}
    </div>
  )
}

NextSession.propTypes = {
  session: PropTypes.object,
  confirm: PropTypes.func,
}
