import { Box, Button } from '@mui/material';

const ActionButtons = ({ onEdit, onRemove }) => {
  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Button
        variant="contained"
        color="primary"
        size="small"
        sx={{ fontSize: 10 }}
        onClick={onEdit}
      >
        Edit
      </Button>
      <Button
        variant="contained"
        color="error"
        size="small"
        sx={{ fontSize: 10 }}
        onClick={onRemove}
      >
        Remove
      </Button>
    </Box>
  );
};

export default ActionButtons;
