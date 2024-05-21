import {deleteStudio} from "@/services/apiServices";
import {RootState} from "@/store";
import {router} from "next/client";
import React, {PropsWithChildren, useState} from "react";
import {useSelector} from "react-redux";
import {SStudioDetails} from "./styles/SStudioDetails";
import {IStudio} from "@/src/constants/types";
import {SStudioDetailsMainImage} from "./styles/SStudioDetailsMainImage";
import {SStudioDetailsName} from "./styles/SStudioDetailsName";
import {SStudioDetailsPrice} from "./styles/SStudioDetailsPrice";
import {SStudioDetailsLocation} from "./styles/SStudioDetailsLocation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {SStudioDetailsDirections} from "./styles/SStudioDetailsDirections";
import {SStudioDetailsSliderImages} from "./styles/SStudioDetailsSliderImages";
import {SStudioDetailsBookBtn} from "./styles/SStudioDetailsBookBtn";
import {SStudioDetailsBottomPart} from "./styles/SStudioDetailsBottomPart";
import Link from "next/link";
import {SStudioDetailsGridImages} from "./styles/SStudioDetailsGridImages";
import {Rating} from "@mui/material";
import {SStudioDetailsRating} from "./styles/SStudioDetailsRating";
import useMedia from "@/src/hooks/useMedia";
import {BREAKPOINTS} from "@/src/constants/styles/mediaquerys";
import CustomDateRangePicker from "../form/DatePicker";
import {Range} from "react-date-range";

const googleMapsUrl = (destinationAddress: string) =>
  `https://www.google.com/maps/dir/?api=1&destination=${destinationAddress}`;

export const StudioDetails: React.FC<IStudio> = ({
                                                   name,
                                                   location='',
                                                   id,
                                                   images,
                                                   capacity,
                                                   reserved_periods,
  owner,
                                                   ...props
                                                 }) => {
  const {user} = useSelector((state: RootState) => state.user);
  
  const [rating, setRating] = useState(4.5);
  const media = useMedia();
  const handleDelete = () => {
    deleteStudio({params: {id}}).then(() => {
      router.replace('/studios/mine/')
    }).catch(console.error)
  }
  
  return (
    <SStudioDetails>
      <SStudioDetailsMainImage>
        <img src={images?.[0]?.image}/>
        <div>
          <SStudioDetailsName>{name}</SStudioDetailsName>
          <SStudioDetailsPrice>EG {capacity}</SStudioDetailsPrice>
        </div>
      </SStudioDetailsMainImage>
      <SStudioDetailsGridImages>
        {images?.slice(0, 5).map(({id, image}) => (
          <img key={id} src={image}/>
        ))}
      </SStudioDetailsGridImages>
      <SStudioDetailsBottomPart>
        {media !== BREAKPOINTS.BRONZE && (
          <>
            <SStudioDetailsName>{name}</SStudioDetailsName>
            {user?.user_type === 'customer' ?
              <Link passHref href={`/studios/${id}/book/`}>
                <SStudioDetailsBookBtn>Book Studio</SStudioDetailsBookBtn>
              </Link>
              :
              ((user.user_type==='admin' || user?.id===owner)&&<Link passHref href={`/studios/${id}/edit/`}>
              <SStudioDetailsBookBtn>Edit</SStudioDetailsBookBtn>
              </Link>)
            }
            <div style={{width: '100%'}}/>
            <SStudioDetailsRating>
              {rating}
              <Rating
                name="half-rating-read"
                value={rating}
                precision={0.5}
                color="#11141A"
                onChange={(_, c) => setRating(c || (0 as number))}
              />{" "}
              (195)
            </SStudioDetailsRating>
            {(user.user_type==='admin' || user?.id===owner) &&
                <SStudioDetailsBookBtn as={'button'} onClick={handleDelete} outlined>Delete</SStudioDetailsBookBtn>
            }
          </>
        )}
        
        <SStudioDetailsLocation>
          <h3>Location</h3>
          <LocationOnIcon/>
          <p>{location}</p>
          <SStudioDetailsDirections
            href={googleMapsUrl(location)}
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
          >
            Get directions
          </SStudioDetailsDirections>
        </SStudioDetailsLocation>
        <SStudioDetailsSliderImages></SStudioDetailsSliderImages>
        {media === BREAKPOINTS.BRONZE && (
          <Link passHref href={`/studios/${id}/book/`}>
            <SStudioDetailsBookBtn>Book Studio</SStudioDetailsBookBtn>
          </Link>
        )}
      </SStudioDetailsBottomPart>
    </SStudioDetails>
  );
};
