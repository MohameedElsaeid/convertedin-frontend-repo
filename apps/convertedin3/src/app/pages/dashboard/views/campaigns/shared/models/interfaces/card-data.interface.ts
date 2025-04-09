export interface CardData {
    type: string; 
    isNew: boolean;
    isBlank: boolean;
    cardHeader: string;
    CTR: { label: string, value: number | string }[];
    ROAS: { label: string, value: number | string }[];
    strategy: { label: string, value: number | string }[];
    audience: { label: string, value: number | string }[];
    socialMediaLinks: { facebook?: boolean; snapchat?: boolean; instagram?: boolean };
}