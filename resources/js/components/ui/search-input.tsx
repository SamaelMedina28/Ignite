import { Input } from "./input";
import { Search } from "lucide-react";

export const SearchInput = ({ search, handleSearch }: { search: string, handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <div>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <Input
        type="text"
        placeholder="Search projects..."
        className="pl-10"
        value={search}
        onChange={handleSearch}
      />
    </div>
  )
}