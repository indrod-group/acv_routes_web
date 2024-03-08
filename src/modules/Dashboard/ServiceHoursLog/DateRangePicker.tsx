import React from 'react';
import { DatePicker, Button } from 'antd';
import dayjs from 'dayjs';

import './styles.css';

const { RangePicker } = DatePicker;

type DateRangePickerProps = {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
};

const disabledDate = (current: dayjs.Dayjs | null): boolean => {
  // Can not select days before today and today
  return current ? current > dayjs().endOf('day') : false;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ startDate, endDate, setStartDate, setEndDate }) => {

  const setEndDateToNow = () => {
    setEndDate(new Date());
    setStartDate(new Date(new Date().setHours(0, 0, 0, 0)));
  };

  return (
    <div className="flex space-x-4 items-center">
      <RangePicker
        showTime
        value={[dayjs(startDate), dayjs(endDate)]}
        onChange={(dates) => {
          setStartDate(dates ? (dates[0] as dayjs.Dayjs).toDate() : null);
          setEndDate(dates ? (dates[1] as dayjs.Dayjs).toDate() : null);
        }}
        onOk={(dates) => {
          setStartDate(dates ? (dates[0] as dayjs.Dayjs).toDate() : null);
          setEndDate(dates ? (dates[1] as dayjs.Dayjs).toDate() : null);
        }}
        disabledDate={disabledDate}
        className="border p-2 rounded text-black"
      />
      <Button onClick={setEndDateToNow}>Seleccionar fecha y hora actual</Button>
    </div>
  );
};

export default DateRangePicker;
