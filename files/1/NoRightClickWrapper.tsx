'use client';

import { useEffect, useState } from 'react';

export const NoRightClickWrapper = ({ children }: { children: React.ReactNode }) => {
  const [message, setMessage] = useState<string | null>(null);

  const showMessage = (text: string) => {
    setMessage(text);
    setTimeout(() => setMessage(null), 2000);
  };

  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
      showMessage('ðŸš« This features is not allowed');
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (
        key === 'f12' ||
        (event.ctrlKey && event.shiftKey && ['i', 'j', 'c'].includes(key)) || // DevTools
        (event.ctrlKey && key === 'u') || // View Source (Windows/Linux)
        (event.metaKey && key === 'u') || // View Source (macOS)
        (event.ctrlKey && key === 's') || // Save Page
        (event.metaKey && key === 's')    // Save Page macOS
      ) {
        event.preventDefault();
        showMessage('ðŸš« Developer Tools and View Source are disabled');
      }
    };

    const handleCopy = (event: ClipboardEvent) => {
      event.preventDefault();
      showMessage('ðŸš« Copying is disabled');
    };

    const handleDragStart = (event: DragEvent) => {
      event.preventDefault();
      showMessage('ðŸš« Dragging or downloading is disabled');
    };

    const disableSelection = (event: Event) => {
      event.preventDefault();
      showMessage('ðŸš« Text selection is disabled');
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('selectstart', disableSelection);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('selectstart', disableSelection);
    };
  }, []);

  return (
    <div
      style={{
        userSelect: 'none', // Prevent text selection via CSS
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
      }}
    >
      {children}
      {message && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0,0,0,0.85)',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '8px',
            fontSize: '14px',
            zIndex: 9999,
            pointerEvents: 'none',
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
};
