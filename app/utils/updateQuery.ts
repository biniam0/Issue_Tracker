import { useRouter, useSearchParams } from "next/navigation";

export function updateQueryParams(
  updates: Record<string, string | null>,
  baseParams?: URLSearchParams | Record<string, string>
): string {
  let currentParams: URLSearchParams;
  
  if (baseParams instanceof URLSearchParams) {
    currentParams = new URLSearchParams(baseParams);
  } else if (baseParams) {
    currentParams = new URLSearchParams(baseParams);
  } else {
    currentParams = new URLSearchParams(
      typeof window !== "undefined" ? window.location.search : ""
    );
  }

  Object.entries(updates).forEach(([key, value]) => {
    if (value === null || value === "all") {
      currentParams.delete(key);
    } else {
      currentParams.set(key, value);
    }
  });

  return currentParams.toString() ? `?${currentParams.toString()}` : "";
}

export function useQueryParams() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const updateParams = (
    updates: Record<string, string | null>,
    pathname?: string
  ) => {
    const currentParamsObject: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      currentParamsObject[key] = value;
    });
    
    const query = updateQueryParams(updates, currentParamsObject);
    const path = pathname || window.location.pathname;
    router.push(`${path}${query}`);
  };
  
  return { searchParams, updateParams };
}