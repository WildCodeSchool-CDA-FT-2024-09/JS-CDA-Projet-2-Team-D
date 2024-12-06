import React from "react";
import { Link as MuiLink, LinkProps as MuiLinkProps } from "@mui/material";
import { styled } from "@mui/system";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

interface StyledLinkProps extends MuiLinkProps {
  href?: string; // URL for external links
  to?: RouterLinkProps["to"]; // Path for internal routing
}

const StyledLinkRoot = styled(MuiLink)(({ theme }) => ({
  textDecoration: "none", // Removes underline
  color: theme.palette.primary.main, // Primary color
  fontWeight: "bold", // Bold text
  transition: "color 0.3s ease", // Smooth transition
  "&:hover": {
    textDecoration: "underline", // Underline on hover
    color: theme.palette.secondary.main, // Hover color
  },
}));

/**
 * StyledLink Component
 * A reusable link component for external and internal navigation.
 *
 * @param {StyledLinkProps} props - Props for the StyledLink component.
 * @returns {JSX.Element} Styled link element.
 */
const BtnLink: React.FC<StyledLinkProps> = ({
  href,
  to,
  children,
  ...otherProps
}) => {
  const linkProps = to ? { component: RouterLink, to } : { href };

  return (
    <StyledLinkRoot {...linkProps} {...otherProps}>
      {children}
    </StyledLinkRoot>
  );
};

export default BtnLink;
