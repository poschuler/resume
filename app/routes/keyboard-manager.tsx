import { createId } from "@paralleldrive/cuid2";
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { useLoaderData } from "@remix-run/react";
import { Command } from "lucide-react";
import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "~/components/ui/command";
import { loader } from "~/routes/_index";

export function KeyboardManager() {
  const [open, setOpen] = useState(false);
  const {
    basics: { profiles },
  } = useLoaderData<typeof loader>();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }

      profiles.map((item) => {
        if (e.key === item.key && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          window.open(item.url, "_blank", "noopener,noreferrer");
        }
      });
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [profiles]);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Links" className="font-mono">
            {profiles.map((item) => (
              <a
                key={createId()}
                href={item.url}
                target="_blank"
                rel="noreferrer"
              >
                <CommandItem className="cursor-pointer">
                  {item.network === "GitHub" && (
                    <GitHubLogoIcon className="mr-2 size-4 text-muted-foreground" />
                  )}

                  {item.network === "LinkedIn" && (
                    <LinkedInLogoIcon className="mr-2 size-4 text-muted-foreground" />
                  )}

                  {item.network === "X" && (
                    <TwitterLogoIcon className="mr-2 size-4 text-muted-foreground" />
                  )}

                  <span className="font-mono">{item.network}</span>

                  {item.network === "GitHub" && (
                    <CommandShortcut className="uppercase">
                      ⌘{item.key}
                    </CommandShortcut>
                  )}

                  {item.network === "LinkedIn" && (
                    <CommandShortcut className="uppercase">
                      ⌘{item.key}
                    </CommandShortcut>
                  )}

                  {item.network === "X" && (
                    <CommandShortcut className="uppercase">
                      ⌘{item.key}
                    </CommandShortcut>
                  )}
                </CommandItem>
              </a>
            ))}
          </CommandGroup>
          {/* <CommandSeparator />
          <CommandGroup heading="Action">
            <CommandItem>
              <Printer className="mr-2 size-4" />
              <span>Print</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
          </CommandGroup> */}
        </CommandList>
      </CommandDialog>
      <button
        onClick={handleClick}
        className="fixed bottom-4 right-4 flex h-10 w-10 items-center justify-center whitespace-nowrap rounded-full border border-input bg-background text-sm font-medium shadow-2xl ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 xl:hidden print:hidden"
      >
        <Command className="my-6 size-6" />
      </button>
    </>
  );
}
