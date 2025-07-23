import { Input } from "./input";
import { Search, X } from "lucide-react";
import { Button } from "./button";

interface SearchInputProps {
  search: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClear: () => void;
}

export const SearchInput = ({ search, handleSearch, handleClear }: SearchInputProps) => {
  return (
    <div className="flex gap-2">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <Input
        type="text"
        placeholder="Search projects..."
        className="pl-10"
        value={search || ''}
        onChange={(e) => handleSearch(e)}
      />
      <Button variant="secondary" onClick={() => handleClear()} disabled={search === ''}>
        <X className="h-5 w-5" />
      </Button>
    </div>
  )
}