import { useCallback, useEffect, useRef, useState } from 'react';

interface IPaginatedParams<D> {
  data: D[];
  search?: string;
  searchFields: string[];
  limit?: number;
}

const usePaginatedList = <D extends { id: number }>({ data, search, searchFields, limit = 5 }: IPaginatedParams<D>) => {
  const [loadedData, setLoadedData] = useState<D[]>([]);
  const [cursor, setCursor] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const shouldRenderAgain = useRef(false);

  const searchMatchesAnyField = useCallback(
    (item) => {
      if (search) {
        for (const field of searchFields) {
          if (item[field]?.toLowerCase().startsWith(search.toLowerCase())) {
            return true;
          }
        }
      }

      return false;
    },
    [search, searchFields],
  );

  const updateLoadedDataAndCursor = useCallback(
    (newLoadedData: D[]) => {
      const lastItem = newLoadedData[newLoadedData.length - 1];
      const lastItemCursor = data.findIndex((item) => item.id === lastItem?.id);
      let _hasNext: boolean;

      if (search) {
        const slicedData = data.slice(lastItemCursor + 1, data.length);
        _hasNext = !!slicedData.find(searchMatchesAnyField);
      } else {
        _hasNext = data.length > cursor;
      }

      setHasNext(_hasNext);
      setCursor(lastItemCursor !== -1 ? lastItemCursor + 1 : 0);
      setLoadedData((loadedData) => [...loadedData, ...newLoadedData]);
    },
    [cursor, data, search, searchMatchesAnyField],
  );

  const paginate = useCallback(() => {
    setLoading(true);

    // Simulate api delay
    setTimeout(() => {
      if (search) {
        const filteredData = [];
        const slicedData = data.slice(cursor, data.length);

        for (let i = 0; i < slicedData.length; i++) {
          const searchMatches = searchMatchesAnyField(slicedData[i]);

          if (searchMatches) {
            filteredData.push(slicedData[i]);
          }

          if (filteredData.length === limit) {
            break;
          }
        }

        updateLoadedDataAndCursor(filteredData);
      } else {
        const filteredData = data.slice(cursor, cursor + limit);
        updateLoadedDataAndCursor(filteredData);
      }

      setLoading(false);
    }, 1000);
  }, [cursor, data, limit, search, searchMatchesAnyField, updateLoadedDataAndCursor]);

  useEffect(() => {
    setLoadedData([]);
    setCursor(0);
    shouldRenderAgain.current = true;
  }, [search]);

  useEffect(() => {
    if (shouldRenderAgain.current) {
      paginate();
      shouldRenderAgain.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldRenderAgain.current]);

  const loadNext = useCallback(() => paginate(), [paginate]);

  return { data: loadedData, loadNext, hasNext, isLoading };
};

export default usePaginatedList;
