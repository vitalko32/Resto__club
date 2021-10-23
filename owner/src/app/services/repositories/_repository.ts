export abstract class Repository {    
    public chunkSortBy: string = "id"; // current sort by for fragment
    public chunkSortDir: number = 1; // current sort direction for fragment    
    public chunkLength: number = 10; // current length of fragment            
    public allSortBy: string = "id"; // current sort by for all objects
    public allSortDir: number = 1; // curent sort direction for all objects    
}
