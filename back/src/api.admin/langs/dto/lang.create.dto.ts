export interface ILangCreateDTO {
    readonly slug: string;
    readonly title: string;
    readonly shorttitle: string;
    readonly img: string;
    readonly img_s: string;
    readonly pos: number;
    readonly active: boolean;
    readonly slugable: boolean;
    readonly dir: string;
}