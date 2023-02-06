import { Box, Typography, Grid, TextField, Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import useResponsive from '@/hooks/useResponsive';

const Contact = () => {
  const { isMobile } = useResponsive();

  return (
    <Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        <Typography
          align="center"
          fontSize="24px"
          // fontWeight={300}
          textTransform="uppercase"
          variant="h5"
        >
          Contact me
        </Typography>
        <Typography fontWeight={300} align="center">
          {!isMobile && 'Any question or remarks? '} Just write me a message!
        </Typography>
        <Box
          width={800}
          maxWidth="100%"
          bgcolor="white"
          borderRadius={2}
          p={0.5}
        >
          <Grid container>
            <Grid item xs={12} md={5}>
              <Box
                height="100%"
                px={4}
                py={4}
                bgcolor="primary.main"
                borderRadius={2}
                overflow="hidden"
                display="flex"
                flexDirection="column"
                gap={5}
              >
                <Box display="flex" flexDirection="column" gap={1}>
                  <Typography color="white" variant="h5">
                    Contact Information
                  </Typography>
                  <Typography color="white" fontSize={12}>
                    Fill up the form and I will get back to you within 24 hours.
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        textDecoration: 'underline',
                        textDecorationColor: 'white',
                      },
                    }}
                    onClick={() =>
                      window.open('mailto:hungdev.js@gmail.com', '_blank')
                    }
                  >
                    <EmailIcon sx={{ color: 'white' }} />
                    <Typography color="white" fontWeight={300} fontSize={13}>
                      hungdev.js@gmail.com
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        textDecoration: 'underline',
                        textDecorationColor: 'white',
                      },
                    }}
                    onClick={() => window.open('tel:+84335210659', '_blank')}
                  >
                    <PhoneIcon sx={{ color: 'white' }} />
                    <Typography color="white" fontWeight={300} fontSize={13}>
                      +84 335 210 659
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        textDecoration: 'underline',
                        textDecorationColor: 'white',
                      },
                    }}
                    onClick={() =>
                      window.open('https://linkedin.com/in/hungdevjs', '_blank')
                    }
                  >
                    <LinkedInIcon sx={{ color: 'white' }} />
                    <Typography color="white" fontWeight={300} fontSize={13}>
                      hungdevjs
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
              <Box px={2} py={4} display="flex" flexDirection="column" gap={2}>
                <TextField
                  variant="standard"
                  label="Your email"
                  placeholder="Your email"
                />
                <TextField
                  multiline
                  rows={3}
                  variant="standard"
                  label="Message"
                  placeholder="Write your message..."
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    alignSelf: 'flex-end',
                    fontSize: 12,
                    textTransform: 'none',
                    boxShadow: 'none',
                    '&:hover': { boxShadow: 'none' },
                  }}
                >
                  Send message
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
