import {listStudios, retrieveStudio} from "@/services/apiServices";
import StudioForm from "@/src/components/form/StudioForm";
import {PageWrapper} from "@/src/components/page-wrapper/PageWrapper";
import {StudioCreateReservation} from "@/src/components/studio-create-reservation/StudioCreateReservation";
import {StudioDetails} from "@/src/components/studio-details/StudioDetails";
import {IStudio} from "@/src/constants/types";
import {RootState} from "@/store";
import {GetStaticPaths, GetStaticProps} from "next";
import {useRouter} from "next/router";
import {useState, useEffect} from "react";
import {useSelector} from "react-redux";


const StudioPage: React.FC = () => {
  const router = useRouter();
  const {user} = useSelector((state: RootState) => state.user);
  
  useEffect(() => {
    (user && user.user_type !== 'studio_owner') && router.replace('/404');
  }, [user?.user_type]);
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  
  return <PageWrapper> <StudioForm/> </PageWrapper>
  
}

export default StudioPage;
