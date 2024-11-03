export type License = {
    [x: string]: string | number | Date;
    id:          number;
    type: string;
    issue_date:  string;
    expiry_date: string;
    points:      number;
    front_image: string;
    back_image:  string;
    driver:      string;
}
