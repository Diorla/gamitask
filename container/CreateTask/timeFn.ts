export const extractDate = (dt: string): string => dt.split("T")[0];
export const extractTime = (dt: string): string => dt.split("T")[1];

export const updateDate = (init: string, next: string): string => {
  const dtArr = init.split("T");
  dtArr[0] = next;
  return dtArr.join("T");
};

export const updateTime = (init: string, next: string): string => {
  const dtArr = init.split("T");
  dtArr[1] = next;
  return dtArr.join("T");
};
