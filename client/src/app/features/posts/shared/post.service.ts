import {Injectable} from '@angular/core';
import {DatabaseService} from '../../../core/database/database.service';
import {Post} from './post.model';
import {map} from 'rxjs/operators';
import {QueryFn} from '@angular/fire/firestore';
import {PostStatus} from './post-status.enum';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private databaseService: DatabaseService<Post>) {
  }
  private readonly suffix = 'posts';

  private getRelativePath(status: PostStatus) {
    return status + this.suffix;
  }

  list(status: PostStatus, queryFn?: QueryFn) {
    return this.databaseService.list(this.getRelativePath(status), queryFn);
  }

  get(id: string, status?: PostStatus) {
    return this.databaseService.doc(status ? status : PostStatus.Public, id).get().pipe(map((post => {
      const data = post.data() as Post;
      return {...data, id: post.id};
    })));
  }
}