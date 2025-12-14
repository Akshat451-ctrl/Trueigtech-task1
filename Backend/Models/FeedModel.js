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

static async getAllFeeds(currentUserId) {
  try {

    const query1 = `SELECT follower_id as followers FROM follower_following WHERE user_id = ?`;
    const values1 = [currentUserId];

    const[rows1] = await db.query(query1,values1);
    const inFollowerIds = rows1.map(row => row.followers);
    console.log("Follower following rows:",inFollowerIds);
    const query = `
      SELECT
    f.id AS feed_id,
    f.text,
    f.post_url,
    f.file_name,
    f.created_at,
    f.like_count as count,
    u.id AS user_id,
    u.username AS username,
    CASE WHEN pl.id IS NULL THEN FALSE ELSE TRUE END AS isLiked
FROM feeds f
JOIN user u ON f.userid = u.id
LEFT JOIN post_like pl 
    ON f.id = pl.post_id AND pl.user_id = ?
WHERE u.id IN (?)
ORDER BY f.created_at DESC;

    `;

    const [rows] = await db.query(query, [currentUserId, [...inFollowerIds, currentUserId]]);

    const query3 = `SELECT ff.id, ff.user_id as currentUser_id, u.id as user_id, u.username FROM follower_following as ff JOIN user u on ff.follower_id = u.id HAVING ff.user_id = ? ORDER BY ff.id DESC LIMIT 5`;
    const values3 = [currentUserId];

    const[rows3] = await db.query(query3,values3);
    // return rows;
    return {
      length: rows.length,
      feeds: rows,
      following: rows3
    };

  } catch (error) {
    throw error;
  }
}
static async followUser(currentUserId, followingUserId) {
    try{
      const checkIfFollow = "SELECT * FROM follower_following WHERE follower_id = ? AND user_id = ?";
      const valuesCheck = [currentUserId, followingUserId];

      const [existingRows] = await db.query(checkIfFollow, valuesCheck);

      if(existingRows.length > 0){
         const query1 = `DELETE FROM follower_following WHERE follower_id = ? AND user_id = ?`;
        const values1 = [currentUserId, followingUserId];

        const [rows] = await db.query(query1, values1);
        return rows;
      }
      const query = `INSERT INTO follower_following (follower_id, user_id) VALUES (?, ?)`;
      const values = [currentUserId, followingUserId];

      const [rows] = await db.query(query, values);
      return rows;
    }catch(err){
      throw err;
    }
}


static async exploreUsers(currentUserId) {
    try{
      const query1 = `SELECT follower_id as followingId FROM follower_following WHERE user_id = ?`;
      const values1 = [currentUserId];

      const[rows1] = await db.query(query1,values1);
      const inFollowerIds = rows1.map(row => row.followingId);
      const query = `SELECT id, username FROM user WHERE id NOT IN (?)`;
      const values = [[...inFollowerIds, currentUserId]];

      const [rows] = await db.query(query, values);
      return rows;
    }catch(err){
      throw err;
    }
}

static async likePost(currentUserId, postId) {
    try{
      const query1 = `SELECT * FROM post_like WHERE user_id = ? AND post_id = ?`;
      const values1 = [currentUserId, postId];

      const[rows1] = await db.query(query1,values1);
      if(rows1.length > 0){
        const query = `DELETE FROM post_like WHERE user_id = ? AND post_id = ?`;
        const values = [currentUserId, postId];
        const [rows] = await db.query(query, values);

        const q2 = "UPDATE feeds SET like_count = like_count - 1 WHERE id = ?";
        const v2 = [postId];
        await db.query(q2, v2);
        return rows;
      }
      const query = `Insert INTO post_like (user_id, post_id) VALUES (?, ?)`;
      const values = [currentUserId, postId];

      const [rows] = await db.query(query, values);
      const q2 = "UPDATE feeds SET like_count = like_count + 1 WHERE id = ?";
      const v2 = [postId];
      await db.query(q2, v2); 
      return rows;
    }catch(err){
      throw err;
    }
}
}
export default Feedmodel;