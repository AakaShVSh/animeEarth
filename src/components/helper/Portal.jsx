import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

/**
 * Portal Component
 *
 * Renders children into a DOM node that exists outside the parent component's DOM hierarchy.
 * Useful for modals, tooltips, dropdowns, and preventing z-index/overflow issues.
 *
 * @param {React.ReactNode} children - The content to render in the portal
 * @param {string} containerId - Optional ID for the portal container (default: 'portal-root')
 *
 * Usage:
 * <Portal>
 *   <YourComponent />
 * </Portal>
 */

const Portal = ({ children, containerId = "portal-root" }) => {
  const portalRoot = useRef(null);

  useEffect(() => {
    // Check if portal container already exists
    let container = document.getElementById(containerId);

    // Create container if it doesn't exist
    if (!container) {
      container = document.createElement("div");
      container.id = containerId;
      document.body.appendChild(container);
    }

    portalRoot.current = container;

    // Cleanup function to remove the container when component unmounts
    // Only remove if no other portals are using it
    return () => {
      if (container && container.childNodes.length === 0) {
        document.body.removeChild(container);
      }
    };
  }, [containerId]);

  // Don't render until we have a portal root
  if (!portalRoot.current) return null;

  return createPortal(children, portalRoot.current);
};

export default Portal;
