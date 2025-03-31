import React, { useEffect, useState } from 'react';
import {useDoc, useAllDocsData} from '@docusaurus/plugin-content-docs/client';
import DocPaginator from '@theme/DocPaginator';
import sidebarsJson from '@site/sidebars.json';

/**
 * This extra component is needed, because <DocPaginator> should remain generic.
 * DocPaginator is used in non-docs contexts too: generated-index pages...
 */
export default function DocItemPaginator(): JSX.Element {
  
  const {metadata} = useDoc();
  const allDocsData = useAllDocsData();
  const [filteredPrevious, setFilteredPrevious] = useState(metadata.previous);
  const [filteredNext, setFilteredNext] = useState(metadata.next);
  
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

  useEffect(() => {
    // Get the current category from localStorage
    let currentCategory = localStorage.getItem('docSidebarCategory') || 'All';

    // Get excluded directories
    const excludedDirs = sidebars.sidebars
      .filter(sidebar => sidebar.exclude_from_all === true)
      .map(sidebar => sidebar.dir.toLowerCase());

    // Get current doc ID
    const currentDocId = metadata.id;

    if (allDocsData && allDocsData.default) {
      const docsData = allDocsData.default;
      
      if (docsData.versions && docsData.versions.length > 0) {
        const currentVersion = docsData.versions[0];
        
        if (currentVersion.docs && Array.isArray(currentVersion.docs)) {
          const allDocs = currentVersion.docs;
          
          // Find the index of the current document
          const currentIndex = allDocs.findIndex(doc => doc.id === currentDocId);
          
          if (currentIndex !== -1) {
            let prevDoc = null;
            let nextDoc = null;

            // Find previous document
            for (let i = currentIndex - 1; i >= 0; i--) {
              const doc = allDocs[i];
              const isExcluded = isFromExcludedCategory(doc.path, excludedDirs);
              
              if (currentCategory === 'All') {
                if (!isExcluded) {
                  prevDoc = {
                    title: doc.id.split('/').pop(),
                    permalink: doc.path
                  };
                  break;
                }
              } else {
                const categoryDir = currentCategory.toLowerCase();
                if (doc.path.includes(`/${categoryDir}/`)) {
                  prevDoc = {
                    title: doc.id.split('/').pop(),
                    permalink: doc.path
                  };
                  break;
                }
              }
            }

            // Find next document
            for (let i = currentIndex + 1; i < allDocs.length; i++) {
              const doc = allDocs[i];
              const isExcluded = isFromExcludedCategory(doc.path, excludedDirs);
              
              if (currentCategory === 'All') {
                if (!isExcluded) {
                  nextDoc = {
                    title: doc.id.split('/').pop(),
                    permalink: doc.path
                  };
                  break;
                }
              } else {
                const categoryDir = currentCategory.toLowerCase();
                if (doc.path.includes(`/${categoryDir}/`)) {
                  nextDoc = {
                    title: doc.id.split('/').pop(),
                    permalink: doc.path
                  };
                  break;
                }
              }
            }

            setFilteredPrevious(prevDoc);
            setFilteredNext(nextDoc);
          }
        }
      }
    } else {
      // Fallback to the original logic if allDocsData is not available
      if (currentCategory === 'All') {
        setFilteredPrevious(
          metadata.previous && !isFromExcludedCategory(metadata.previous.permalink, excludedDirs) 
            ? metadata.previous 
            : undefined
        );
        
        setFilteredNext(
          metadata.next && !isFromExcludedCategory(metadata.next.permalink, excludedDirs) 
            ? metadata.next 
            : undefined
        );
      } else {
        const categoryDir = currentCategory.toLowerCase();
        
        setFilteredPrevious(
          metadata.previous && metadata.previous.permalink?.includes(`/${categoryDir}/`)
            ? metadata.previous
            : undefined
        );
        
        setFilteredNext(
          metadata.next && metadata.next.permalink?.includes(`/${categoryDir}/`)
            ? metadata.next
            : undefined
        );
      }
    }
  }, [metadata, allDocsData]);

  return <DocPaginator previous={filteredPrevious} next={filteredNext} />;
}
