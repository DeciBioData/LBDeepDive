import { PROCESSED_DATE } from './types'

export const processedDate = (date) => {
	return date.toLocaleDateString()
}