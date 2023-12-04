import * as mongoose from 'mongoose';

/**
 * Represents the schema for a blog post.
 * @typedef {Object} BlogSchema
 * @property {string} title - The title of the blog post.
 * @property {string} description - The description of the blog post.
 * @property {string} body - The body content of the blog post.
 * @property {string} author - The author of the blog post.
 * @property {string} date_posted - The date when the blog post was posted.
 */
export const BlogSchema = new mongoose.Schema({
  title: String,
  description: String,
  body: String,
  author: String,
  date_posted: String,
});
