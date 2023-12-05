import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './interfaces/post.interfaces';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
/**
 * CRUD
 * Service class for managing blog posts.
 */
export class BlogService {
    constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}

    /**
     * Adds a new blog post.
     * @param {CreatePostDto} CreatePostDto - The data for creating a new post.
     * @returns {Promise<Post>} The newly created post.
     */
    async addPost(CreatePostDto: CreatePostDto): Promise<Post> {
        const newPost = await new this.postModel(CreatePostDto);
        return newPost.save();
    }

    /**
     * Retrieves a blog post by its ID.
     * @param {string} postID - The ID of the post to retrieve.
     * @returns {Promise<Post>} The retrieved post.
     */
    async getPost(postID: string): Promise<Post> {
        const post = await this.postModel
            .findById(postID)
            .exec();
        return post;
    }

    /**
     * Retrieves all blog posts.
     * @returns {Promise<Post[]>} An array of all blog posts.
     */
    async getPosts(): Promise<Post[]> {
        const posts = await this.postModel.find().exec();
        return posts;
    }

    /**
     * Edits a blog post.
     * @param {string} postID - The ID of the post to edit.
     * @param {CreatePostDto} CreatePostDto - The updated data for the post.
     * @returns {Promise<Post>} The edited post.
     */
    async editPost(postID: string, CreatePostDto: CreatePostDto): Promise<Post> {
        const editedPost = await this.postModel
            .findByIdAndUpdate(postID, CreatePostDto, { new: true });
        return editedPost;
    }

    /**
     * Deletes a blog post.
     * @param {string} postID - The ID of the post to delete.
     * @returns {Promise<any>} The result of the deletion operation.
     */
    async deletePost(postID: string): Promise<any> {
        const deletedPost = await this.postModel
            .deleteOne({ _id: postID });
        return deletedPost;
    }
}
