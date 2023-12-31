// Data Transfert Object (DTO) for CreatePost
export class CreatePostDto {
    readonly title: string;
    readonly description: string;
    readonly body: string;
    readonly author: string;
    readonly date_posted: string;
}