import { Collection, ObjectID } from 'mongodb';

export interface Listings {
    _id: ObjectID;
    title: String;
    image: String;
    address: String;
    price: Number;
    numOfGuests: Number;
    numOfBeds: Number;
    numOfBaths: Number;
    rating: Number;
}

export interface Database {
    listings: Collection;
}