/**
 * Type for an advertisement.
 * @property {string} id - The UUID of the advertisement.
 * @property {string} photo - The URL of the photo for the advertisement.
 * @property {string} url - The URL linked from the advertisement.
 * @property {string} alternate_name - The alternate name for the advertisement.
 * @property {number} priority - The priority of the advertisement.
 */
export type Advertisement = {
    id:             string;
    photo:          string;
    url:            string;
    alternate_name: string;
    priority:       number;
}
