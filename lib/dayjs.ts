import dayjs from 'dayjs'
import buddhistEra from 'dayjs/plugin/buddhistEra'
import utc from 'dayjs/plugin/utc'
import 'dayjs/locale/th'

dayjs.extend(buddhistEra)
dayjs.extend(utc)

export default dayjs
