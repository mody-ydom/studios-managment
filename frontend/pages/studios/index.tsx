import CustomButton from "@/src/components/form/Button";
import { PageWrapper } from "@/src/components/page-wrapper/PageWrapper";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { listStudios } from "@/services/apiServices"; // adjust the import path as necessary
import { StudioCard } from "@/src/components/studio-card/StudioCard";
import { Box } from "@mui/material";
import { IStudio } from "@/src/constants/types";

const StudiosPage: React.FC = () => {
  const [studios, setStudios] = useState<IStudio[]>([]);
  const [nextPage, setNextPage] = useState<boolean>(false);
  const [prevPage, setPrevPage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { capacity, location, owner, page, page_size } = router.query;
        const query = {
          capacity: +(capacity as string) || undefined,
          location: location as string,
          owner: +(owner as string) || undefined,
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
  }, [router.isReady, router.query]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <PageWrapper>
      <h1>Studios</h1>
      <Box display={"flex"} flexWrap={"wrap"} gap={3} bgcolor={"#F7F8FA"}>
        {studios.map((studio) => (
          <StudioCard key={studio.id} {...studio} />
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
              router.push(`/studios?page=${Number(router.query.page || 2) - 1}`)
            }
          >
            Previous
          </CustomButton>
        )}
        {nextPage && (
          <CustomButton
            variant={"contained"}
            onClick={() =>
              router.push(`/studios?page=${Number(router.query.page || 1) + 1}`)
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
