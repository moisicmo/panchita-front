import React from 'react'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

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
                <DateTimePicker
                    value={value}
                    label={title}
                    sx={{ display: 'flex' }}
                    onChange={onChange}
                />
            </LocalizationProvider>
        </>
    )
})
