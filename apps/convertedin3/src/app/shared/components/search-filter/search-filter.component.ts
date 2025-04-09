import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DataObject, FilterOption, SearchQuery } from '@convertedin3/shared/models/interfaces/search-filter.interface';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'convertedin-search-filter',
  standalone: true,
  imports: [CommonModule, DropdownModule, FormsModule, InputTextModule, ButtonModule],
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
})
export class SearchFilterComponent {
  @Input() filters: FilterOption[] = []; // Array of filters
  @Input() data: DataObject[] = []; // Array of data to be filtered
  @Input() backendSearch: boolean = false; // Switch for backend or client search (this is temp flag till agree on the search criteria ( BE OR FE ) will handle the search FN)
  
  @Output() searchResults = new EventEmitter<DataObject[]>(); // Emits filtered data for client-side search
  @Output() backendSearchQuery = new EventEmitter<SearchQuery>(); // Emits query object for backend search 

  searchText: string = '';
  filterSelections: { [key: string]: string } = {}; // Holds the selected filters

  constructor() {}

  ngOnInit() {
    this.initFilterSelections();
  }

  // Initialize filter selections as an empty string for each filter field
  initFilterSelections() {
    this.filters.forEach(filter => {
      this.filterSelections[filter.field] = ''; // Set default to an empty string
    });
  }

  // Apply filters and emit results based on the search type (client or backend)
  applyFilters() {
    const searchQuery: SearchQuery = {
      searchText: this.searchText,
      filters: this.filterSelections
    };

    if (this.backendSearch) {
      this.backendSearchQuery.emit(searchQuery); // Emit query to parent for backend processing
    } else {
      const filteredData = this.data.filter((item: any) => {
        let matches = true;

        // Match search text
        if (searchQuery.searchText && !item.name.toLowerCase().includes(searchQuery.searchText.toLowerCase())) {
          matches = false;
        }

        // Match filters
        for (const key in searchQuery.filters) {
          if (searchQuery.filters[key] && item[key] !== searchQuery.filters[key]) {
            matches = false;
          }
        }

        return matches;
      });

      this.searchResults.emit(filteredData); // Emit filtered data for client-side search
    }
  }

}
