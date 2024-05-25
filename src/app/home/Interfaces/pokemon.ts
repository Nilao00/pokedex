export interface pokemonPros {
    results: [{
        name: string;
        url: string;
    }]
    count: number;
    next: string | null;
    previous:string | null;
}
