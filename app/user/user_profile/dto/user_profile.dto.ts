import { User } from "../../model";
export class UserProfileDTO {
    id: number;
    user_likes: number;
    user_name: string;
    user_photo?: string;
    user: User;
}