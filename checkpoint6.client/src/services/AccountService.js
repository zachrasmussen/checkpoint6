import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import { ticketsService } from './TicketsService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async getMyTickets() {
    try {
      const rest = await api.get('/account/tickets')
      AppState.account = res.data
    } catch (error) {
      logger.error('You have zero tickets', err)
    }
  }
}

export const accountService = new AccountService()
