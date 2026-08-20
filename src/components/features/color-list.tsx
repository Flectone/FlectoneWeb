import { useState, useRef, useEffect } from "react"
import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react"
import { HexColorPicker } from "react-colorful"
import { Field, FieldContent, FieldLabel } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { cn } from "@/lib/utils"

interface ColorListProps {
  label: string
  colors: string[]
  onChange: (colors: string[]) => void
  maxColors?: number
}

export function ColorList({
  colors,
  onChange,
  label,
  maxColors = Infinity,
}: ColorListProps) {
  const addColor = () => {
    if (colors.length >= maxColors) return
    onChange([...colors, "#ffffff"])
  }

  const removeColor = (index: number) => {
    if (colors.length > 1) {
      onChange(colors.filter((_, i) => i !== index))
    }
  }

  const updateColor = (index: number, newColor: string) => {
    const updated = [...colors]
    updated[index] = newColor
    onChange(updated)
  }

  const moveColorUp = (index: number) => {
    if (index === 0) return
    const updated = [...colors]
    ;[updated[index - 1], updated[index]] = [updated[index], updated[index - 1]]
    onChange(updated)
  }

  const moveColorDown = (index: number) => {
    if (index === colors.length - 1) return
    const updated = [...colors]
    ;[updated[index + 1], updated[index]] = [updated[index], updated[index + 1]]
    onChange(updated)
  }

  const isMaxReached = colors.length >= maxColors

  return (
    <Field>
      <FieldContent className="gap-2">
        <FieldLabel className="flex w-full items-center justify-between">
          {" "}
          {label}
          <Button
            onClick={addColor}
            disabled={isMaxReached}
            size={"icon-xs"}
            variant={"ghost"}
          >
            <Plus />
          </Button>
        </FieldLabel>
        <div className="flex flex-col gap-2">
          {colors.map((color, idx) => (
            <ColorListItem
              key={idx}
              color={color}
              index={idx}
              totalColors={colors.length}
              onColorChange={(newColor) => updateColor(idx, newColor)}
              onMoveUp={() => moveColorUp(idx)}
              onMoveDown={() => moveColorDown(idx)}
              onRemove={() => removeColor(idx)}
            />
          ))}
        </div>
      </FieldContent>
    </Field>
  )
}

interface ColorListItemProps {
  color: string
  index: number
  totalColors: number
  onColorChange: (color: string) => void
  onMoveUp: () => void
  onMoveDown: () => void
  onRemove: () => void
}

function ColorListItem({
  color,
  index,
  totalColors,
  onColorChange,
  onMoveUp,
  onMoveDown,
  onRemove,
}: ColorListItemProps) {
  const [inputValue, setInputValue] = useState(color)

  useEffect(() => {
    setInputValue(color)
  }, [color])

  const handleInputChange = (val: string) => {
    setInputValue(val)

    const isValidHex = /^#([0-9A-F]{3}){1,2}$/i.test(val)
    if (isValidHex) {
      onColorChange(val)
    }
  }

  return (
    <div className="relative flex justify-between rounded-sm bg-muted-card p-1">
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                size={"icon-xs"}
                style={{ backgroundColor: color }}
                type="button"
              />
            }
          ></DropdownMenuTrigger>
          <DropdownMenuContent className="flex w-fit flex-col gap-2 p-4">
            <HexColorPicker color={color} onChange={onColorChange} />
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>HEX:</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                placeholder="#ffffff"
                value={inputValue}
                onChange={(e) => handleInputChange(e.target.value)}
                className="w-20"
              />
            </InputGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <p
          className="font-mono text-sm font-bold"
          style={{ color: color.toLowerCase() }}
        >
          {color.toUpperCase()}
        </p>
      </div>

      <div className="flex items-center gap-1">
        <Button
          onClick={onMoveUp}
          variant={"secondary"}
          size={"icon-xs"}
          className={cn(
            index === 0
              ? "hidden"
              : "cursor-pointer bg-fd-primary/20 text-fd-primary hover:bg-fd-primary/30"
          )}
        >
          <ArrowUp />
        </Button>
        <Button
          onClick={onMoveDown}
          variant={"secondary"}
          size={"icon-xs"}
          className={cn(
            index === totalColors - 1
              ? "hidden"
              : "cursor-pointer bg-fd-primary/20 text-fd-primary hover:bg-fd-primary/30"
          )}
        >
          <ArrowDown />
        </Button>
        {totalColors > 1 && (
          <Button variant={"destructive"} size={"icon-xs"} onClick={onRemove}>
            <Trash2 />
          </Button>
        )}
      </div>
    </div>
  )
}
