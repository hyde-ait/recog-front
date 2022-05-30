import NextLink from "next/link";
import MuiLink from "@mui/material/Link";
import Button from "@mui/material/Button";

export default function Link({ type, href, children, ...props }) {
  if (type === "link" || !type) {
    return (
      <NextLink href={href} passHref>
        <MuiLink {...props}>{children}</MuiLink>
      </NextLink>
    );
  } else if (type === "button") {
    return (
      <NextLink href={href} passHref>
        <Button {...props}>{children}</Button>
      </NextLink>
    );
  }
}
