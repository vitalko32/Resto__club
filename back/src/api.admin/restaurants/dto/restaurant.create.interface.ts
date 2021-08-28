export interface IRestaurantCreate {
    readonly currency_id: number;
    readonly lang_id: number;
    readonly name: string;
    readonly domain: string;
    readonly ownername: string;
    readonly phone: string;
    readonly address: string;
    readonly inn: string;
    readonly ogrn: string;
    readonly comment: string;
    readonly active_until: string;
}