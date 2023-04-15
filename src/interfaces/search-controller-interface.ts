import PixMedia from "@/models/pixmedia";

export interface ISearchController {
    getSearchResults(searchQuery: string): PixMedia[];
  }