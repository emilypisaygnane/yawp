const pool = require('../utils/pool');

module.exports = class Review{
  id;
  user;
  stars;
  detail;

  constructor(row) {
    this.id = row.id;
    this.stars = row.stars;
    this.detail = row.detail;
  }

  static async insert({ stars, detail }) {
    const { rows } = await pool.query(
      `
        INSERT INTO reviews (stars, detail)
        VALUES ($1, $2)
        RETURNING *
        `,
      [stars, detail]
    );
    return new Review(rows[0]);
  }

  async addReviewById(reviewId) {
    await pool.query(
      `
      INSERT INTO restaurants_reviews (restaurant_id, review_id)
      VALUES ($1, $2)
      RETURNING *;
    `,
      [this.id, reviewId]
    );
    return this;
  }
};

