const express = require("express");
const feedparser = require("feedparser-promised");
const mongoose = require("mongoose");
const cron = require("node-cron");
require("dotenv").config({ path: ".env" });

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the Mongoose schema for the rss_feed collection
const rssFeedSchema = new mongoose.Schema({
  title: String,
  author: String,
  published: Date,
  content: String,
});

// Create a Mongoose model for the rss_feed collection
const RssFeed = mongoose.model("rss_feed", rssFeedSchema);

async function main() {
  // Define the URL of the RSS feed
  const feed_url = "https://techcrunch.com/feed/";

  // Fetch the RSS feed data
  const feed = await feedparser.parse(feed_url);

  // Extract information from the feed
  for (let i = 0; i < feed.length; i++) {
    const entry = feed[i];
    const title = entry.title;
    const author = entry.author;
    const published = entry.pubDate;
    const summary = entry.summary;
    const content = entry.description;

    // Store the extracted data in MongoDB using Mongoose
    const rssFeed = new RssFeed({
      title: title,
      author: author,
      published: published,
      summary: summary,
      content: content,
    });

    await rssFeed.save();
  }

  // Close the connection to MongoDB
  await mongoose.connection.close();
}

cron.schedule(
  "0 0 * * *",
  async function () {
    console.log("running a task every minute");
    await main();
  },
  {
    scheduled: true,
    timezone: "Africa/Tunis",
  }
);

// Create the Express application
const app = express();

// Define the API endpoint for retrieving the RSS feed data from MongoDB
app.get("/api/rss_feed", async (req, res) => {
  try {
    const rssFeeds = await RssFeed.find({});
    res.status(200).json(rssFeeds);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start the Express application
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`RSS feed API running on port ${port}`);
});
