import { useEffect, useState } from 'react';
import { ChevronDown, X } from 'lucide-react';

interface Option {
  label: string;
  value: string | number;
}

interface SelectProps {
  options: Option[];
  value?: string | number;
  placeholder?: string;
  onChange: (value: string | number | undefined) => void;
}

const Select: React.FC<SelectProps> = ({ options, value, placeholder = 'Select...', onChange }) => {
  const [selected, setSelected] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (value !== undefined) {
      const matched = options.find(option => option.value === value);
      if (matched) {
        setSelected(matched.label);
      }
    } else {
      setSelected('');
    }
  }, [value, options]);

  const handleSelect = (option: Option) => {
    setSelected(option.label);
    setIsOpen(false);
    onChange(option.value);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation(); // evita que se abra el dropdown
    setSelected('');
    setSearch('');
    onChange(undefined);
  };

  return (
    <div className="relative w-full max-w-xs">
      <div
        className="border rounded-lg px-4 py-2 flex items-center justify-between bg-white shadow-md cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">{selected || placeholder}</span>
        <div className="flex items-center space-x-2">
          {selected && (
            <X
              className="h-4 w-4 text-gray-500 hover:text-red-500 cursor-pointer"
              onClick={handleClear}
            />
          )}
          <ChevronDown className="h-5 w-5" />
        </div>
      </div>
      {isOpen && (
        <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg z-10">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full p-2 border-b outline-none"
          />
          <ul className="max-h-48 overflow-auto">
            {filteredOptions.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Select;
