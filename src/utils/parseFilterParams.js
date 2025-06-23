const parseType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const isType = (gender) => ['work', 'home', 'personal'].includes(gender);

  if (isType(type)) return type;
};

const parseBoolean = (value) => {
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true';
  }
  return Boolean(value);
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedType = parseType(contactType);
  const parsedBoolean = parseBoolean(isFavourite);

  return {
    contactType: parsedType,
    isFavourite: parsedBoolean,
  };
};
