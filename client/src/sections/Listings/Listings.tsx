import { server, useQuery } from "../../lib/api";
import {
  ListingsData,
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
  const { data, refetch } = useQuery<ListingsData>(LISTINGS);

  const deleteListing = async (id: string) => {
    await server.fetch<DeleteListingData, DeleteListingVariables>({
      query: DELETE_LISTING,
      variables: {
        id,
      },
    });
    refetch();
  };

  const listings = data ? data.listings : null;

  const listingList = listings ? (
    <div>
      {listings.map((listing) => {
        return (
          <div
            className="flex py-8 px-2 pr-4 border-b shadow-sm hover:shadow-lg cursor-pointer hover:opacity-80 rounded-lg
            active:bg-gray-100 transition duration-100 ease-out first:border-t"
          >
            <div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0 hover:scale-105 transition transform ease-out">
              <img
                src={listing.image}
                alt={listing.title}
                className="rounded-2xl"
              />
            </div>
            <div className="flex flex-col flex-grow pl-5">
              <div className="flex justify-between">
                <p>{listing.address}</p>
              </div>
              <h4 className="text-xl">{listing.title}</h4>
              <div className="border-b w-10 pt-2" />
              <p className="text-sm pt-2 text-gray-500 flex-grow">
                number of guests: {listing.numOfGuests} {" | Beds: "}{" "}
                {listing.numOfBeds} {" | Baths: "} {listing.numOfBaths}
              </p>

              <div className="flex justify-between items-end pt-5">
                <div>
                  <p className="text-lg lg:text-2xl font-semibold pb-2">
                    ${listing.price}
                  </p>
                  <button
                    className="px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 
                    active:bg-red-50 transition transform duration-100 ease-out"
                    onClick={() => deleteListing(listing.id.toString())}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  ) : null;

  return (
    <div>
      <h1 className="text-gray-900 p-5 text-4xl border-b shadow-sm">{title}</h1>
      {listingList}
    </div>
  );
};
