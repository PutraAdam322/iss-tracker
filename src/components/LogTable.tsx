// LogTable.tsx
import { useVirtualizer } from '@tanstack/react-virtual';
import type { Parameter } from "../interface";
import { useRef, useState, useEffect } from 'react';

type Props = {
  parameters: Parameter[] | undefined;
  current: any;
  setCurrent: any;
};

function getRowHeightForWidth(width: number) {
  if (width >= 1536) return 58; // 2xl
  if (width >= 1280) return 24; // xl
  if (width >= 1024) return 24; // lg
  if (width >= 768) return 48;  // md
  if (width >= 640) return 56;  // sm
  return 58;                    // base / xs
}

export const LogTable = ({ parameters, setCurrent }: Props) => {
  if (!parameters) return <div>Loading...</div>;

  const parentRef = useRef<HTMLDivElement | null>(null);

  const [rowHeight, setRowHeight] = useState<number>(() => {
    if (typeof window !== 'undefined') return getRowHeightForWidth(window.innerWidth);
    return 64;
  });

  // update rowHeight on resize (using ResizeObserver on the parent for better accuracy)
  useEffect(() => {
    const observeTarget = parentRef.current ?? undefined;

    // update once using window width as fallback
    const updateHeight = () => {
      const width = observeTarget?.clientWidth ?? (typeof window !== 'undefined' ? window.innerWidth : 1024);
      const h = getRowHeightForWidth(width);
      setRowHeight(h);
    };

    updateHeight();

    // Prefer ResizeObserver on the container to catch layout changes (e.g. responsive container)
    let ro: ResizeObserver | null = null;
    if (observeTarget && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => {
        updateHeight();
      });
      ro.observe(observeTarget);
    } else {
      // fallback to window resize
      window.addEventListener('resize', updateHeight);
    }

    return () => {
      if (ro && observeTarget) ro.unobserve(observeTarget);
      else window.removeEventListener('resize', updateHeight);
    };
  }, []);

  const rowVirtualizer = useVirtualizer({
    count: parameters.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => rowHeight,
    overscan: 6,
  });
  useEffect(() => {
    const anyVirtual = rowVirtualizer as any;
    if (typeof anyVirtual.measure === 'function') {
      anyVirtual.measure();
    } else {
      rowVirtualizer.getVirtualItems();
    }
  }, [rowHeight]);

  return (
    <div className="w-full 2xl:w-xl">
      <div className="px-4 py-2 bg-gray-800 rounded-t-xl">
        <h1 className="text-gray-100 text-base font-mono">Data Log</h1>
      </div>

      <div
        ref={parentRef}
        className="px-4 bg-gray-950 rounded-b-xl h-128 overflow-auto"
        // it's important the container have fixed height (h-128 or whatever) so virtualization can measure.
      >
        <div
          style={{
            height: rowVirtualizer.getTotalSize(),
            position: 'relative',
            width: '100%',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const p = parameters[virtualRow.index];

            return (
              <div
                key={virtualRow.key}
                onClick={() => setCurrent?.(p)}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualRow.start}px)`,
                  height: `${virtualRow.size}px`, // required to avoid overlap
                }}
                className="grid grid-cols-2 lg:grid-cols-5 2xl:grid-cols-3 text-gray-100 font-mono text-xs py-1 px-2 border-b border-gray-700 cursor-pointer hover:font-extrabold"
              >
                <p><b>Time:</b> {new Date(p.timestamp * 1000).toLocaleString()}</p>
                <p><b>Latitude:</b> {p.latitude.toFixed(4)}°</p>
                <p><b>Longitude:</b> {p.longitude.toFixed(4)}°</p>
                <p><b>Altitude:</b> {p.altitude_km.toFixed(2)} km</p>
                <p><b>Velocity:</b> {p.velocity_kph.toFixed(2)} km/h</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LogTable;
