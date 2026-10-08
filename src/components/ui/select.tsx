import { cn } from "cn"
import { Check, ChevronDown } from "lucide-react"
import { Select as SelectPrimitive } from "radix-ui"

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  // Radix doesn't forward className onto the rendered span, so truncation is
  // handled on SelectTrigger instead via a descendant selector.
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        "flex h-8 min-w-0 items-center justify-between gap-2 rounded-lg border border-border bg-background px-2.5 text-sm outline-none transition-colors hover:bg-muted focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 data-placeholder:text-muted-foreground [&>span]:min-w-0 [&>span]:flex-1 [&>span]:truncate [&>span]:text-left",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="size-3.5 shrink-0 text-muted-foreground" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        position={position}
        className={cn(
          "z-50 min-w-[8rem] max-h-[var(--radix-select-content-available-height)] overflow-hidden rounded-xl bg-popover p-1 text-popover-foreground ring-1 ring-foreground/10 outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1",
          className
        )}
        {...props}
      >
        {/* Radix injects its own (unlayered) stylesheet hiding this viewport's native scrollbar —
         *  it ships separate scroll-up/down button primitives instead — via a plain
         *  `[data-radix-select-viewport]` rule. Tailwind's utilities live inside `@layer`, and an
         *  unlayered rule beats a layered one regardless of specificity, so matching its selector
         *  isn't enough; only `!important` (also exempt from layer ordering) can still win here. */}
        <SelectPrimitive.Viewport className="max-h-[inherit] overflow-y-auto [scrollbar-color:var(--border)_transparent]! [scrollbar-width:thin]! [&::-webkit-scrollbar]:[display:block]! [&::-webkit-scrollbar]:w-1.5! [&::-webkit-scrollbar-thumb]:rounded-full! [&::-webkit-scrollbar-thumb]:bg-border! [&::-webkit-scrollbar-track]:bg-transparent!">
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("px-2.5 py-1.5 text-xs font-medium text-muted-foreground", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        // py-3 (sm:py-1.5 once a mouse is the likely pointer) keeps each row at a full 44px
        // touch target on mobile without bloating the desktop dropdown.
        "relative flex w-full cursor-pointer items-center gap-2 rounded-lg py-3 pr-8 pl-2.5 text-sm outline-none select-none data-highlighted:bg-muted sm:py-1.5",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute right-2.5 flex items-center">
        <Check className="size-3.5" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

export { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem }
