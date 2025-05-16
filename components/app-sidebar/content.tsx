"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Delete, Ellipsis, Share } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import type { GetChatsResponse } from "@/lib/client/types";
import { useCallback, useMemo, memo } from "react";

export function Content() {
  const { data: response, isLoading } = useQuery<GetChatsResponse>({
    queryKey: ["chats"],
    queryFn: () => fetch("/api/chat").then((res) => res.json()),
  });

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Chats</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {isLoading ? (
              <></>
            ) : response && response.data && response.data.length > 0 ? (
              response.data.map((chat) => (
                <ChatItem key={chat.id} id={chat.id} title={chat.title} />
              ))
            ) : (
              <div className="h-48 flex items-center justify-center w-full bg-muted/60 rounded-lg text-xs text-muted-foreground/80">
                <p className="text-2xs">No chats yet</p>
              </div>
            )}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}

const ChatItem = memo(({ id, title }: { id: string; title: string }) => {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleClick = useCallback(
    () => router.push(`/chat/${id}`),
    [router, id]
  );

  const { mutate } = useMutation({
    mutationFn: ({ id }: { id: string }) =>
      fetch(`/api/chat/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      if (pathname.split("/").at(2) === id) {
        router.push("/chat");
      }
    },
  });

  const memoizedDropdownMenu = useMemo(
    () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Ellipsis size={14} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem disabled>
            <p className="text-2xs">Share</p>
            <DropdownMenuShortcut>
              <Share size={14} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => mutate({ id })}>
            <p className="text-2xs text-red-400">Delete</p>
            <DropdownMenuShortcut>
              <Delete size={14} className="text-red-400" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    [mutate, id]
  );

  return (
    <SidebarMenuItem
      className={pathname.split("/").at(2) === id ? "bg-sidebar-select" : ""}
    >
      <SidebarMenuButton onClick={handleClick}>
        <span>{title}</span>
      </SidebarMenuButton>
      <SidebarMenuAction showOnHover={true}>
        {memoizedDropdownMenu}
      </SidebarMenuAction>
    </SidebarMenuItem>
  );
});

ChatItem.displayName = "ChatItem";
