export default {
  '*.{js,cjs,mjs}': ['eslint --max-warnings 0 --fix'],
  '*.{js,cjs,mjs,md,json}': ['prettier --write'],
};
