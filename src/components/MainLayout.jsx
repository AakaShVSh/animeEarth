// import React, { useState } from "react";
// import { Box } from "@chakra-ui/react";
// // import TopBar from "./TopBar_WithPortal";
// import Sidebar from "./Sidebar";
// import TopBar from "./TopBar";

// /**
//  * MainLayout - Layout wrapper that works with Portal
//  *
//  * This component handles the main app layout with:
//  * - TopBar rendered via Portal (prevents overlap)
//  * - Sidebar with toggle functionality
//  * - Main content area with proper spacing
//  *
//  * Usage:
//  * <MainLayout>
//  *   <YourPageContent />
//  * </MainLayout>
//  */

// function MainLayout({ children }) {
//   const [sidebarExpanded, setSidebarExpanded] = useState(true);

//   return (
//     <Box minH="100vh" bg="gray.50">
//       {/* Top Navigation Bar - Rendered via Portal */}
//       <TopBar />

//       {/* Sidebar */}
//       <Sidebar
//         isExpanded={sidebarExpanded}
//         onToggle={() => setSidebarExpanded(!sidebarExpanded)}
//       />

//       {/* Main Content Area */}
//       <Box
//         className={`main-content ${sidebarExpanded ? "sidebar-expanded" : ""}`}
//         ml={{ base: "0", md: sidebarExpanded ? "280px" : "80px" }}
//         pt="64px" // TopBar height
//         pb={{ base: "80px", md: "0" }} // Space for mobile bottom nav
//         transition="margin-left 0.3s ease"
//         minH="100vh"
//       >
//         {children}
//       </Box>
//     </Box>
//   );
// }

// export default MainLayout;

import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

function MainLayout({ children }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  return (
    <Box minH="100vh" bg="gray.50">
      <TopBar />

      <Sidebar
        isExpanded={sidebarExpanded}
        onToggle={() => setSidebarExpanded((prev) => !prev)}
      />

      <Box
        ml={{ base: "0", md: sidebarExpanded ? "280px" : "80px" }}
        pt="64px"
        pb={{ base: "80px", md: "0" }}
        width={{
          base: "100%",
          md: sidebarExpanded ? "calc(100% - 280px)" : "calc(100% - 80px)",
        }}
        transition="all 0.3s ease"
        minH="100vh"
      >
        {children}
      </Box>
    </Box>
  );
}

export default MainLayout;