export const getSortParameters = (sortOption: string): [string, 'asc' | 'desc'] => {
  let orderField = 'pushedAt';
  let direction: 'asc' | 'desc' = 'desc';

  if (sortOption === '오래된순') {
    direction = 'asc';
  } else if (sortOption === '이름순') {
    orderField = 'name';
    direction = 'asc';
  }

  return [orderField, direction];
};
