import { FormControlLabel, Switch } from '@mui/material';
import { styled } from '@mui/material/styles';

import useAppContext from '@/hooks/useAppContext';

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 50,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(24px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
      '& .MuiSwitch-thumb': {
        backgroundImage: `url(/images/languages/en.png)`,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundImage: `url(images/languages/vi.png)`,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

const LanguageSelector = () => {
  const {
    languageState: { language, setLanguage },
  } = useAppContext();

  const checked = language === 'en';
  const onChange = (e) => {
    setLanguage(e.target.checked ? 'en' : 'vi');
  };

  return (
    <FormControlLabel
      sx={{ ml: 0.25 }}
      control={<IOSSwitch checked={checked} onChange={onChange} />}
    />
  );
};

export default LanguageSelector;
