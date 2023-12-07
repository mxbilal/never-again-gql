import { VariantOptions } from "@/types";

import Sellouts from "../assets/images/sellouts.svg"
import Liars from "../assets/images/liars.svg"

export const getPeopleTypeImage = (variant: VariantOptions ) => {
    if (variant === 'celebrity') {
        return Sellouts;
      } else {
        return Liars;
      }
};
