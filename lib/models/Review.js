const pool = require('../utils/pool');

class Review {
  id;
  restaurant_id;
  userId;
  stars;
  detail;

  constructor(row) {
    this.id = row.id;
    this.restaurant_id = row.restaurant_id;
    this.userId = row.user_id;
    this.stars = row.stars;
    this.detail = row.detail;
  }

  static async insert({ restaurant_id, userId, stars, detail }) {
    const { rows } = await pool.query(
      `
        INSERT INTO reviews (restaurant_id, user_id, stars, detail)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
      [restaurant_id, userId, stars, detail]
    );
    return new Review(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
      DELETE from reviews
      WHERE id = $1
      RETURNING *
    `,
      [id]
    );
    return new Review(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT * from reviews WHERE id = $1
    `,
      [id]
    );
    if (!rows[0]) return null;
    return new Review(rows[0]);
  }
}

module.exports = { Review };
