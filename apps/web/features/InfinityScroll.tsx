'use client';

import { cn } from '@zknoid/sdk/lib/helpers';
import { useEffect, useRef, useMemo } from 'react';

export function InfinityScroll<T>({
  items,
  renderItem,
  page,
  setPage,
  loading,
  hasMore,
  loadingComponent,
  endComponent,
  className,
}: {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  page: number;
  setPage: (page: number) => void;
  loading: boolean;
  hasMore: boolean;
  loadingComponent?: React.ReactNode;
  endComponent?: React.ReactNode;
  className?: string;
}) {
  if (typeof window === 'undefined') return;

  const observer = useRef<IntersectionObserver>();
  const lastItemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lastItemRef.current) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage(page + 1);
        }
      },
      { threshold: 1 }
    );

    if (lastItemRef.current) {
      observer.current.observe(lastItemRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [page, hasMore, loading]);

  const memoizedItems = useMemo(
    () =>
      items.map((item, index) => (
        <div
          key={index}
          style={{ all: 'unset' }}
          ref={
            !loading && hasMore ? (index === items.length - 1 ? lastItemRef : undefined) : undefined
          }
        >
          {renderItem(item)}
        </div>
      )),
    [items, renderItem, loading, hasMore]
  );

  return (
    <div className={cn(className)}>
      {memoizedItems}

      {loading && loadingComponent}

      {!hasMore && items.length > 0 && endComponent}
    </div>
  );
}
