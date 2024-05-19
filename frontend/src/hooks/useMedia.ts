import React from "react";
import { BREAKPOINTS } from "../constants/styles/mediaquerys";

export default function useMedia(): number {
  const [media, setMedia] = React.useState(0);

  React.useEffect(() => {
    // Handler to call on window resize

    function handleResize() {
      if (window.innerWidth >= BREAKPOINTS.DIAMOND)
        setMedia(BREAKPOINTS.DIAMOND);
      else if (window.innerWidth >= BREAKPOINTS.PLATINUM)
        setMedia(BREAKPOINTS.PLATINUM);
      else if (window.innerWidth >= BREAKPOINTS.GOLD)
        setMedia(BREAKPOINTS.GOLD);
      else if (window.innerWidth >= BREAKPOINTS.SILVER)
        setMedia(BREAKPOINTS.SILVER);
      else setMedia(BREAKPOINTS.BRONZE);
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return media;
}
