import { GeocodeResult } from "use-places-autocomplete";

export const initialState = {
  common: {
    loading: false as boolean,
    error: "" as string,
    success: false as boolean,
    contents: [] as GeocodeResult[],
  },
};
