const axios = require('axios');
const fs = require('fs');
const markdownURLs = require('../lib/markdownURLs');

function fetchPathways() {
  if (!fs.existsSync('md')) {
    fs.mkdirSync('md');
    console.log(`✓ Created /md in root directory`);
  }

  Object.keys(markdownURLs).forEach((chain) => {
    const steps = markdownURLs[chain];

    Object.keys(steps).forEach((stepId) => {
      const stepMarkdownURL = steps[stepId];

      axios.get(stepMarkdownURL).then((res) => {
        try {
          if (!fs.existsSync(`md/${chain}`)) {
            fs.mkdirSync(`md/${chain}`);
            console.log(`Created directory md/${chain}`);
          }
          fs.writeFileSync(`md/${chain}/${stepId}.md`, res.data);
        } catch (e) {
          console.error('An error occurred.');
        }
      });
    });

    console.log(`✓ Fetched pathways for ${chain}`);
  });
}

fetchPathways();
