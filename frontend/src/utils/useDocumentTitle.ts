import { useEffect, useRef } from 'react';

/**
 * A custom hook to update the document title
 * @param title - The title to set for the current page
 * @param appName - Optional app name to append (defaults to 'Formai')
 */
export function useDocumentTitle(title: string, appName: string = 'Formai') {
  const previousTitle = useRef(document.title);
  
  useEffect(() => {
    // Only append app name if title doesn't already contain it
    const newTitle = title.includes(appName) ? title : `${title} | ${appName}`;
    document.title = newTitle;
    
    // Cleanup - restore previous title when component unmounts
    return () => {
      document.title = previousTitle.current;
    };
  }, [title, appName]);
} 