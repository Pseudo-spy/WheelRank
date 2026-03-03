export interface Ride {
  start: string;
  end: string;
  category: string;
  from: string;
  to: string;
  miles: number;
  purpose: string;
}

export const ridesData: Ride[] = [
  { start: "01-01-2016 21:11", end: "01-01-2016 21:17", category: "Business", from: "Fort Pierce", to: "Fort Pierce", miles: 5.1, purpose: "Meal/Entertain" },
  { start: "01-02-2016 01:25", end: "01-02-2016 01:37", category: "Business", from: "Fort Pierce", to: "Fort Pierce", miles: 5.0, purpose: "Meeting" },
  { start: "01-02-2016 20:25", end: "01-02-2016 20:38", category: "Business", from: "Fort Pierce", to: "Fort Pierce", miles: 4.8, purpose: "Errand/Supplies" },
  { start: "01-05-2016 17:31", end: "01-05-2016 17:45", category: "Business", from: "Fort Pierce", to: "Fort Pierce", miles: 4.7, purpose: "Meeting" },
  { start: "01-06-2016 14:42", end: "01-06-2016 15:49", category: "Business", from: "Fort Pierce", to: "West Palm Beach", miles: 63.7, purpose: "Customer Visit" },
  { start: "01-06-2016 17:15", end: "01-06-2016 17:19", category: "Business", from: "West Palm Beach", to: "West Palm Beach", miles: 4.3, purpose: "Meal/Entertain" },
  { start: "01-06-2016 17:30", end: "01-06-2016 17:35", category: "Business", from: "West Palm Beach", to: "Palm Beach", miles: 7.1, purpose: "Meeting" },
  { start: "01-07-2016 13:27", end: "01-07-2016 13:33", category: "Business", from: "Cary", to: "Cary", miles: 0.8, purpose: "Meeting" },
  { start: "01-10-2016 08:05", end: "01-10-2016 08:25", category: "Business", from: "Cary", to: "Morrisville", miles: 8.3, purpose: "Meeting" },
  { start: "01-10-2016 12:17", end: "01-10-2016 12:44", category: "Business", from: "Jamaica", to: "New York", miles: 16.5, purpose: "Customer Visit" },
  { start: "01-10-2016 15:08", end: "01-10-2016 15:51", category: "Business", from: "New York", to: "Queens", miles: 10.8, purpose: "Meeting" },
  { start: "01-10-2016 18:18", end: "01-10-2016 18:53", category: "Business", from: "Elmhurst", to: "New York", miles: 7.5, purpose: "Meeting" },
  { start: "01-10-2016 19:12", end: "01-10-2016 19:32", category: "Business", from: "Midtown", to: "East Harlem", miles: 6.2, purpose: "Meeting" },
  { start: "01-11-2016 08:55", end: "01-11-2016 09:21", category: "Business", from: "East Harlem", to: "NoMad", miles: 6.4, purpose: "Temporary Site" },
  { start: "01-11-2016 11:56", end: "01-11-2016 12:03", category: "Business", from: "Flatiron District", to: "Midtown", miles: 1.6, purpose: "Errand/Supplies" },
  { start: "01-11-2016 13:32", end: "01-11-2016 13:46", category: "Business", from: "Midtown", to: "Midtown East", miles: 1.7, purpose: "Meal/Entertain" },
  { start: "01-11-2016 14:30", end: "01-11-2016 14:43", category: "Business", from: "Midtown East", to: "Midtown", miles: 1.9, purpose: "Meal/Entertain" },
  { start: "01-12-2016 12:33", end: "01-12-2016 12:49", category: "Business", from: "Midtown", to: "Hudson Square", miles: 1.9, purpose: "Meal/Entertain" },
  { start: "01-12-2016 12:53", end: "01-12-2016 13:09", category: "Business", from: "Hudson Square", to: "Lower Manhattan", miles: 4.0, purpose: "Meal/Entertain" },
  { start: "01-12-2016 14:42", end: "01-12-2016 14:56", category: "Business", from: "Lower Manhattan", to: "Hudson Square", miles: 1.8, purpose: "Errand/Supplies" },
  { start: "01-12-2016 15:13", end: "01-12-2016 15:28", category: "Business", from: "Hudson Square", to: "Hell's Kitchen", miles: 2.4, purpose: "Customer Visit" },
  { start: "01-12-2016 15:42", end: "01-12-2016 15:54", category: "Business", from: "Hell's Kitchen", to: "Midtown", miles: 2.0, purpose: "Errand/Supplies" },
  { start: "01-12-2016 16:02", end: "01-12-2016 17:00", category: "Business", from: "New York", to: "Queens County", miles: 15.1, purpose: "Meeting" },
  { start: "1/13/2016 13:54", end: "1/13/2016 14:07", category: "Business", from: "Downtown", to: "Gulfton", miles: 11.2, purpose: "Meeting" },
  { start: "1/13/2016 15:00", end: "1/13/2016 15:28", category: "Business", from: "Gulfton", to: "Downtown", miles: 11.8, purpose: "Meeting" },
  { start: "1/14/2016 16:29", end: "1/14/2016 17:05", category: "Business", from: "Houston", to: "Houston", miles: 21.9, purpose: "Customer Visit" },
  { start: "1/14/2016 21:39", end: "1/14/2016 21:45", category: "Business", from: "Eagan Park", to: "Jamestown Court", miles: 3.9, purpose: "Errand/Supplies" },
  { start: "1/15/2016 0:41", end: "1/15/2016 1:01", category: "Business", from: "Morrisville", to: "Cary", miles: 8.0, purpose: "Errand/Supplies" },
  { start: "1/15/2016 11:43", end: "1/15/2016 12:03", category: "Business", from: "Cary", to: "Durham", miles: 10.4, purpose: "Meal/Entertain" },
  { start: "1/15/2016 13:26", end: "1/15/2016 13:44", category: "Business", from: "Durham", to: "Cary", miles: 10.4, purpose: "Meal/Entertain" },
  { start: "1/18/2016 14:55", end: "1/18/2016 15:06", category: "Business", from: "Cary", to: "Cary", miles: 4.8, purpose: "Meal/Entertain" },
  { start: "1/18/2016 16:13", end: "1/18/2016 16:24", category: "Business", from: "Farmington Woods", to: "Whitebridge", miles: 4.7, purpose: "Meal/Entertain" },
  { start: "1/19/2016 9:09", end: "1/19/2016 9:23", category: "Business", from: "Whitebridge", to: "Lake Wellingborough", miles: 7.2, purpose: "Meeting" },
  { start: "1/19/2016 10:55", end: "1/19/2016 11:09", category: "Business", from: "Lake Wellingborough", to: "Whitebridge", miles: 7.6, purpose: "Temporary Site" },
  { start: "1/20/2016 10:36", end: "1/20/2016 11:11", category: "Business", from: "Cary", to: "Raleigh", miles: 17.1, purpose: "Meeting" },
  { start: "1/20/2016 11:48", end: "1/20/2016 12:19", category: "Business", from: "Fayetteville Street", to: "Umstead", miles: 15.1, purpose: "Meeting" },
  { start: "1/20/2016 13:25", end: "1/20/2016 14:19", category: "Business", from: "Raleigh", to: "Cary", miles: 40.2, purpose: "Customer Visit" },
  { start: "1/21/2016 14:25", end: "1/21/2016 14:29", category: "Business", from: "Cary", to: "Cary", miles: 1.6, purpose: "Errand/Supplies" },
  { start: "1/21/2016 14:43", end: "1/21/2016 14:51", category: "Business", from: "Cary", to: "Cary", miles: 2.4, purpose: "Meal/Entertain" },
  { start: "1/21/2016 16:01", end: "1/21/2016 16:06", category: "Business", from: "Cary", to: "Cary", miles: 1.0, purpose: "Meal/Entertain" }
];
