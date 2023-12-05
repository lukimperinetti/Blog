import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Put, Query, Delete } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreatePostDto } from './dto/create-post.dto';

/**
 * Controller for handling blog-related operations.
 */
@Controller('blog')
export class BlogController {
    constructor(private blogService: BlogService) {}

    /**
     * Endpoint for adding a new blog post.
     * @param res - The response object.
     * @param createPostDto - The DTO object containing the data for creating a new post.
     * @returns A JSON response indicating the success of the operation and the newly created post.
     */
    @Post('/post')
    async addPost(@Res() res, @Body() createPostDto: CreatePostDto) {
        const newPost = await this.blogService.addPost(createPostDto);
        return res.status(HttpStatus.OK).json({
            message: 'Post has been submitted successfully!',
            post: newPost,
        });
    }

    /**
     * Endpoint for retrieving a specific blog post.
     * @param res - The response object.
     * @param postID - The ID of the post to retrieve.
     * @returns A JSON response containing the retrieved post.
     * @throws NotFoundException if the post does not exist.
     */
    @Get('post/:postID')
    async getPost(@Res() res, @Param('postID') postID) {
        const post = await this.blogService.getPost(postID);
        if (!post) {
            throw new NotFoundException('Post does not exist!');
        }
        return res.status(HttpStatus.OK).json(post);
    }

    /**
     * Endpoint for retrieving all blog posts.
     * @param res - The response object.
     * @returns A JSON response containing all the blog posts.
     */
    @Get('posts')
    async getPosts(@Res() res) {
        const posts = await this.blogService.getPosts();
        return res.status(HttpStatus.OK).json(posts);
    }

    /**
     * Endpoint for editing a blog post.
     * @param res - The response object.
     * @param postID - The ID of the post to edit.
     * @param createPostDto - The DTO object containing the updated data for the post.
     * @returns A JSON response indicating the success of the operation and the edited post.
     */
    @Put('/edit')
    async editPost(
        @Res() res,
        @Query('postID') postID,
        @Body() createPostDto: CreatePostDto,
    ) {
        const editedPost = await this.blogService.editPost(postID, createPostDto);
        if (!editedPost) {
            throw new NotFoundException('Post does not exist!');
        }
        return res.status(HttpStatus.OK).json({
            message: 'Post has been successfully updated',
            post: editedPost,
        });
    }

    /**
     * Endpoint for deleting a blog post.
     * @param res - The response object.
     * @param postID - The ID of the post to delete.
     * @returns A JSON response indicating the success of the operation and the deleted post.
     */
    @Delete('/delete')
    async deletePost(@Res() res, @Query('postID') postID) {
        const deletedPost = await this.blogService.deletePost(postID);
        if (!deletedPost) {
            throw new NotFoundException('Post does not exist!');
        }
        return res.status(HttpStatus.OK).json({
            message: 'Post has been deleted!',
            post: deletedPost,
        });
    }
}
