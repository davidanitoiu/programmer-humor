import { Injectable } from '@nestjs/common';
import { fetchPosts } from '../utils/9gag/fetchPosts';
import { NineGagPostDto } from './9gag.dto';

@Injectable()
export class NineGagService {

  fetchAllProgrammingPosts(args): Promise<NineGagPostDto[]> {
    return fetchPosts(args);
  }

}
