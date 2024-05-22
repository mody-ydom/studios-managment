import { listStudios, retrieveStudio } from "@/services/apiServices";
import {PageWrapper} from "@/src/components/page-wrapper/PageWrapper";
import { StudioDetails } from "@/src/components/studio-details/StudioDetails";
import { IStudio } from "@/src/constants/types";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";


const StudioPage: React.FC = () => {
  const router = useRouter();
  const [studio, setStudio] = useState<IStudio|null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { id } = router.query;
        const params = {
          id: +(id as string),
        };

        const { data } = await retrieveStudio({ params });
        setStudio(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      }
      setLoading(false);
    }
    if (router.isReady) {
      fetchData();
    }
  }, [router.isReady, router.query]);
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return studio?
    <PageWrapper>
    <StudioDetails {...studio}/>
  </PageWrapper>
    :<div>Loading</div>
  
}

export default StudioPage;
