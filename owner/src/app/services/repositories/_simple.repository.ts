export abstract class SimpleRepository<T> {    
    public xl: T[] = []; // objects list    
    public sortBy: string = "id"; // current sort by
    public sortDir: number = 1; // current sort direction
    public chunkLength: number = 10; // current length of fragment
    public chunkCurrentPart: number = 0; // current paging state for fragment
    public exhausted: boolean = false; // no more chunks  
    public allLength: number = 0; // quantity of all objects in table       
}
