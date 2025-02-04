require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Helper function for API requests
async function makeApiRequest(url) {
  try {
    const response = await axios.get(url);
    return {
      status: 200,
      success: true,
      message: "Successfully fetched the data",
      data: response.data,
    };
  } catch (error) {
    console.error("API request error:", error.response ? error.response.data : error);
    return {
      status: 500,
      success: false,
      message: "Failed to fetch data from the API",
      error: error.response ? error.response.data : error.message,
    };
  }
}

// Fetch all news
app.get("/all-news", async (req, res) => {
  const { page = 1, pageSize = 12, q = "world" } = req.query;
  const offset = (page - 1) * pageSize;

  const url = `http://api.mediastack.com/v1/news?access_key=${process.env.MEDIASTACK_API_KEY}&keywords=${q}&limit=${pageSize}&offset=${offset}`;
  const result = await makeApiRequest(url);

  if (result.success) {
    // Map MediaStack response to match the expected frontend structure
    const mappedData = {
      totalResults: result.data.pagination.total,
      articles: result.data.data.map(article => ({
        title: article.title,
        description: article.description,
        url: article.url,
        urlToImage: article.image,
        publishedAt: article.published_at,
        source: {
          name: article.source,
        },
      })),
    };
    res.status(200).json({ success: true, data: mappedData });
  } else {
    res.status(500).json(result);
  }
});

// Fetch top headlines
app.get("/top-headlines", async (req, res) => {
  const { page = 1, pageSize = 12, category = "general" } = req.query;
  const offset = (page - 1) * pageSize;

  const url = `http://api.mediastack.com/v1/news?access_key=${process.env.MEDIASTACK_API_KEY}&categories=${category}&limit=${pageSize}&offset=${offset}`;
  const result = await makeApiRequest(url);

  if (result.success) {
    // Map MediaStack response to match the expected frontend structure
    const mappedData = {
      totalResults: result.data.pagination.total,
      articles: result.data.data.map(article => ({
        title: article.title,
        description: article.description,
        url: article.url,
        urlToImage: article.image,
        publishedAt: article.published_at,
        source: {
          name: article.source,
        },
      })),
    };
    res.status(200).json({ success: true, data: mappedData });
  } else {
    res.status(500).json(result);
  }
});

// Fetch news by country
app.get("/country/:iso", async (req, res) => {
  const { iso } = req.params;
  const { page = 1, pageSize = 12 } = req.query;
  const offset = (page - 1) * pageSize;

  const url = `http://api.mediastack.com/v1/news?access_key=${process.env.MEDIASTACK_API_KEY}&countries=${iso}&limit=${pageSize}&offset=${offset}`;
  const result = await makeApiRequest(url);

  if (result.success) {
    // Map MediaStack response to match the expected frontend structure
    const mappedData = {
      totalResults: result.data.pagination.total,
      articles: result.data.data.map(article => ({
        title: article.title,
        description: article.description,
        url: article.url,
        urlToImage: article.image,
        publishedAt: article.published_at,
        source: {
          name: article.source,
        },
      })),
    };
    res.status(200).json({ success: true, data: mappedData });
  } else {
    res.status(500).json(result);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});