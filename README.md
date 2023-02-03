# rss-feed-parser
A program that fetches and stores data from an RSS feed and provides an endpoint to retrieve the data. The API is built using Node.js, Express, MongoDB, and cron.

## Installation
1. Clone the repository:
```
git clone https://github.com/Zouheir-Barhoumi/rss-feed-parser.git
```

2. Change into the project directory: 
```
cd rss-feed-parser
```

3. Install the required dependencies: 
```
npm install 
```

4. Create a .env file with the following environment variables:
```
npm install MONGO_URI=mongodb://<username>:<password>@<hostname>:<port>/<database-name>
PORT=8080
```

5. Start the API:
```
npm start
```

## Usage
The API provides the following endpoint to retrieve the stored RSS feed data:
```
GET /api/rss_feed
```
The data is fetched from the TechCrunch RSS feed and stored in a MongoDB collection. The cron job is set to fetch the data every minute. You can change the URL of the feed and the cron schedule in the main function.

## License
This project is licensed under the GNU General Public License v3. See the LICENSE file for details.
