import { Box, Grid, Typography, Stack, Button } from '@mui/material';
import { grey } from '@mui/material/colors';

import useResponsive from '@/hooks/useResponsive';
import skills from '@/assets/skills.json';

const Introduction = () => {
  const { isTablet, isMobile } = useResponsive();

  return (
    <Box display="flex" flexDirection="column" justifyContent="center">
      <Grid container spacing={5} justifyContent="space-between">
        <Grid item xs={12} sm={isMobile ? 12 : 8}>
          <Stack
            height="100%"
            direction="column"
            gap={isTablet ? 0 : 2}
            justifyContent="center"
          >
            <Typography variant={isMobile ? 'h6' : 'h3'} fontWeight={600}>
              Hello, I'm Hung,
            </Typography>
            <Typography
              variant={isMobile ? 'h6' : 'h3'}
              fontWeight={600}
              color="primary.main"
            >
              a fullstack software engineer
            </Typography>
            <Typography fontStyle="italic" color={grey[500]} sx={{ mt: 1 }}>
              I am a guy with a keen interest in writing clean and clear code,
              who has been working as a fullstack engineer since 2018.
            </Typography>
            <Grid mt={1} container spacing={2}>
              {skills.map((skill) => (
                <Grid item xs={3} sm={1.5}>
                  <Box
                    width="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    title={skill.name}
                  >
                    <img
                      src={skill.icon}
                      alt="skill"
                      style={{
                        width: '100%',
                        maxWidth: '50px',
                        aspectRatio: '1 / 1',
                      }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{
                mt: 4,
                alignSelf: 'flex-start',
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': { boxShadow: 'none' },
              }}
              onClick={() =>
                window.open('/pdf/hungdevjs | Fullstack Engineer.pdf')
              }
            >
              View my resume
            </Button>
          </Stack>
        </Grid>
        {!isMobile && (
          <Grid
            item
            xs={12}
            sm={4}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <img
              src="/images/avatar.png"
              style={{
                width: '100%',
                borderRadius: 8,
              }}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Introduction;
