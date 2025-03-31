import React, { useEffect, useState } from 'react';
import {useDoc, useAllDocsData, useDocsSidebar} from '@docusaurus/plugin-content-docs/client';
import DocPaginator from '@theme/DocPaginator';
import sidebarsJson from '@site/sidebars.json';

/**
 * This extra component is needed, because <DocPaginator> should remain generic.
 * DocPaginator is used in non-docs contexts too: generated-index pages...
 */
export default function DocItemPaginator(): JSX.Element {
  
  const {metadata} = useDoc();
  const allDocsData = useAllDocsData();
  const sidebar = useDocsSidebar();
  const [filteredPrevious, setFilteredPrevious] = useState(metadata.previous);
  const [filteredNext, setFilteredNext] = useState(metadata.next);
  const [sidebarItems, setSidebarItems] = useState<any[]>([]);
  const [showSidebar, setShowSidebar] = useState(false);
  
  console.log("this is the sidebar", sidebar)
  // Get the sidebar configuration
  const sidebars = sidebarsJson as {
    navbar_hide: boolean;
    sidebars: Array<{
      dir: string;
      name: string;
      href?: string;
      exclude_from_all?: boolean;
    }>;
  };

  // Helper function to check if a permalink belongs to an excluded category
  const isFromExcludedCategory = (permalink: string | undefined, excludedDirs: string[]): boolean => {
    if (!permalink) return false;
    return excludedDirs.some(dir => permalink.includes(`/${dir}/`));
  };

  // Recursive function to flatten sidebar items
  const flattenSidebarItems = (items: any[]): any[] => {
    return items.reduce((acc: any[], item) => {
      if (item.type === 'category' && item.items) {
        return [...acc, item, ...flattenSidebarItems(item.items)];
      }
      return [...acc, item];
    }, []);
  };

  // Function to find the correct previous and next navigation items
  const findCorrectNavItems = (flatItems: any[], currentDocId: string, excludedDirs: string[]) => {
    // Filter out category items and keep only document links
    const docItems = flatItems.filter(item => 
      item.type === 'link' && 
      item.docId && 
      !isFromExcludedCategory(item.href, excludedDirs)
    );
    
    if (docItems.length === 0) return { prev: undefined, next: undefined };
    
    // Find current document index
    const currentIndex = docItems.findIndex(item => item.docId === currentDocId);
    if (currentIndex === -1) return { prev: undefined, next: undefined };
    
    // Get previous and next items
    const prevItem = currentIndex > 0 ? docItems[currentIndex - 1] : undefined;
    const nextItem = currentIndex < docItems.length - 1 ? docItems[currentIndex + 1] : undefined;
    
    return {
      prev: prevItem ? { 
        title: prevItem.label,
        permalink: prevItem.href 
      } : undefined,
      next: nextItem ? {
        title: nextItem.label,
        permalink: nextItem.href
      } : undefined
    };
  };

  useEffect(() => {
    if (!sidebar || !sidebar.items) return;

    // Get excluded directories from sidebars.json
    const excludedDirs = sidebars.sidebars
      .filter(sidebar => sidebar.exclude_from_all === true)
      .map(sidebar => sidebar.dir.toLowerCase());
    
    console.log("Excluded directories:", excludedDirs);
    
    // Check if current document path is in excluded category
    const currentIsExcluded = isFromExcludedCategory(metadata.permalink, excludedDirs);
    console.log("Current doc excluded:", currentIsExcluded);
    
    // If the current document is from an excluded category,
    // use the default navigation
    if (currentIsExcluded) {
      setFilteredPrevious(metadata.previous);
      setFilteredNext(metadata.next);
      
      // Get sidebar items and flatten them
      const flattenedItems = flattenSidebarItems(sidebar.items);
      setSidebarItems(flattenedItems);
      return;
    }
    
    // Flatten the sidebar items for easier processing
    const flattenedItems = flattenSidebarItems(sidebar.items);
    setSidebarItems(flattenedItems);
    
    // Find the correct previous and next navigation items
    const { prev, next } = findCorrectNavItems(flattenedItems, metadata.id, excludedDirs);
    
    console.log("Calculated navigation:", { prev, next });
    
    // If metadata has previous/next, check if they should be excluded
    if (metadata.previous && isFromExcludedCategory(metadata.previous.permalink, excludedDirs)) {
      setFilteredPrevious(prev);
    } else {
      setFilteredPrevious(metadata.previous || prev);
    }
    
    if (metadata.next && isFromExcludedCategory(metadata.next.permalink, excludedDirs)) {
      setFilteredNext(next);
    } else {
      setFilteredNext(metadata.next || next);
    }
    
  }, [metadata, sidebar, sidebars]);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // Helper function to render sidebar item based on type
  const renderSidebarItem = (item: any) => {
    const isCurrentItem = item.docId === metadata.id;
    const style = {
      margin: '8px 0', 
      padding: '8px', 
      borderRadius: '4px',
      borderLeft: '3px solid',
      ...(isCurrentItem ? { 
        fontWeight: 'bold',
        boxShadow: '0 0 5px rgba(0,0,0,0.3)'
      } : {})
    };

    switch (item.type) {
      case 'category':
        return (
          <div style={{ 
            ...style, 
            backgroundColor: '#e6f7ff', 
            borderLeftColor: '#1890ff'
          }}>
            <strong>Category:</strong> {item.label}<br />
            {item.collapsible !== undefined && <><strong>Collapsible:</strong> {item.collapsible ? 'Yes' : 'No'}<br /></>}
            {item.collapsed !== undefined && <><strong>Collapsed:</strong> {item.collapsed ? 'Yes' : 'No'}<br /></>}
          </div>
        );
      case 'link':
        return (
          <div style={{ 
            ...style,
            backgroundColor: isCurrentItem ? '#fffbe6' : '#f6ffed', 
            borderLeftColor: isCurrentItem ? '#faad14' : '#52c41a'
          }}>
            <strong>Link:</strong> {item.label}<br />
            <strong>URL:</strong> {item.href}<br />
            {item.docId && <><strong>ID:</strong> {item.docId}<br /></>}
            {isCurrentItem && <span style={{ color: '#faad14' }}>← Current Document</span>}
          </div>
        );
      case 'doc':
        return (
          <div style={{ 
            ...style,
            backgroundColor: isCurrentItem ? '#fffbe6' : '#fff7e6', 
            borderLeftColor: isCurrentItem ? '#faad14' : '#fa8c16'
          }}>
            <strong>Doc:</strong> {item.label}<br />
            <strong>ID:</strong> {item.id}<br />
            {item.customProps && <><strong>Custom Props:</strong> {JSON.stringify(item.customProps)}<br /></>}
            {isCurrentItem && <span style={{ color: '#faad14' }}>← Current Document</span>}
          </div>
        );
      default:
        return (
          <div style={{ ...style, backgroundColor: 'white', borderLeftColor: '#d9d9d9' }}>
            <pre>{JSON.stringify(item, null, 2)}</pre>
          </div>
        );
    }
  };

  return (
    <>
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={toggleSidebar}
          style={{
            padding: '8px 16px',
            backgroundColor: '#6A78FB',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '10px'
          }}
        >
          {showSidebar ? 'Hide Docusaurus Sidebar Items' : 'Show Docusaurus Sidebar Items'}
        </button>
        
        {showSidebar && (
          <div style={{ 
            border: '1px solid #ddd', 
            borderRadius: '4px', 
            padding: '16px',
            marginBottom: '20px',
            backgroundColor: '#f7f7f7',
            maxHeight: '500px',
            overflowY: 'auto'
          }}>
            <h3>Docusaurus Sidebar Items</h3>
            <p><strong>Current Document ID:</strong> {metadata.id}</p>
            
            <div style={{ 
              marginBottom: '10px',
              padding: '10px',
              border: '1px solid #d9d9d9',
              borderRadius: '4px',
              backgroundColor: '#fff'
            }}>
              <h4>Navigation</h4>
              <strong>Previous:</strong> {filteredPrevious ? filteredPrevious.title : 'None'}<br />
              <strong>Next:</strong> {filteredNext ? filteredNext.title : 'None'}
            </div>
            
            <div>
              {sidebarItems.length > 0 ? (
                sidebarItems.map((item, index) => (
                  <div key={index}>
                    {renderSidebarItem(item)}
                  </div>
                ))
              ) : (
                <p>No sidebar items available.</p>
              )}
            </div>
          </div>
        )}
      </div>
      <DocPaginator previous={filteredPrevious} next={filteredNext} />
    </>
  );
}
