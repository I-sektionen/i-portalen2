import {Injectable} from '@angular/core';
import {DatabaseService} from '../../../core/database/database.service';
import {Post} from './post.model';
import {QueryFn} from '@angular/fire/firestore';
import {PostStatus} from './post-status.enum';
import {Observable} from 'rxjs';
import {UserService} from '../../users/shared/user.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private databaseService: DatabaseService<Post>,
              private userService: UserService) {
  }
  private readonly suffix = 'posts';

  private getRelativePath(status: PostStatus) {
    return status + '-' + this.suffix;
  }

  list(status: PostStatus, queryFn?: QueryFn): Observable<Post[]> {
    return this.databaseService.list(this.getRelativePath(status), queryFn);
  }

  get(id: string, status?: PostStatus) {
    return this.databaseService.get(this.getRelativePath(status ? status : PostStatus.Public), id);
  }

  uploadForReview(post: Post) {
    return this.databaseService.insert(this.getRelativePath(PostStatus.WaitingToBeApproved), post);
  }

  approvePost(post: Post) {

  }

}
