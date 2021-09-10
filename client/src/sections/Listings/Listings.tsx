//import React, { FunctionComponent } from "react";
import { server } from "../../lib/api/server";
import {
  ListingData,
  DeleteListingData,
  DeleteListingVariables,
} from "./types";

const LISTINGS = `
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`;

const DELETE_LISTING = `
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`;

interface Props {
  title: string;
}

export const Listings = ({ title }: Props) => {
  const fetchListings = async () => {
    const { data } = await server.fetch<ListingData>({ query: LISTINGS });
    console.log(data);
  };

  const deleteListings = async () => {
    const { data } = await server.fetch<
      DeleteListingData,
      DeleteListingVariables
    >({
      query: DELETE_LISTING,
      variables: {
        id: "60cc917609fbbd0e7c31ee48",
      },
    });
    console.log(data);
  };

  return (
    <div>
      <h1>{title}</h1>
      <button onClick={fetchListings}>Query Listings</button>
      <button onClick={deleteListings}>Delete a Listings</button>
    </div>
  );
};
