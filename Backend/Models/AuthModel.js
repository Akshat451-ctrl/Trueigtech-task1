import db from "../db.js";
import bcrypt from "bcrypt";

class Authmodel {
  static async signup(data) {
    try {
      const timestampInSeconds = Math.floor(Date.now() / 1000);

      const query = `
        INSERT INTO registration (username, email, password, createAt)
        VALUES (?, ?, ?, ?)
      `;

      const values = [
        data.username,
        data.email,
        data.password,
        timestampInSeconds,
      ];

      
      const [result] = await db.query(query, values);

      return result;
    } catch (error) {
      throw error;
    }
  }

 static async loginInsert(data) {
    try {
      const timestampInSeconds = Math.floor(Date.now() / 1000);

     
      const hashedPassword = await bcrypt.hash(data.password, 10);

      const query = `
        INSERT INTO user (email, password,username, createdAt)
        VALUES (?, ?, ?,?)
      `;

      const values = [
        data.email,
        hashedPassword, 
        data.username,       
        timestampInSeconds,
      ];

      const [result] = await db.query(query, values);

      return result;

    } catch (error) {
      throw error;
    }
  }
 static async loginVerify(data) {
    try {
      const { email, password } = data;

      
      const query = `
        SELECT id, email, password 
        FROM user 
        WHERE email = ?
        LIMIT 1
      `;

      const [rows] = await db.query(query, [email]);

      
      if (rows.length === 0) {
        throw new Error("User not found");
      }

      const user = rows[0];

    
      const isPasswordMatch = await bcrypt.compare(
        password,       
        user.password    
      );

      if (!isPasswordMatch) {
        throw new Error("Invalid email or password");
      }

     
      return {
        id: user.id,
        email: user.email,
        status :true
      };

    } catch (error) {
      throw error;
    }
  }
}

export default Authmodel;
