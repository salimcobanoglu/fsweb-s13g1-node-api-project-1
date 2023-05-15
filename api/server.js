// SUNUCUYU BU DOSYAYA KURUN

// module.exports = {}; // SERVERINIZI EXPORT EDİN {}

const express = require("express");
const server = express();
const { nanoid } = require("nanoid");
server.use(express.json());

function getId() {
  return nanoid().slice(0, 5);
}

let users = [
  {
    id: getId(), // String, gerekli
    name: "Jane Doe", // String, gerekli
    bio: "Having fun", // String, gerekli
  },
];

server.get("/", (req, res) => {
  res.send("Server is up and running!...");
});

//Read
server.get("/api/users", (req, res) => {
  res.json(users);
});

server.get("/api/users/:id", (req, res) => {
  let user = users.find((u) => u.id === req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

//create
server.post("/api/users", (req, res) => {
  const newUser = {
    id: getId(),
    bio: req.body.bio,
    name: req.body.name,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

//update
server.put("/api/users/:id", (req, res) => {
  users = users.map((user) => {
    if (user.id == req.params.id) {
      return {
        id: user.id,
        name: req.body.name,
        bio: req.body.bio,
      };
    } else {
      return user;
    }
  });
  res.json(users);
});

//Delete
server.delete("/api/users/:id", (req, res) => {
  let user = users.find((user) => user.id == req.params.id);
  if (!user) {
    res.status(404).json({ message: "user not found" });
  } else {
    users = users.reduce((total, item) => {
      if (item.id == req.params.id) {
        return total;
      } else {
        total.push(item);
        return total;
      }
    }, []);

    res.json(users);
  }
});

module.exports = server;
