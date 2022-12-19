const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();

const dpPath = path.join(__dirname, "cricketTeam.db");
let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dpPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server running");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();
//GET//
app.get("/players/", async (request, response) => {
  const getPlayersQuery = `SELECT * FROM cricket_team ORDER BY player_id`;
  const playerArray = await db.all(getPlayersQuery);
  response.send(playerArray);
});
