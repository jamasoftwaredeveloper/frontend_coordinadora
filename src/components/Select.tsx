import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface Option {
  label: string;
  value: string | number;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  onChange: (value: string | number) => void;
}

const Select: React.FC<SelectProps> = ({ options, placeholder = 'Select...', onChange }) => {
  const [selected, setSelected] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (option: Option) => {
    setSelected(option.label);
    setIsOpen(false);
    onChange(option.value);
  };

  return (
    <div className="relative w-full max-w-xs">
      <div className="border rounded-lg px-4 py-2 flex items-center justify-between bg-white shadow-md cursor-pointer"
           onClick={() => setIsOpen(!isOpen)}>
        <span>{selected || placeholder}</span>
        <ChevronDown className="h-5 w-5" />
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
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
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
