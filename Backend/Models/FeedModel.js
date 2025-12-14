import db from "../db.js";

class Feedmodel{
    static async insertpost(data,file){
         try {
      const timestampInSeconds = Math.floor(Date.now() / 1000);

      const query = `
        INSERT INTO feeds (userid,text,post_url, file_name,created_at)
        VALUES (?, ?, ?, ?,?)
      `;

      const values = [
        data.userId,
        data.text,
        file.path,
        file.originalname,
        timestampInSeconds,
      ];

      
      const [result] = await db.query(query, values);

      return result;
    } catch (error) {
      throw error;
    }
}

    static async insertpost(data,file){
         try {
      const timestampInSeconds = Math.floor(Date.now() / 1000);

      const query = `
        INSERT INTO feeds (userid,text,post_url, file_name,created_at)
        VALUES (?, ?, ?, ?,?)
      `;

      const values = [
        data.userId,
        data.text,
        file.path,
        file.originalname,
        timestampInSeconds,
      ];

      
      const [result] = await db.query(query, values);

      return result;
    } catch (error) {
      throw error;
    }
}

static async getAllFeeds() {
  try {
    const query = `
      SELECT 
        f.id AS feed_id,
        f.text,
        f.post_url,
        f.file_name,
        f.created_at,
        u.id AS user_id,
        u.username AS username
      FROM feeds f
      JOIN user u ON f.userid = u.id
      ORDER BY f.created_at DESC
    `;

    const [rows] = await db.query(query);
    return rows;

  } catch (error) {
    throw error;
  }
}


}
export default Feedmodel;