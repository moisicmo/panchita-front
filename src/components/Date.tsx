import React from 'react'

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';


interface dateProps {
  value: any;
  title: string;
  onChange: (value: any) => void;
}

export const ComponentDate = React.memo((props: dateProps) => {
  const {
    value,
    title,
    onChange
  } = props;
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          value={value}
          label={title}
          sx={{ display: 'flex' }}
          onChange={onChange}
          minDate={new Date()}
        />
      </LocalizationProvider>
    </>
  )
})
