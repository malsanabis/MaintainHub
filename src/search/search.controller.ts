import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('/products')
  search(@Query('q') q: string) {
    return this.searchService.findProducts(q);
  }
}
