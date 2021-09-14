import { useQuery, useMutation } from "../../lib/api";
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
  const { data, refetch, error, loading } = useQuery<ListingsData>(LISTINGS);

  const [
    deleteListing,
    { loading: deleteListingLoading, error: deleteListingError },
  ] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING);

  const handleDeleteListing = async (id: string) => {
    await deleteListing({ id });
    refetch();
  };

  const listings = data ? data.listings : null;

  const listingList = listings ? (
    <div>
      {listings.map((listing) => {
        return (
          <div
            key={listing.id}
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
                    onClick={() => handleDeleteListing(listing.id.toString())}
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

  if (loading) {
    return (
      <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
        <span
          className="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0"
          style={{ top: "50%" }}
        >
          <i className="fas fa-circle-notch fa-spin fa-5x"></i>
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
        <span
          className="text-red-600 bg-red-200 text-3xl p-5 opacity-75 top-1/2 my-0 mx-auto flex items-center justify-center relative w-[300] h-[200]"
          style={{ top: "50%" }}
        >
          <h2 className="animate-bounce">
            Uh oh! Something went wrong - please try again later ...{" "}
          </h2>
        </span>
      </div>
    );
  }

  const deleteListingLoadingMessage = deleteListingLoading ? (
    <h4>Deletion in progress...</h4>
  ) : null;

  const deleteListingErrorMessage = deleteListingError ? (
    <h4>
      Uh oh! Something went wrong with deleting :(. Please try again soon.
    </h4>
  ) : null;

  return (
    <div>
      <h1 className="text-gray-900 p-10 text-4xl mt-10 animate-pulse font-bold">
        {title}
      </h1>
      {listingList}
      {deleteListingLoadingMessage}
      {deleteListingErrorMessage}
    </div>
  );
};
