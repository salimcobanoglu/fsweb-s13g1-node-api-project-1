const server = require("./api/server");

const port = 9000;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// START YOUR SERVER HERE
