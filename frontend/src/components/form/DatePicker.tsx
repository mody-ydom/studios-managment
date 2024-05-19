import React from "react";
import { DateRangePicker, Range } from "react-date-range";
import {
  set,
  eachDayOfInterval,
  isWithinInterval,
  parseISO,
  subMinutes,
  endOfDay,
  startOfDay,
} from "date-fns";
import styled from "@emotion/styled";

import "react-date-range/dist/styles.css"; // main styles file
import "react-date-range/dist/theme/default.css"; // theme styles file

interface CustomDateRangePickerProps {
  onChange: (x: any) => any;
  disabledRanges: string[];
}

interface CustomDateRangeState {
  selection: Range;
}

const StyledDateRangePicker = styled(DateRangePicker)`
  .rdrCalendarWrapper,
  .rdrDateRangeWrapper {
    border-radius: 16px;
  }
  .rdrDefinedRangesWrapper,
  .rdrDateDisplayWrapper,
  .rdrMonthName {
    display: none;
  }
  .rdrDay {
    border: 1px solid #d5d4df;
    background-color: white;
  }
  .rdrDayDisabled {
    background-color: rgb(186 186 186);
    color: #d5edfa;
  }
  .rdrDayDisabled .rdrDayNumber span {
    color: #d5edfa;
  }
  .rdrStartEdge,
  .rdrEndEdge,
  .rdrInRange {
    background-color: #1eabe3;
    width: 100% !important;
    height: 100% !important;
    left: 0 !important;
    top: 0 !important;
    border-radius: 0 !important;
  }
`;

const CustomDateRangePicker: React.FC<CustomDateRangePickerProps> = ({
  onChange,
  disabledRanges,
}) => {
  const [state, setState] = React.useState<CustomDateRangeState[]>([
    {
      selection: {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    },
  ]);

  // Parse the disabled ranges into a format suitable for comparison
  const parsedDisabledRanges = disabledRanges.map((range) => {
    const [start, end] = range.split("||");
    return {
      start: parseISO(start),
      end: parseISO(end),
    };
  });

  // Function to determine if a day should be disabled
  const isDateDisabled = (date: Date) => {
    // Define start and end of the day for the given date
    const dayStart = startOfDay(date);
    const dayEnd = endOfDay(date);
    return parsedDisabledRanges.some(({ start, end }) => {
      return (
        isWithinInterval(dayStart, { start, end }) ||
        isWithinInterval(dayEnd, { start, end })
      );
    });
  };

  const handleSelect = (ranges: any) => {
    const { selection } = ranges;
    let { startDate, endDate } = selection;

    // Swap dates if selection is in reverse
    if (startDate > endDate) {
      [startDate, endDate] = [endDate, startDate];
    }
    // Set endDate to the end of the day
    endDate = set(endDate, { hours: 23, minutes: 59, seconds: 59 });

    // Check if any date in the range is disabled
    const dateRange = eachDayOfInterval({ start: startDate, end: endDate });
    const invalidDateFound = dateRange.some(isDateDisabled);

    if (!invalidDateFound) {
      setState([{ selection: { ...selection, startDate, endDate } }]);
      onChange({ ...selection, startDate, endDate });
    }
  };
  return (
    <StyledDateRangePicker
      onChange={handleSelect}
      moveRangeOnFirstSelection={false}
      showPreview={true}
      months={1}
      ranges={state.map((range) => range.selection)}
      direction="horizontal"
      preventSnapRefocus={true}
      showMonthAndYearPickers={false}
      disabledDay={isDateDisabled}
      showDateDisplay={false}
    />
  );
};

export default CustomDateRangePicker;
