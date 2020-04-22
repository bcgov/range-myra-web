import { CLIENT_TYPE } from '../../constants/variables'
import { NOT_PROVIDED } from '../../constants/strings'
import { capitalize } from '..'

export const getAgreementHolders = (clients = []) => {
  let primaryAgreementHolder = {}
  const otherAgreementHolders = []
  clients.forEach(client => {
    if (client.clientTypeCode === CLIENT_TYPE.PRIMARY) {
      primaryAgreementHolder = client
    } else if (client.clientTypeCode === CLIENT_TYPE.OTHER) {
      otherAgreementHolders.push(client)
    }
  })

  return { primaryAgreementHolder, otherAgreementHolders }
}

export const isSingleClient = (clients = []) => {
  return clients.length === 1
}

export const isClientCurrentUser = (client, user) => {
  if (client && user) {
    return user.clients.some(c => c.id === client.id)
  }

  return false
}

export const findConfirmationWithClientId = (clientId, confirmations) => {
  if (clientId && confirmations) {
    return confirmations.find(
      confirmation => confirmation.clientId === clientId
    )
  }
  return undefined
}

export const findConfirmationWithUser = (user, confirmations) => {
  const { clients = [] } = user

  const linkedConfirmations = confirmations.filter(confirmation =>
    clients.some(client => client.id === confirmation.clientId)
  )

  if (linkedConfirmations.length > 1) {
    console.warn(
      'There are multiple clients assigned to this user that share a plan.',
      linkedConfirmations
    )
  }

  return linkedConfirmations[0]
}

export const getClientFullName = contact => {
  if (contact && contact.name) {
    const array = contact.name
      .split(' ')
      .map(string => capitalize(string.toLowerCase()))

    return array.join(' ')
  }

  return NOT_PROVIDED
}
