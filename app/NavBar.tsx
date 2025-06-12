"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import {
  Avatar,
  Box,
  Button,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";

const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between" align="center">
          <Flex gap="5">
            <Link href="/">
              <AiFillBug size="26px" />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];
  return (
    <>
      <ul className="flex gap-6 text-sm items-center ">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className={classnames({
                "text-zinc-900": link.href === currentPath,
                "text-zinc-500": link.href !== currentPath,
                "hover:text-zinc-800 transition-colors": true,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return null;

  if (status === "unauthenticated")
    return (
      <Button variant="soft">
        <Link href="/api/auth/signin">Login</Link>
      </Button>
    );
  return (
    <Box className="gap-4">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button
            variant="ghost"
            style={{ padding: 0, border: "none", background: "none" }}
          >
            <Avatar
              size="2"
              radius="full"
              src={session!.user!.image!}
              fallback={"?"} // {session.user!.email![0]}
              referrerPolicy="no-referrer"
              className="cursor-pointer"
            />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Sign Out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default NavBar;
