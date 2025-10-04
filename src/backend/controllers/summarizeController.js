const axios = require('axios');

// Summarize health and risk reports
exports.summarizeReport = async (req, res) => {
  const { reportData } = req.body;

  if (!reportData) {
    return res.status(400).json({ message: 'Report data is required' });
  }

  try {
    const response = await axios.post('https://api.openai.com/v1/completions', {
      model: 'text-davinci-003',
      prompt: `Summarize the following report data: ${JSON.stringify(reportData)}`,
      max_tokens: 150,
    }, {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });

    res.status(200).json({ summary: response.data.choices[0].text.trim() });
  } catch (error) {
    res.status(500).json({ message: 'Failed to summarize report', error: error.message });
  }
};