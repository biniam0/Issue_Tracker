import NextLink from "next/link";
import { Link as RadixLink } from "@radix-ui/themes";

interface Props {
    children: string
  href: string
}

const Link = ({ href, children }: Props) => {
  return (
    <NextLink key={href} href={href} legacyBehavior>
      <RadixLink>{children} </RadixLink>
    </NextLink>
  );
};

export default Link;
