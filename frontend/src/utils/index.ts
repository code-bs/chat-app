export const formatTime = (dateStr: string) => {
  const date = new Date(dateStr);
  let hour = date.getHours();
  const pre = hour < 12 ? '오전' : '오후';
  if (hour === 0) hour = 12;
  else if (hour > 12) hour -= 12;
  const min = date.getMinutes();
  return `${pre} ${hour < 10 ? `0${hour}` : hour}:${min < 10 ? `0${min}` : min}`;
};

export const getCookie = function (name: string) {
  const value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return value ? decodeURIComponent(value[2]) : null;
};

export const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
