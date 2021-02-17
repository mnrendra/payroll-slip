import { useState, useEffect } from 'react'
import { Form, Dropdown, DropdownButton, InputGroup } from 'react-bootstrap'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// const validateYearValue = (year) => {
//   if (!year) return 'Year'
//   const errorMessage = 'value.year should be a valid year (1970 to 9999)!'
//   if (!isNaN(Number(year))) {
//     if (Number(year) < 1970 || Number(year) > 9999) throw new Error(errorMessage)
//     return Number(year)
//   } else {
//     if (typeof year === 'string') {
//       if (year.toLocaleLowerCase() === 'year') return 'Year'
//       else {
//         if (isNaN(Number(year))) throw new Error(errorMessage)
//         else {
//           if (Number(year) < 1970 || Number(year) > 999) throw new Error(errorMessage)
//           else return Number(year)
//         }
//       }
//     } else throw new Error('value.year should be a valid year!')
//   }
// }

const validateRange = (from, to) => {
  const errMsgFrom = 'range.from must be a valid date format YYYY-MM-DD, where YYYY is a year from 1970 to 9999, and MM is a month from 0 to 11, and DD is a date from 0 to 28/29/30/29. Ex: 1970-12-31'
  const errMsgTo = 'range.to must be a valid date format YYYY-MM-DD, where YYYY is a year from 1970 to 9999, and MM is a month from 0 to 11, and DD is a date from 0 to 28/29/30/29. Ex: 1970-12-31'

  let validFrom = {}
  if (typeof from !== 'string') throw new Error(errMsgFrom)
  else {
    const froms = from.split('-')
    if (isNaN(Number(froms[0]))) throw new Error(errMsgFrom)
    else {
      if (Number(froms[0]) < 1970 || Number(froms[0]) > 9999) throw new Error(errMsgFrom)
      else {
        if (isNaN(Number(froms[1]))) throw new Error(errMsgFrom)
        else {
          if (Number(froms[1]) < 0 || Number(froms[1]) > 11) throw new Error(errMsgFrom)
          else {
            if (isNaN(Number(froms[2]))) throw new Error(errMsgFrom)
            else {
              if (Number(froms[2]) < 1 || Number(froms[2]) > 31) throw new Error(errMsgFrom)
              else {
                validFrom = {
                  year: Number(froms[0]),
                  month: Number(froms[1]),
                  date: Number(froms[2])
                }
              }
            }
          }
        }
      }
    }
  }

  let validTo = {}
  if (typeof to !== 'string') throw new Error(errMsgTo)
  else {
    const tos = to.split('-')
    if (isNaN(Number(tos[0]))) throw new Error(errMsgTo)
    else {
      if (Number(tos[0]) < 1970 || Number(tos[0]) > 9999) throw new Error(errMsgTo)
      else {
        if (isNaN(Number(tos[1]))) throw new Error(errMsgTo)
        else {
          if (Number(tos[1]) < 0 || Number(tos[1]) > 11) throw new Error(errMsgTo)
          else {
            if (isNaN(Number(tos[2]))) throw new Error(errMsgTo)
            else {
              if (Number(tos[2]) < 1 || Number(tos[2]) > 31) throw new Error(errMsgTo)
              else {
                validTo = {
                  year: Number(tos[0]),
                  month: Number(tos[1]),
                  date: Number(tos[2])
                }
              }
            }
          }
        }
      }
    }
  }

  return [validFrom, validTo]
}

const getYears = (from, to) => {
  console.log('getYears', from, to)
  const startYear = !isNaN(Number(from)) ? Number(from) >= 1970 && Number(from) <= 9999 ? Number(from) : 1970 : 1970
  const endYear = !isNaN(Number(to)) ? Number(to) >= 1970 && Number(to) <= 9999 ? Number(to) : 9999 : 9999

  const years = []
  for (let i = startYear; i <= endYear; i++) years.push(i)
  return years
}

const getDates = (year, month) => {
  let lastDate = 31
  if (year === null || isNaN(Number(year))) lastDate = 31
  if (month === null || isNaN(Number(month))) lastDate = 31
  const isLeap = (year % 4) === 0
  lastDate = [0, 2, 4, 6, 7, 9, 11].includes(month) ? 31 : [3, 5, 8, 10].includes(month) ? 30 : isLeap ? 29 : 28
  const dates = []
  for (let i = 1; i <= lastDate; i++) dates.push(i)
  return dates
}

