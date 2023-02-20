import { useRouter } from 'next/router';
import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { stripHtml } from 'string-strip-html';

import useAppContext from '@/hooks/useAppContext';

const ArticleItem = ({ article }) => {
  const { push } = useRouter();
  const {
    languageState: { language },
  } = useAppContext();
  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <img
        src={article.attachments[0]?.url}
        alt="banner"
        style={{
          width: '100%',
          aspectRatio: '3/2',
          borderRadius: '4px',
          objectFit: 'cover',
          objectPosition: 'center',
          cursor: 'pointer',
        }}
        onClick={() => push(`/blogs/a/${article.id}`)}
      />
      <Box display="flex" alignItems="center" gap={0.5}>
        <Typography
          fontWeight={500}
          fontSize="13px"
          color={grey[700]}
          sx={{
            cursor: 'pointer',
            '&:hover': { textDecoration: 'underline' },
          }}
          onClick={() => push(`/blogs/c/${article.categoryId}`)}
        >
          {article.category}
        </Typography>
        •
        <Typography fontSize="13px" color={grey[500]}>
          {article.createdAt}
        </Typography>
      </Box>
      <Typography
        fontSize="22px"
        color={grey[800]}
        fontWeight={300}
        lineHeight="1.5rem"
        sx={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2,
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'all ease 0.3s',
          '&:hover': {
            color: 'black',
          },
        }}
        onClick={() => push(`/blogs/a/${article.id}`)}
      >
        {language === 'en' ? article.enTitle : article.viTitle}
      </Typography>
      <Typography
        fontWeight={300}
        fontSize="13px"
        color={grey[700]}
        lineHeight="1.2rem"
        sx={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 3,
          overflow: 'hidden',
        }}
      >
        {
          stripHtml(language === 'en' ? article.enContent : article.viContent)
            .result
        }
      </Typography>
    </Box>
  );
};

export default ArticleItem;
