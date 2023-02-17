import { useState } from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import useAppContext from '@/hooks/useAppContext';
import usePaginationArticle from '@/hooks/usePaginationArticle';
import ActionButtons from './ActionButtons';

const ArticleList = ({ setOption, setActiveArticleId }) => {
  const {
    articleState: { articles },
  } = useAppContext();
  const [search, setSearch] = useState('');
  const { renderedArticles, page, limit, setPage, setLimit } =
    usePaginationArticle({ articles, search });

  const columns = [
    { field: 'id', hidden: true, sortable: false },
    { field: 'enTitle', headerName: 'enTitle', sortable: false, flex: 1 },
    { field: 'viTitle', headerName: 'viTitle', sortable: false, flex: 1 },
    {
      field: 'created_at',
      headerName: 'Created at',
      sortable: false,
      width: 150,
    },
    {
      field: '',
      headerName: 'Actions',
      width: 200,
      sortable: false,
      renderCell: (params) => {
        return (
          <ActionButtons
            onEdit={() => {
              setActiveArticleId(params.id);
              setOption('article-detail');
            }}
            onRemove={() => setRemoveItem(params.row)}
          />
        );
      },
    },
  ];

  return (
    <Box p={2} display="flex" flexDirection="column" gap={2}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h5">Article list</Typography>
        <Button
          variant="contained"
          size="small"
          color="success"
          onClick={() => {
            setOption('article-detail');
            setActiveArticleId(null);
          }}
        >
          Create
        </Button>
      </Box>
      <TextField
        variant="outlined"
        label="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Box height="500px">
        <DataGrid
          columnVisibilityModel={{
            id: false,
          }}
          disableColumnFilter
          disableColumnMenu
          rows={renderedArticles}
          columns={columns}
          rowCount={renderedArticles.length}
          rowsPerPageOptions={[12, 50]}
          pagination
          page={page}
          pageSize={limit}
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setLimit(newPageSize)}
        />
      </Box>
    </Box>
  );
};

export default ArticleList;