const DatePicker = ({
  label = 'Label',
  textMuted = '',
  format = 'y-m-d',
  value = 'yyyy-mmmm-dd',
  range = { from: '1970-1-1', to: '9999-11-31' },
  onChange
}) => {
  const [validFrom, validTo] = validateRange(range.from, range.to)
  const years = getYears(validFrom.year, validTo.year)

  const [year, setYear] = useState(null)
  const [month, setMonth] = useState(null)
  const [date, setDate] = useState(null)

  useEffect(() => {
    const validValues = value.split('-')
    const validValueYear = isNaN(Number(validValues[0])) ? null : Number(validValues[0])
    const validValueMonth = isNaN(Number(validValues[1])) ? null : Number(validValues[1])
    const validValueDate = isNaN(Number(validValues[2])) ? null : Number(validValues[2])
    setYear(validValueYear)
    setMonth(validValueMonth)
    setDate(validValueDate)
  }, [value])

  useEffect(() => {
    typeof onChange === 'function' && onChange(`${year}-${month}-${date}`)
  }, [year, month, date])

  const onYearChange = (year) => {
    isNaN(Number(year))
      ? setYear(null)
      : Number(year) >= 1970 && Number(year) <= 9999
        ? setYear(Number(year))
        : setYear(null)
  }

  const onMonthChange = (month) => {
    isNaN(Number(month))
      ? setMonth(null)
      : Number(month) >= 0 && Number(month) <= 11
        ? setMonth(Number(month))
        : setMonth(null)
  }

  const onDateChange = (date) => {
    isNaN(Number(date))
      ? setDate(null)
      : Number(date) >= 0 && Number(date) <= 31
        ? setDate(Number(date))
        : setDate(null)
  }

  const dates = getDates(year, month)

  const renderYear = (years = [], year = null, radius = '', width = 1, noBorder = false) => {
    const as = radius === 'prepend' ? InputGroup.Prepend : radius === 'append' ? InputGroup.Append : undefined
    const radiusClass = radius === 'no-radius' ? 'no-border-radius' : ''
    const bordeClass = radius === 'prepend' && noBorder ? ' no-border-right' : radius === 'append' && noBorder ? ' no-border-left' : ''
    return (
      <DropdownButton
        className={radiusClass + bordeClass}
        as={as}
        variant='outline-secondary'
        title={year === null ? 'Year' : year}
        style={{ width: `${width * 100}%` }}
      >
        {years.map(_year => (
          <Dropdown.Item
            key={_year}
            onClick={() => onYearChange(_year)}
            disabled={year === _year}
          >
            {_year}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    )
  }

  const renderMonth = (months = [], month = null, radius = '', width = 1, noBorder = false) => {
    const as = radius === 'prepend' ? InputGroup.Prepend : radius === 'append' ? InputGroup.Append : undefined
    const radiusClass = radius === 'no-radius' ? 'no-border-radius' : ''
    const bordeClass = radius === 'prepend' && noBorder ? ' no-border-right' : radius === 'append' && noBorder ? ' no-border-left' : ''
    return (
      <DropdownButton
        className={radiusClass + bordeClass}
        as={as}
        variant='outline-secondary'
        title={month === null ? 'Month' : months[month]}
        style={{ width: `${width * 100}%` }}
      >
        {months.map(_month => (
          <Dropdown.Item
            key={_month}
            onClick={() => onMonthChange(months.indexOf(_month))}
            disabled={month === _month}
          >
            {_month}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    )
  }

  const renderDate = (dates = [], date = null, radius = '', width = 1, noBorder = false) => {
    const as = radius === 'prepend' ? InputGroup.Prepend : radius === 'append' ? InputGroup.Append : undefined
    const radiusClass = radius === 'no-radius' ? 'no-border-radius' : ''
    const bordeClass = radius === 'prepend' && noBorder ? ' no-border-right' : radius === 'append' && noBorder ? ' no-border-left' : ''
    return (
      <DropdownButton
        className={radiusClass + bordeClass}
        as={as}
        variant='outline-secondary'
        title={date === null ? 'Day' : date}
        style={{ width: `${width * 100}%` }}
      >
        {dates.map(_date => (
          <Dropdown.Item
            className={[0, 6].includes(new Date(`${year}-${month + 1}-${_date}`).getDay()) ? 'weekend' : 'weekdays'}
            key={_date}
            onClick={() => onDateChange(_date)}
            disabled={date === _date}
          >
            <span>{_date}</span>
            <span style={{ float: 'right', textAlign: 'right' }}>{DAYS[new Date(`${year}-${month + 1}-${_date}`).getDay()]}</span>
          </Dropdown.Item>
        ))}
      </DropdownButton>
    )
  }

  const renderByFormat = (format = 'y-m-d') => {
    if (format === 'y-m-d') {
      return (
        <InputGroup>
          {renderYear(years, year, 'prepend', 1 / 3)}
          {renderMonth(MONTHS, month, 'no-radius', 1 / 3)}
          {renderDate(dates, date, 'append', 1 / 3)}
        </InputGroup>
      )
    } else if (format === 'y-m') {
      return (
        <InputGroup>
          {renderYear(years, year, 'prepend', 1 / 2, true)}
          {renderMonth(MONTHS, month, 'append', 1 / 2)}
        </InputGroup>
      )
    } else {
      throw new Error('format must be y-m-d or y-m')
    }
  }

  return (
    <div className='DatePicker'>
      <Form.Group>
        {/* Label */}
        <Form.Label>{label}</Form.Label>
        {/* Select Date */}
        {renderByFormat(format)}
        {/* Muted Text */}
        <Form.Text className='text-muted'>
          {/*
            textMuted ||
            (year && (month >= 0 && month <= 11) && date)
              ? `${DAYS[new Date(`${year}-${month + 1}-${date}`).getDay()]}, ${MONTHS[month]} ${date}, ${year}`
              : ''
          */}
        </Form.Text>
        {/* */}
      </Form.Group>
    </div>
  )
}

export default DatePicker
