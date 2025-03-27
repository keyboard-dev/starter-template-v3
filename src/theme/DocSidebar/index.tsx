import React, { useState, useEffect } from 'react';
import DocSidebar from '@theme-original/DocSidebar';
import type DocSidebarType from '@theme/DocSidebar';
import type {WrapperProps} from '@docusaurus/types';
import sidebars from '../../../sidebars.json';

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
  const result: Record<string, SidebarItem[]> = {
    'All': items, // Default category with all items
  };
  
  // Find all category items and create entries for them
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
          {
            type: "link",
            label: "Welcome",
            href: "/docs/",
            docId: "Welcome to Dev-Docs",
            unlisted: false
          },
          item
        ];
      }
    }
  });
  
  return result;
}

// Custom dropdown component
function CustomDropdown({ sidebarItems, onCategoryChange }): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
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
    onCategoryChange(item.sidebarData || []);
  };

  // Create a hover effect with useState instead of CSS pseudo-classes
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  return (
    <div className="custom-dropdown-container" style={dropdownContainerStyle}>
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
                backgroundColor: hoveredItem === index ? '#2a2a2a' : 'transparent'
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
const dropdownContainerStyle: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  marginBottom: '8px',
};

const dropdownButtonStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: '10px 16px',
  backgroundColor: '#1e1e1e',
  color: 'white',
  border: '1px solid #333',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 500,
  textAlign: 'left',
  outline: 'none',
};

const dropdownMenuStyle: React.CSSProperties = {
  position: 'absolute',
  top: 'calc(100% + 4px)',
  left: 0,
  width: '100%',
  backgroundColor: '#1e1e1e',
  border: '1px solid #333',
  borderRadius: '8px',
  zIndex: 10,
  overflow: 'hidden',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  maxHeight: '300px',
  overflowY: 'auto',
};

const dropdownItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '12px 16px',
  cursor: 'pointer',
  borderBottom: '1px solid #333',
  transition: 'background-color 0.2s',
};

const dropdownItemContentStyle: React.CSSProperties = {
  marginLeft: '12px',
  flex: 1,
};

const dropdownItemTitleStyle: React.CSSProperties = {
  fontSize: '15px',
  fontWeight: 500,
  color: 'white',
  marginBottom: '2px',
};

const dropdownItemDescStyle: React.CSSProperties = {
  fontSize: '13px',
  color: '#999',
};

export default function DocSidebarWrapper(props: Props): JSX.Element {
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
      }
      
      .theme-doc-sidebar-menu {
        padding-top: 0 !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      <div className="doc-sidebar-wrapper" style={sidebarWrapperStyle}>
        <div className="dropdown-container" style={dropdownContainerWrapperStyle}>
          <CustomDropdown 
            sidebarItems={originalSidebarItems} 
            onCategoryChange={setCurrentSidebarItems} 
          />
        </div>
        <div className="doc-sidebar-container" style={docSidebarContainerStyle}>
          <DocSidebar {...modifiedProps} />
        </div>
      </div>
    </>
  );
}

// Additional styles for the sidebar wrapper
const sidebarWrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
};

const dropdownContainerWrapperStyle: React.CSSProperties = {
  padding: '12px 16px 4px',
};

const docSidebarContainerStyle: React.CSSProperties = {
  paddingTop: 0,
  marginTop: 0,
};
