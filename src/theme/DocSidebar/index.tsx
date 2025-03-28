import React, { useState, useEffect, useRef } from 'react';
import DocSidebar from '@theme-original/DocSidebar';
import type DocSidebarType from '@theme/DocSidebar';
import type {WrapperProps} from '@docusaurus/types';
import sidebarsJson from '../../../sidebars.json';
import logoJson from '../../../logo.json';
import SearchBar from '../SearchBar';
import ColorModeToggle from '@theme/ColorModeToggle';
import { useColorMode } from '@docusaurus/theme-common';

const logo = logoJson.logo;

// Define the sidebar item structure from sidebars.json
interface SidebarConfig {
  dir: string;
  name: string;
  href?: string;
  exclude_from_all?: boolean;
}

// Cast the imported sidebars.json to use our interface
const sidebars: {
  navbar_hide: boolean;
  sidebars: SidebarConfig[];
} = sidebarsJson as any;

type Props = WrapperProps<typeof DocSidebarType>;

// Sidebar item types
interface SidebarItem {
  type: string;
  label: string;
  href?: string;
  docId?: string;
  unlisted?: boolean;
  collapsible?: boolean;
  collapsed?: boolean;
  items?: SidebarItem[];
}

// Dropdown item interface
interface DropdownItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  sidebarData?: SidebarItem[];
}

// Function to organize sidebar items by category
function organizeSidebarByCategory(items: SidebarItem[]): Record<string, SidebarItem[]> {
  // First, we need to identify which items should be excluded from the "All" category
  const itemsToExclude = new Set<string>();
  
  // Check sidebars.json for items that should be excluded from All
  sidebars.sidebars.forEach(sidebar => {
    if (sidebar.exclude_from_all) {
      itemsToExclude.add(sidebar.dir.toLowerCase());
    }
  });
  
  // Filter out excluded items from the "All" category
  const filteredAllItems = items.filter(item => {
    // If it's a category that matches an excluded dir, filter it out
    console.log("#########################");
    console.log(item.label);
    console.log(itemsToExclude);
    console.log("#########################");
    if (item.type === 'category') {
      return !itemsToExclude.has(item.label.toLowerCase());
    }
    
    // For non-category items, include them in the All view
    return true;
  });
  console.log("#########################");
  console.log(filteredAllItems);
  console.log("#########################");
  const result: Record<string, SidebarItem[]> = {
    'All': filteredAllItems, // Default category with filtered items
  };
  
  // Find all category items and create entries for them (including excluded ones)
  items.forEach(item => {
    if (item.type === 'category') {
      // Use the category label as the key
      const categoryName = item.label.charAt(0).toUpperCase() + item.label.slice(1);
      
      // Check if this category matches a dir in sidebars.json
      const matchesSidebar = sidebars.sidebars.some(sidebar => 
        sidebar.dir.toLowerCase() === item.label.toLowerCase()
      );
      
      if (matchesSidebar) {
        // Create a filtered list containing only this category and its items
        result[categoryName] = [
          item
        ];
      }
    }
  });
  
  // Add entries from sidebars.json that aren't already in the result
  sidebars.sidebars.forEach(sidebar => {
    const categoryName = sidebar.dir.charAt(0).toUpperCase() + sidebar.dir.slice(1);
    if (!result[categoryName]) {
      result[categoryName] = [
        {
          type: "link",
          label: sidebar.name || categoryName,
          href: sidebar.href || "/docs/",
          unlisted: false
        }
      ];
    }
  });
  
  return result;
}

