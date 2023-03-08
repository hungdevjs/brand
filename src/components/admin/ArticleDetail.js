import { useEffect, useState, useId, useRef } from 'react';
import {
  Box,
  Grid,
  TextField,
  Autocomplete,
  Typography,
  IconButton,
  Button,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import 'react-quill/dist/quill.snow.css';
let ReactQuill;
if (typeof window !== 'undefined') {
  ReactQuill = require('react-quill');
}

const formatContent = (html) => {
  const images = html.match(/\[\[.*\]\]/g);

  if (!images) return html;

  let result = html;
  for (const image of images) {
    const src = image.slice(2, image.length - 2);
    result = result.replace(image, `<img src="${src}" alt="" />`);
  }

  return result;
};

const ArticleDetail = ({
  articles,
  categories,
  createArticle,
  updateArticle,
  uploadFile,
  activeArticleId,
  back,
}) => {
  const inputId = useId();
  const labelRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    enTitle: '',
    viTitle: '',
    enContent: '',
    viContent: '',
    categoryId: null,
    attachments: [],
  });

  const changeData = (values) => setData({ ...data, ...values });

  const categoryOptions = categories
    .filter((item) => item.id !== '1')
    .map((category) => ({
      value: category.id,
      label: category.enName,
    }));
  const activeArticle = articles.find((item) => item.id === activeArticleId);

  const save = async () => {
    setIsLoading(true);
    if (activeArticleId) {
      await updateArticle(activeArticleId, data);
    } else {
      await createArticle(data);
    }
    setIsLoading(false);
  };

  const onInputChange = async (e) => {
    setIsLoading(true);
    try {
      const file = e.target.files[0];
      const { storageRef, url } = await uploadFile(file);
      changeData({ attachments: [...data.attachments, { storageRef, url }] });
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  const copy = (text) => {
    if (navigator && navigator.clipboard) {
      navigator?.clipboard?.writeText(text);
    }
  };

  useEffect(() => {
    setData({
      enTitle: activeArticle?.enTitle || '',
      viTitle: activeArticle?.viTitle || '',
      enContent: activeArticle?.enContent || '',
      viContent: activeArticle?.viContent || '',
      categoryId: activeArticle?.categoryId || null,
      attachments: activeArticle?.attachments || [],
    });
  }, [activeArticle]);

  return (
    <Box p={2} display="flex" flexDirection="column" gap={2}>
      <Box display="flex" alignItems="center" gap={2}>
        <IconButton onClick={back}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5">
          {!!activeArticle ? 'Article detail' : 'Create article'}
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Autocomplete
              key={data.categoryId}
              clearOnEscape
              size="small"
              options={categoryOptions}
              onChange={(event, newValue) =>
                changeData({ categoryId: newValue.value })
              }
              value={categoryOptions.find(
                (item) => item.value === data.categoryId
              )}
              isOptionEqualToValue={(option, value) => option.value === value}
              renderInput={(params) => (
                <TextField
                  color="secondary"
                  size="small"
                  {...params}
                  label="category"
                />
              )}
            />
            <TextField
              variant="outlined"
              label="enTitle"
              value={data.enTitle}
              onChange={(e) => changeData({ enTitle: e.target.value })}
            />
            <TextField
              variant="outlined"
              label="viTitle"
              value={data.viTitle}
              onChange={(e) => changeData({ viTitle: e.target.value })}
            />
            <Box>
              <Typography>enContent</Typography>
              {typeof document !== 'undefined' && (
                <ReactQuill
                  theme="snow"
                  value={data.enContent}
                  onChange={(value) => changeData({ enContent: value })}
                />
              )}
            </Box>
            <Box>
              <Typography>viContent</Typography>
              {typeof document !== 'undefined' && (
                <ReactQuill
                  theme="snow"
                  value={data.viContent}
                  onChange={(value) =>
                    changeData({ viContent: formatContent(value) })
                  }
                />
              )}
            </Box>
            <Button
              variant="contained"
              color="primary"
              disabled={isLoading}
              onClick={save}
            >
              Save
            </Button>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box display="flex" flexDirection="column" gap={2}>
            <input
              id={inputId}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={onInputChange}
            />
            <label ref={labelRef} htmlFor={inputId} style={{ display: 'none' }}>
              Add images
            </label>
            <Button
              size="small"
              variant="contained"
              onClick={() => labelRef.current?.click()}
              sx={{ alignSelf: 'flex-start' }}
              disabled={isLoading}
            >
              Add image
            </Button>
            <Box display="flex" flexDirection="column" gap={2}>
              {data.attachments.map((item) => (
                <Box key={item.url} display="flex" alignItems="center" gap={1}>
                  <img
                    src={item.url}
                    alt="attachment"
                    style={{
                      width: 100,
                      aspectRatio: '1/1',
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                  />
                  <IconButton onClick={() => copy(`[[${item.url}]]`)}>
                    <ContentCopyIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ArticleDetail;
