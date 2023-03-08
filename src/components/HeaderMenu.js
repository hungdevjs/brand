import { useRouter } from 'next/router';
import { useState } from 'react';
import { Drawer, Box, Typography, Collapse } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { grey } from '@mui/material/colors';

import useAppContext from '@/hooks/useAppContext';
import texts from '@/assets/texts.json';
import environments from '@/utils/environments';

const { ENABLE_MULTI_LANGUAGE } = environments;

const navs = [
  { name: 'Portfolio', path: '/' },
  { name: 'Blog', path: '/blogs' },
  { name: 'Send me a message', path: '/', id: '#contact' },
];

const HeaderMenu = ({ isOpen, onClose }) => {
  const { push } = useRouter();
  const {
    languageState: { language, setLanguage },
  } = useAppContext();
  const [isOpenLanguage, setIsOpenLanguage] = useState(false);

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      sx={{ width: '100vw' }}
    >
      <Box
        width="100vw"
        bgcolor="white"
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <Box
          p={2}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <CloseIcon sx={{ cursor: 'pointer' }} onClick={onClose} />
          <Typography
            fontFamily="'Bebas Neue', cursive"
            fontSize={24}
            sx={{ cursor: 'pointer', userSelect: 'none' }}
            onClick={() => push('/')}
          >
            hungdevjs
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column">
          {/* <LanguageSelector /> */}
          {navs.map((nav) => (
            <Box
              key={nav.name}
              p={2}
              sx={{
                cursor: 'pointer',
                transition: 'all ease 0.3s',
                '&:hover': {
                  bgcolor: grey[200],
                },
              }}
              onClick={() => {
                push(nav.url).then(() => {
                  if (nav.id) {
                    scroll(nav.id);
                  }
                });
                onClose();
              }}
            >
              <Typography fontWeight={400}>{nav.name}</Typography>
            </Box>
          ))}
          {ENABLE_MULTI_LANGUAGE && (
            <>
              <Box
                p={2}
                display="flex"
                alignItems="center"
                gap={2}
                sx={{
                  cursor: 'pointer',
                  transition: 'all ease 0.3s',
                  '&:hover': {
                    bgcolor: grey[200],
                  },
                }}
                onClick={() => setIsOpenLanguage(!isOpenLanguage)}
              >
                <Typography fontWeight={400}>Change blog language</Typography>
                <img
                  src={
                    language === 'en'
                      ? '/images/languages/en.png'
                      : '/images/languages/vi.png'
                  }
                  alt="language"
                />
              </Box>
              <Box px={2}>
                <Collapse in={isOpenLanguage}>
                  <Box display="flex" flexDirection="column">
                    <Box
                      p={2}
                      display="flex"
                      alignItems="center"
                      gap={2}
                      sx={{ cursor: 'pointer' }}
                      onClick={() => {
                        setLanguage('en');
                      }}
                    >
                      <Typography fontWeight={language === 'en' ? 700 : 400}>
                        {texts[language].english}
                      </Typography>
                      <img src="/images/languages/en.png" alt="english" />
                    </Box>
                    <Box
                      p={2}
                      display="flex"
                      alignItems="center"
                      gap={2}
                      sx={{ cursor: 'pointer' }}
                      onClick={() => {
                        setLanguage('vi');
                      }}
                    >
                      <Typography fontWeight={language === 'vi' ? 700 : 400}>
                        {texts[language].vietnamese}
                      </Typography>
                      <img src="/images/languages/vi.png" alt="vietnamese " />
                    </Box>
                  </Box>
                </Collapse>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};

export default HeaderMenu;
