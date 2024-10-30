export const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };

  export function getReadableDate(dateString) {
    const date = new Date(dateString);
  
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const day = date.getUTCDate();
    const month = monthNames[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    
    return `${day} ${month}, ${year}`;
  }

export const getQueryParams = (params) => {
  return Object.entries(params)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`) 
    .join('&'); 
};