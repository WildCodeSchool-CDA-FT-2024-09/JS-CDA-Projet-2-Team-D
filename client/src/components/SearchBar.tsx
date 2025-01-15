import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  onClear: () => void;
  value: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Rechercher...",
  onSearch,
  onClear,
  value,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <TextField
      variant="outlined"
      type="search"
      label="Recherche"
      fullWidth
      placeholder={placeholder}
      aria-label="champ de recherche"
      value={value}
      onChange={handleInputChange}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: value ? (
            <InputAdornment position="end">
              <IconButton onClick={onClear}>
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ) : null,
        },
      }}
    />
  );
};

export default SearchBar;
