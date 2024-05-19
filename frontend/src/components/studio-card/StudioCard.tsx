import React, { PropsWithChildren } from "react";
import { SStudioCard } from "./styles/SStudioCard";
import { components } from "@/ts-types";
import { SStudioCardImage } from "./styles/SStudioCardImage";
import { SStudioCardName } from "./styles/SStudioCardName";
import { SStudioCardLocation } from "./styles/SStudioCardLocation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { SStudioCardBottomPart } from "./styles/SStudioCardBottomPart";
import { SStudioCardBookBtn } from "./styles/SStudioCardBookBtn";
import Link from "next/link";
import { IStudio } from "@/src/constants/types";

export const StudioCard: React.FC<
  PropsWithChildren<IStudio>
> = ({ name, location, images, id, ...props }) => {
  return (
    <SStudioCard>
      <Link passHref href={`/studios/${id}/`}>
        <SStudioCardImage>
          <img src={images?.[0]?.image} />
        </SStudioCardImage>
        <SStudioCardBottomPart>
          <SStudioCardName>{name}</SStudioCardName>
          <SStudioCardLocation>
            <LocationOnIcon />
            {location}
          </SStudioCardLocation>
          <SStudioCardBookBtn>Book Now</SStudioCardBookBtn>
        </SStudioCardBottomPart>
      </Link>
    </SStudioCard>
  );
};
