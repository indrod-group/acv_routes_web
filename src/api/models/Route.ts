/**
 * Represents a route with an ID, name, and an array of positions.
 */
export type Route = {
    /** The unique identifier of the route. */
    id: number;

    /** The name of the route. */
    name: string;

    /** An array of positions that make up the route. */
    positions: PositionElement[];
}

/**
 * Represents a position element with an ID, position data, order, distance, and estimated time.
 */
export type PositionElement = {
    /** The unique identifier of the position element. */
    id: number;

    /** The position data. */
    position: PositionPosition;

    /** The order of the position in the route. */
    order: number;

    /** The distance of the position. Currently not used (null). */
    distance: null;

    /** The estimated time to reach the position. Currently not used (null). */
    estimated_time: null;
}

/**
 * Represents the position data with an ID, name, latitude, and longitude.
 */
export type PositionPosition = {
    /** The unique identifier of the position data. */
    id: number;

    /** The name of the position. */
    name: string;

    /** The latitude of the position. */
    lat: string;

    /** The longitude of the position. */
    lng: string;
}
