import CustomButton from "@/src/components/form/Button";
import {PageWrapper} from "@/src/components/page-wrapper/PageWrapper";
import { ReservationCard } from "@/src/components/reservation-card/ReservationCard";
import {ReservationNav} from "@/src/components/reservation-nav/ReservationNav";
import { RootState } from "@/store";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { listReservations, updateReservation } from "@/services/apiServices";
import { Box } from "@mui/material";
import { IReservation } from "@/src/constants/types";
import { useSelector } from "react-redux";

const ReservationsPage: React.FC = () => {
  const [reservations, setReservations] = useState<IReservation[]>([]);
  const [nextPage, setNextPage] = useState<boolean>(false);
  const [prevPage, setPrevPage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.user);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const {page, page_size} = router.query;
        const query: {
          customer?: number | undefined;
          owner?: number | undefined;
          page?: number | undefined;
          page_size?: number | undefined;
          past?: boolean | undefined;
          status?: "active" | "cancelled" | undefined;
          studio?: number | undefined;
          upcoming?: boolean | undefined;
        } = {
          upcoming: true, status: "active",
          page: +(page as string) || undefined,
          page_size: +(page_size as string) || undefined,
        };
        console.log(user);
        if (user?.id && user?.user_type) {
          const type = user.user_type === "customer" ? "customer" : "owner";
          query[type] = user.id;
        }
        
        const { data } = await listReservations({ query });
        setReservations(data.results);
        setNextPage(!!data.next);
        setPrevPage(!!data.previous);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      }
      setLoading(false);
    };
    console.log(user)
    if (router.isReady && user?.id) {
      fetchData();
    }
  }, [router.isReady, router.query, user?.id]);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  const handleCancelReservation = async (reservation:IReservation) => {
    try {
      await updateReservation({params: {id: reservation.id}, body: {...reservation,status: 'cancelled'}});
      router.replace(
        `/reservations?page=${Number(router.query.page || 1) }`
      )
    } catch (error) {
      console.error('Failed to cancel reservation:', error);
      // Optionally handle this error by showing a message to the user
    }
  };
  return (
    <PageWrapper>
      <ReservationNav links={[
        {label:'Reservation',href:'/reservations'},
        {label:'Past Reservation',href:'/reservations/past'},
        {label:'Cancelled Reservation',href:'/reservations/cancelled'},
        ...(user?.user_type === 'studio_owner' ? [{label: 'My studios', href: `/studios/mine`}] : [])
      ]}/>
      <Box display={"flex"} flexWrap={"wrap"} gap={3} bgcolor={"#F7F8FA"}>
        {reservations.map((reservation) => (
          <ReservationCard
            key={reservation.id}
            {...reservation}
            cancelHandler={() => handleCancelReservation(reservation)}
          />
        ))}
      </Box>
      <div
        style={{
          display: "flex",
          gap: 20,
          justifyContent: "center",
          marginBlock: 30,
        }}
      >
        {prevPage && (
          <CustomButton
            variant={"contained"}
            disabled={!router.query.page || Number(router.query.page) <= 1}
            onClick={() => {
              const type = user?.user_type === "customer" ? "customer" : "owner";
              return router.push(`/reservations?status=active&${type}=${user?.id}&page=${Number(router.query.page || 2) - 1}`);
            }
            }
          >
            Previous
          </CustomButton>
        )}
        {nextPage && (
          <CustomButton
            variant={"contained"}
            onClick={() => {
              const type = user?.user_type === "customer" ? "customer" : "owner";
              return router.push(`/reservations?status=active&${type}=${user?.id}&page=${Number(router.query.page || 1) + 1}`);
            }
            }
          >
            Next
          </CustomButton>
        )}
      </div>
    </PageWrapper>
  );
};

export default ReservationsPage;
