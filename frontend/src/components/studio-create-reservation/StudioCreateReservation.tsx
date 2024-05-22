import React, { useState } from "react";
import { SStudioCreateReservation } from "./styles/SStudioCreateReservation";
import { IStudio } from "@/src/constants/types";
import CustomDateRangePicker from "../form/DatePicker";
import { SStudioCreateReservationBottomPart } from "./styles/SStudioCreateReservationBottomPart";
import { SStudioCreateReservationImage } from "./styles/SStudioCreateReservationImage";
import { SStudioCreateReservationInfo } from "./styles/SStudioCreateReservationInfo";
import { SStudioCreateReservationSummary } from "./styles/SStudioCreateReservationSummary";
import { differenceInCalendarDays, format } from "date-fns";
import { SStudioCreateReservationBookBtn } from "./styles/SStudioCreateReservationBookBtn";
import { createReservation } from "@/services/apiServices";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export const StudioCreateReservation: React.FC<IStudio> = ({
  name,
  location,
  reserved_periods,
  images,
  id,
  ...props
}) => {
  const {user} = useSelector((state: RootState) => state.user);
const router = useRouter();

  const [range, setRange] = useState<{ startDate?: Date; endDate?: Date }>({});
  const { startDate, endDate } = range;
  const totalDays =
    differenceInCalendarDays(endDate as Date, startDate as Date) + 1; // +1 to include both start and end dates
  const formattedDates = `${format(startDate || 0, "dd-MMM")} -> ${format(
    endDate || 0,
    "dd-MMM"
  )}`;

const handleBook = async ()=>{
if(!user)return;
   createReservation({body:{start:(startDate as Date).toISOString(), end:(endDate as Date).toISOString(), studio:id, customer: user.id , id:0 }}).then((res)=>{
  res.status==201 && router.push('/reservations');
   }).catch(error=>{
     console.log(error)
     //fixme add sweet alert
   })
  
}

  return (
    <SStudioCreateReservation>
      <CustomDateRangePicker
        disabledRanges={reserved_periods as unknown as string[]}
        onChange={setRange}
      />

      <SStudioCreateReservationBottomPart>
        <SStudioCreateReservationInfo>
          <SStudioCreateReservationImage src={images?.[0].image} />
          <div>
            <h3>{name}</h3>
            <h4>{location}</h4>
          </div>
        </SStudioCreateReservationInfo>
        <SStudioCreateReservationSummary>
          {startDate && endDate ? (
            <>
              <p>Total Days: {totalDays || 0}</p>
              <p>dates: {formattedDates || ""}</p>
            </>
          ) : (
            <p>Pick dates first</p>
          )}
        </SStudioCreateReservationSummary>
      </SStudioCreateReservationBottomPart>
      <SStudioCreateReservationBookBtn disabled={!startDate || !endDate} onClick={handleBook}>Book</SStudioCreateReservationBookBtn>
    </SStudioCreateReservation>
  );
};

