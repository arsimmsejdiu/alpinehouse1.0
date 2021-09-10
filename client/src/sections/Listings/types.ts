interface Listing {
  id: number;
  title: string;
  image: string;
  address: string;
  price: number;
  numOfGuests: number;
  numOfBeds: number;
  numOfBaths: number;
}

export interface ListingData {
  listings: Listing[];
}

export interface DeleteListingData {
  deleteListing: Listing;
}

export interface DeleteListingVariables {
  id: string;
}