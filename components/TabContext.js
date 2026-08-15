'use client';

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FILES } from './VSCodeSidebar';

const TabContext = createContext();

export function TabProvider({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const [openTabs, setOpenTabs] = useState([]);
  
  // Whenever pathname changes, ensure the file is in openTabs
  useEffect(() => {
    const file = FILES.find(f => pathname === f.path || (f.path !== '/' && pathname.startsWith(f.path)));
    if (file && !openTabs.find(t => t.path === file.path)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpenTabs(prev => [...prev, file]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const closeTab = useCallback((e, path) => {
    e.stopPropagation(); // prevent clicking the tab
    const newTabs = openTabs.filter(t => t.path !== path);
    setOpenTabs(newTabs);
    
    // If we closed the active tab, navigate to the last open tab
    if (pathname === path || (path !== '/' && pathname.startsWith(path))) {
      if (newTabs.length > 0) {
        router.push(newTabs[newTabs.length - 1].path);
      } else {
        router.push('/');
      }
    }
  }, [openTabs, pathname, router]);

  const value = useMemo(() => ({ openTabs, closeTab }), [openTabs, closeTab]);

  return (
    <TabContext.Provider value={value}>
      {children}
    </TabContext.Provider>
  );
}

export function useTabs() {
  return useContext(TabContext);
}