// Custom dropdown component
const CustomDropdown = ({ sidebarItems, onCategoryChange }): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { colorMode } = useColorMode();
  
  // Add click outside handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Organize sidebar items by category
  const categorizedSidebars = organizeSidebarByCategory(sidebarItems);
  
  // Create dropdown items from the categorized sidebars
  const dropdownItems: DropdownItem[] = Object.entries(categorizedSidebars).map(([category, items]) => {
    // Generate a simple icon based on the category name
    const iconColor = category === 'All' ? '#4e89e8' : 
                     category === 'Styling' ? '#7c3aed' : 
                     category === 'Components' ? '#e34c26' : '#777777';
    
    return {
      title: category,
      description: `${category} documentation`,
      icon: (
        <div className="dropdown-icon" style={{ 
          color: iconColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '32px',
          height: '32px',
          borderRadius: '6px',
          backgroundColor: `${iconColor}20` // Add a slight background with opacity
        }}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d={
              category === 'All' ? "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" :
              category === 'Styling' ? "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" :
              category === 'Components' ? "M3 3h6v6H3V3zm12 0h6v6h-6V3zm0 12h6v6h-6v-6zM3 15h6v6H3v-6z" :
              "M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"
            } />
          </svg>
        </div>
      ),
      sidebarData: items
    };
  });

  const handleItemClick = (item: DropdownItem) => {
    setSelectedCategory(item.title);
    setIsOpen(false);
    
    // Check if this category has an href in sidebars.json
    const matchingSidebar = sidebars.sidebars.find(sidebar => 
      sidebar.dir.toLowerCase() === item.title.toLowerCase()
    );
    
    if (matchingSidebar && matchingSidebar.href) {
      // If href exists, navigate to that URL
      window.location.href = matchingSidebar.href;
      return;
    }
    
    // Otherwise update the sidebar items as before
    onCategoryChange(item.sidebarData || []);
  };

  // Create a hover effect with useState instead of CSS pseudo-classes
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const dropdownButtonStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '10px 16px',
    backgroundColor: colorMode === 'dark' ? '#1e1e1e' : '#ffffff',
    color: colorMode === 'dark' ? 'white' : '#1e1e1e',
    border: `1px solid ${colorMode === 'dark' ? '#333' : '#e5e7eb'}`,
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 500,
    textAlign: 'left',
    outline: 'none',
    transition: 'all 0.2s ease-in-out',
  };

  const dropdownContainerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    marginBottom: '8px',
  };
  
  const dropdownMenuStyle: React.CSSProperties = {
    position: 'absolute',
    top: 'calc(100% + 4px)',
    left: 0,
    width: '100%',
    borderRadius: "0.5rem",
    border: colorMode === 'dark' ? '#1e1e1e' : '#ffffff',
    zIndex: 10,
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    maxHeight: '300px',
    overflowY: 'auto',
    backgroundColor: colorMode === 'dark' ? '#1e1e1e' : '#ffffff',
    color: colorMode === 'dark' ? 'white' : '#1e1e1e',
  };
  
  const dropdownItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    cursor: 'pointer',
    backgroundColor: colorMode === 'dark' ? '#1e1e1e' : '#ffffff',
    color: colorMode === 'dark' ? 'white' : '#1e1e1e',
    transition: 'background-color 0.2s',
  };
  
  const dropdownItemContentStyle: React.CSSProperties = {
    marginLeft: '12px',
    flex: 1,
  };
  
  const dropdownItemTitleStyle: React.CSSProperties = {
    fontSize: '15px',
    fontWeight: 500,
    marginBottom: '2px',
  };
  
  const dropdownItemDescStyle: React.CSSProperties = {
    fontSize: '13px',
    color: '#999',
  };

  return (
    <div className="custom-dropdown-container" style={dropdownContainerStyle} ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        style={dropdownButtonStyle}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{selectedCategory}</span>
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          style={{ 
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease'
          }}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      
      {isOpen && (
        <div className="dropdown-menu" style={dropdownMenuStyle}>
          {dropdownItems.map((item, index) => (
            <div 
              key={index} 
              className="dropdown-item" 
              style={{
                ...dropdownItemStyle,
                backgroundColor: hoveredItem === index ? (colorMode === 'dark' ? '#2a2a2a' : '#f0f0f0') : 'transparent'
              }}
              onClick={() => handleItemClick(item)}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {item.icon}
              <div className="dropdown-item-content" style={dropdownItemContentStyle}>
                <div className="dropdown-item-title" style={dropdownItemTitleStyle}>{item.title}</div>
                <div className="dropdown-item-description" style={dropdownItemDescStyle}>{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Inline styles


export default function DocSidebarWrapper(props: Props): JSX.Element {
  const { colorMode, setColorMode } = useColorMode();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Extract the original sidebar items from props
  const originalSidebarItems = Array.isArray(props.sidebar) ? props.sidebar : [];
  
  // State to track the current sidebar items
  const [currentSidebarItems, setCurrentSidebarItems] = useState<SidebarItem[]>(originalSidebarItems);
  
  // Create a modified version of the props with our custom sidebar items
  const modifiedProps = {
    ...props,
    sidebar: currentSidebarItems,
  };

  // Create a custom className for the sidebar
  useEffect(() => {
    // Add custom CSS to adjust the DocSidebar styling
    const style = document.createElement('style');
    style.innerHTML = `
      .theme-doc-sidebar-container {
        padding-top: 0 !important;
        margin-top: 0 !important;
        transition: width 0.3s ease-in-out;
      }
      
      .theme-doc-sidebar-menu {
        padding-top: 0 !important;
        transition: opacity 0.3s ease-in-out;
      }

      .doc-sidebar-wrapper {
        transition: width 0.3s ease-in-out;
      }

      .doc-sidebar-wrapper.collapsed {
        width: 60px !important;
      }

      .doc-sidebar-wrapper.collapsed .theme-doc-sidebar-container {
        width: 60px !important;
        display: none;
      }

      .doc-sidebar-wrapper.collapsed .theme-doc-sidebar-menu {
        display: none;
      }

      .doc-sidebar-wrapper.collapsed .dropdown-container,
      .doc-sidebar-wrapper.collapsed .search-container {
        display: none;
      }

      .doc-sidebar-wrapper.collapsed .logo-container {
        display: none;
      }

      .doc-sidebar-wrapper.collapsed .collapsed-icons {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        padding: 16px 8px;
      }

      .doc-sidebar-wrapper .collapsed-icons {
        display: none;
      }

      .icon-button {
        background: rgba(255, 255, 255, 0.1);
        border: none;
        border-radius: 8px;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background-color 0.2s;
      }

      .icon-button:hover {
        background: rgba(255, 255, 255, 0.15);
      }

      ${sidebars.navbar_hide ? `
        .navbar--fixed-top {
          display: none !important;
        }
        [aria-label="Docs sidebar"] {
          padding-left: 0 !important;
        }
      ` : ''}

      [data-theme='light'] .doc-sidebar-wrapper {
        background-color: #FFFFFF;
        border-right: 1px solid rgba(162, 161, 165, 0.2);
      }


      [data-theme='light'] .menu__link {
        color: #0A0A0A;
      }

      [data-theme='light'] .menu__link:hover {
        background-color: rgba(162, 161, 165, 0.1);
      }

      [data-theme='light'] .menu__link--active {
        background-color: rgba(106, 120, 251, 0.1);
        color: #6A78FB;
      }

      [data-theme='light'] .icon-button {
        background-color: rgba(162, 161, 165, 0.2);
        color: #0A0A0A;
      }

      [data-theme='light'] .icon-button:hover {
        background-color: rgba(162, 161, 165, 0.3);
      }

      [data-theme='light'] .search-bar {
        background-color: rgba(162, 161, 165, 0.2);
        border: none;
        color: #0A0A0A;
      }

      [data-theme='light'] .navbar-sidebar__brand {
        background-color: #FFFFFF;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const searchButtonStyle: React.CSSProperties = {
    width: '100%',
    color: 'inherit',
    border: 'none',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: '8px 12px',
    backgroundColor: 'rgba(162, 161, 165, 0.2)',
    fontSize: '14px',
  };

  const sidebarWrapperStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    height: '100%',
    transition: 'width 0.3s ease-in-out',
    borderRight: colorMode === 'dark' ? '1px solid #333' : '1px solid #E0DFE1',
  };

  return (
    <>
      <div className={`doc-sidebar-wrapper ${isCollapsed ? 'collapsed' : ''}`} style={sidebarWrapperStyle}>
        {/* Collapsed state icons */}
        <div className="collapsed-icons">
          <button className="icon-button" onClick={handleCollapse} title="Expand sidebar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Regular sidebar content */}
        <div className="logo-container" style={logoContainerStyle}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            {sidebars.navbar_hide && !isCollapsed && (
              <img src={logo} alt="Logo" style={logoImageStyle} />
            )}
          </div>
          <div className="sidebar-buttons" style={sidebarButtonsStyle}>
            {sidebars.navbar_hide && !isCollapsed && (
              <ColorModeToggle value={colorMode} onChange={setColorMode} />
            )}
            {!isCollapsed && (<button className="collapse-button" onClick={handleCollapse} style={collapseButtonStyle}>
              <img src="/svgs/collapse.svg" alt="Collapse" style={{ transition: 'transform 0.3s ease-in-out' }} />
            </button>)}
          </div>
        </div>
        {sidebars.navbar_hide && !isCollapsed && (
          <div style={searchContainerStyle}>
            <SearchBar buttonStyle={searchButtonStyle} />
          </div>
        )}
        <div className="dropdown-container" style={dropdownContainerWrapperStyle}>
          <CustomDropdown 
            sidebarItems={originalSidebarItems} 
            onCategoryChange={setCurrentSidebarItems} 
          />
          <DocSidebar {...modifiedProps} />
        </div>
      </div>
    </>
  );
}

// Additional styles for the sidebar wrapper


const dropdownContainerWrapperStyle: React.CSSProperties = {
  padding: '12px 16px 4px',
};

const docSidebarContainerStyle: React.CSSProperties = {
  paddingTop: 0,
  marginTop: 0,
};

// Add logo styles
const logoContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  alignSelf: 'stretch',
  padding: '16px',
  gap: '8px',
};

const logoImageStyle: React.CSSProperties = {
  width: '32px',
  height: '32px',
};

const searchContainerStyle: React.CSSProperties = {
  padding: '0 16px',
  marginBottom: '8px',
};

// Add collapse button styles
const collapseButtonStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '4px',
  transition: 'background-color 0.2s',
};

const sidebarButtonsStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  justifyContent: 'flex-end',
  marginLeft: 'auto',
};
