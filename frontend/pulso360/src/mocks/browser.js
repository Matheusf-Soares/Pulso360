import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

// Setup Service Worker with defined handlers
export const worker = setupWorker(...handlers)
