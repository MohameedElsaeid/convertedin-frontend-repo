// Interface for a filter object
export interface FilterOption {
    label: string;
    field: string;
    options: string[];
  }
  
  // Interface for the search query with filters
  export interface SearchQuery {
    searchText: string;
    filters: { [key: string]: string }; // Holds selected filter values by field
  }
  
  // Interface for the data structure (example till having API's)
  export interface DataObject {
    name: string;
    type: string;
    CTR: { label: string, value: number | string  }[];
    ROAS: { label: string, value: number | string }[];
    strategy: { label: string, value: number | string }[];
    audience: { label: string, value: number | string }[];
    socialMediaLinks: {[key: string]: boolean},
    isNew: boolean;
  }
  