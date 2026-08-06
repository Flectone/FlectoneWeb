import { ChangeEventHandler } from "react";
import { Search } from "lucide-react";

interface SearchProps {
  value: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  placeholder?: string;
}

export default function PageSearch({
  value,
  onChange,
  placeholder,
}: SearchProps) {
  return (
    <div className="bg-fd-card w-full transition-all text-sm rounded-lg h-8 px-2 gap-2 text-fd-muted-foreground flex items-center">
      <Search size={"1em"} />
      <input
        className="cursor-text outline-none bg-transparent w-full h-full"
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
