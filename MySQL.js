const mysql = require("mysql2/promise");
const { v4: uuidv4 } = require("uuid");

class MySQL {
  constructor(connection) {
    this.con = connection;
  }

  async createNewVision(vision) {
    const visionId = uuidv4();
    const sql =
      "INSERT INTO visions SET visionId = ?, visionName = ?, createdAt = NOW()";
    const [result] = await this.con.execute(sql, [visionId, vision]);

    if (result.affectedRows === 1) {
      const [rows] = await this.con.execute(
        `SELECT * FROM visions WHERE visionId = '${visionId}'`
      );
      console.log("createNewVision:", rows[0]);
      return rows[0];
    } else {
      throw new Error("Create is Failed");
    }
  }

  async updateVisionById(input) {
    const sql = "UPDATE visions SET visionName = ? WHERE visionId = ?";
    const result = await this.con.execute(sql, [
      input.visionName,
      input.visionId,
    ]);
    console.log("updateVisionById:", result[0]);
    return result[0];
  }

  async deleteVisionById(visionId) {
    const [result] = await this.con.execute(
      "DELETE FROM visions WHERE visionId = ?",
      [visionId]
    );
    console.log("deleteVisionById:", result);
    return result;
  }

  async removalVisions() {
    await this.con.execute("DELETE FROM visions WHERE 1 = 1");
  }

  async getVisions() {
    const [result] = await this.con.execute(
      "SELECT * FROM visions WHERE 1 = 1"
    );
    console.log("getVisions:", result);
    return result;
  }
}

module.exports = MySQL;
