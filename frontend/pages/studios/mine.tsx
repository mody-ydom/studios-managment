import CustomButton from "@/src/components/form/Button";
import {PageWrapper} from "@/src/components/page-wrapper/PageWrapper";
import {ReservationNav} from "@/src/components/reservation-nav/ReservationNav";
import {RootState} from "@/store";
import styled from "@emotion/styled";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { listStudios } from "@/services/apiServices"; // adjust the import path as necessary
import {StudioCard} from "@/src/components/studio-card/StudioCard";
import { Box } from "@mui/material";
import { IStudio } from "@/src/constants/types";
import {useSelector} from "react-redux";

const AddStudioButton = styled(({className})=><Link className={className} href={'/studios/create/'}>
  Add new studio
</Link>)`
  
  background: #1EABE3;
  border-radius: 20px;
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  color: #FFFFFF;
  padding: 20px;
  margin-left: auto;

`


const StudiosPage: React.FC = () => {
  const [studios, setStudios] = useState<IStudio[]>([]);
  const [nextPage, setNextPage] = useState<boolean>(false);
  const [prevPage, setPrevPage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
const {user} = useSelector((state: RootState)=>state.user);
  useEffect(() => {
    (user && user?.user_type !== 'studio_owner') && router.replace('/404');
  
    const fetchData = async () => {
      setLoading(true);
      try {
        const { capacity, location, page, page_size } = router.query;
        const query = {
          capacity: +(capacity as string) || undefined,
          location: location as string,
          owner: user?.id,
          page: +(page as string) || undefined,
          page_size: +(page_size as string) || undefined,
        };
        const { data } = await listStudios({ query });
        setStudios(data.results);
        setNextPage(!!data.next);
        setPrevPage(!!data.previous);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      }
      setLoading(false);
    };

    if (router.isReady) {
      fetchData();
    }
  }, [router.isReady, router.query, user?.id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <PageWrapper>
      <h1 style={{display:'flex'}}><span>Studios</span> <AddStudioButton/></h1>
      <ReservationNav links={[
        {label: 'Reservation', href: '/reservations'},
        {label: 'Past Reservation', href: '/reservations/past'},
        {label: 'Cancelled Reservation', href: '/reservations/cancelled'},
        ...(user?.user_type === 'studio_owner' ? [{label: 'My studios', href: `/studios/mine`}] : [])
      ]}/>
      <Box display={'flex'} flexWrap={'wrap'} gap={3} bgcolor={'#F7F8FA'}>
        {studios.map((studio) => (
          <StudioCard key={studio.id} {...studio}/>
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
            onClick={() =>
              router.push(`/studios/mine?page=${Number(router.query.page || 2) - 1}`)
            }
          >
            Previous
          </CustomButton>
        )}
        {nextPage && (
          <CustomButton
            variant={"contained"}
            onClick={() =>
              router.push(`/studios/mine?page=${Number(router.query.page || 1) + 1}`)
            }
          >
            Next
          </CustomButton>
        )}
      </div>
    </PageWrapper>
  );
};

export default StudiosPage;
