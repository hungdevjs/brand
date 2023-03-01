import { useRouter } from 'next/router';
import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

import useAppContext from '@/hooks/useAppContext';

const Categories = ({ categories }) => {
  const {
    push,
    query: { categoryId },
  } = useRouter();
  const {
    languageState: { language },
  } = useAppContext();

  const activeCategoryId = categoryId || '1';

  return (
    <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
      {categories.map((category) => (
        <Typography
          key={category.id}
          fontSize={14}
          color={activeCategoryId === category.id ? 'black' : grey[600]}
          sx={{
            transition: 'all ease 0.3s',
            cursor: 'pointer',
            textUnderlineOffset: '5px',
            textDecoration:
              activeCategoryId === category.id ? 'underline' : 'none',
            '&:hover': {
              color: grey[900],
            },
          }}
          onClick={() =>
            push(category.id !== '1' ? `/blogs/c/${category.id}` : '/blogs')
          }
        >
          {category[`${language}Name`]}
        </Typography>
      ))}
    </Box>
  );
};

export default Categories;
