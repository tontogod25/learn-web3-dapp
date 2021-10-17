const {toPairs} = require('lodash');
const axios = require('axios');
const path = require('path');
const fs = require('fs');

const markdownURLs = require('../lib/markdownURLs');

const MARKDOWN_PATH = path.resolve('md');

function displayError(error) {
  if (error.isAxiosError) {
    console.error({
      message: error.message,
      status: error.response.status,
      header: error.config.headers,
      method: error.config.method,
      url: error.config.url,
    });
  } else {
    console.error(error);
  }
}

function createDirectory(path) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
    console.log(`✓ Created ${path} in root directory`);
  }
}

(function fetchPathways() {
  createDirectory(MARKDOWN_PATH);
  toPairs(markdownURLs).forEach(([chain, steps]) => {
    toPairs(steps).forEach(([id, url]) => {
      createDirectory(path.join(MARKDOWN_PATH, chain));
      axios
        .get(url)
        .then((response) =>
          fs.writeFileSync(
            path.join(MARKDOWN_PATH, chain, `${id}.md`),
            response.data,
          ),
        )
        .catch((error) => {
          displayError(error);
          process.exit(1);
        });
    });
    console.log(`✓ Fetched pathways for ${chain}`);
  });
})();
