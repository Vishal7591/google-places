export interface PlacesType {
  address_components?: AddressComponents[];
  formatted_address?: string;
  geometry?: Geometry;
  place_id?: string;
  types?: string[];
}

export interface AddressComponents {
  long_name?: string;
  short_name?: string;
  types?: string[];
}

export interface Geometry {
  bounds?: Bounds;
  location?: Location;
  location_type?: string;
  viewport?: Bounds;
}

export interface Bounds {
  east?: number;
  north?: number;
  south?: number;
  west?: number;
}

export interface Location {
  lat?: number;
  lng?: number;
}

export interface Options {
  [index: number]: {
    key: string;
    text: string;
  }[];
}

export interface Validations {
  [index: number]: {
    type: string;
    message: string;
  }[];
}

export type InputType = Text | Radio | Select | Number | Date | Checkbox;

export type Text = "text";

export type Radio = "radio";

export type Select = "select";

export type Number = "number";

export type Date = "date";

export type Checkbox = "checkbox";
