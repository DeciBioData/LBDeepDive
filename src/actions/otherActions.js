import { PROCESSED_DATE } from './types'

export const processedDate = (date) => {
	return date.split('T')[0]
}