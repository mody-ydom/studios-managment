import {retrieveStudio, retrieveUser} from "@/services/apiServices";
import {SReservationCardCancelBtn} from "@/src/components/reservation-card/styles/SReservationCardCancelBtn";
import {SReservationCardProp} from "@/src/components/reservation-card/styles/SReservationCardProp";
import {SReservationCardStudioName} from "@/src/components/reservation-card/styles/SReservationCardStudioName";
import {IUser, IReservation, IStudio} from "@/src/constants/types";
import {differenceInCalendarDays, format, parseISO} from "date-fns";
import React from 'react';
import {SReservationCard} from './styles/SReservationCard';

export const ReservationCard: React.FC<IReservation & { cancelHandler?: () => void }> = ({
                                                                                           id,
                                                                                           start,
                                                                                           end,
                                                                                           studio: studioId,
                                                                                           customer: customerId,
                                                                                           cancelHandler,
                                                                                           status,
                                                                                         }) => {
  const [studio, setStudio] = React.useState<IStudio | null>(null);
  const [customer, setCustomer] = React.useState<IUser | null>(null);
  
  React.useEffect(() => {
    retrieveUser({params: {id: customerId}})
      .then(({data}) => {
        setCustomer(data)
      })
  }, [customerId]);
  
  React.useEffect(() => {
    retrieveStudio({params: {id: studioId}})
      .then(({data}) => {
        setStudio(data)
      })
  }, [studioId]);
  const numberOfDays = React.useRef(differenceInCalendarDays(parseISO(end), parseISO(start)) + 1);
  const date = format(parseISO(start), 'dd MMM yyyy');
  return (
    <SReservationCard>
      <SReservationCardStudioName>
        {studio?.name || 'loading..'}
      </SReservationCardStudioName>
      <SReservationCardProp>
        <h3>Customer name</h3>
        <h4>{customer?.username || 'loading...'}</h4>
      </SReservationCardProp>
      <SReservationCardProp halfWidth>
        <h3>Date</h3>
        <h4>{date}</h4>
      </SReservationCardProp>
      <SReservationCardProp halfWidth>
        <h3>Number of days</h3>
        <h4>{numberOfDays.current} day{numberOfDays.current !== 1 && 's'}</h4>
      </SReservationCardProp>
      {cancelHandler && <>
        <hr/>
        <SReservationCardCancelBtn onClick={cancelHandler}>Cancel</SReservationCardCancelBtn>
      </>}
    </SReservationCard>
  )
}
