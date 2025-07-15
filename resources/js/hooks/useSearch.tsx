import React from 'react'
import { router } from '@inertiajs/react';
import { route } from 'ziggy-js';

export const useSearch = (initialSearch: string) => {
  const [search, setSearch] = React.useState(initialSearch);
  const debounceTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);



  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    // Debounce para evitar muchas request
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Establece un nuevo timer
    debounceTimeoutRef.current = setTimeout(() => {
      console.log('Realizando petición al servidor con:', value); // Para depuración
      router.get(route('projects.index'), { search: value }, {
        preserveState: true,
        preserveScroll: true
      });
    }, 370);
  };

  const handleClear = () => {
    if (search === '') return;
    setSearch('');
    router.get(route('projects.index'), {}, {
      preserveState: true,
      preserveScroll: true
    });
  };
  return {
    search,
    handleSearch,
    handleClear
  }
}
